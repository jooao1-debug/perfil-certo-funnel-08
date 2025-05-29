
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, ArrowRight, CheckCircle, Phone } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import ScorePopup from './ScorePopup';
import QuizQuestion from './QuizQuestion';
import QuizResult from './QuizResult';

export interface Question {
  id: number;
  question: string;
  options: Array<{ value: string; label: string; points: number }>;
  type: 'single' | 'multiple';
}

const questions: Question[] = [
  {
    id: 1,
    question: "Há quanto tempo você atua como corretor de imóveis?",
    type: 'single',
    options: [
      { value: "menos-1-ano", label: "Menos de 1 ano", points: 10 },
      { value: "1-3-anos", label: "1 a 3 anos", points: 15 },
      { value: "3-5-anos", label: "3 a 5 anos", points: 20 },
      { value: "mais-5-anos", label: "Mais de 5 anos", points: 25 }
    ]
  },
  {
    id: 2,
    question: "Quantos imóveis você vende por mês em média?",
    type: 'single',
    options: [
      { value: "0-2", label: "0 a 2 imóveis", points: 10 },
      { value: "3-5", label: "3 a 5 imóveis", points: 15 },
      { value: "6-10", label: "6 a 10 imóveis", points: 20 },
      { value: "mais-10", label: "Mais de 10 imóveis", points: 25 }
    ]
  },
  {
    id: 3,
    question: "Você já trabalhou com financiamento habitacional MCMV?",
    type: 'single',
    options: [
      { value: "nunca", label: "Nunca trabalhei", points: 5 },
      { value: "pouco", label: "Pouca experiência", points: 15 },
      { value: "moderado", label: "Experiência moderada", points: 20 },
      { value: "muito", label: "Muita experiência", points: 25 }
    ]
  },
  {
    id: 4,
    question: "Qual o principal desafio na captação de leads qualificados?",
    type: 'single',
    options: [
      { value: "quantidade", label: "Quantidade insuficiente de leads", points: 15 },
      { value: "qualidade", label: "Qualidade dos leads é baixa", points: 20 },
      { value: "conversao", label: "Dificuldade na conversão", points: 18 },
      { value: "concorrencia", label: "Muita concorrência", points: 12 }
    ]
  },
  {
    id: 5,
    question: "Como você atualmente capta seus clientes?",
    type: 'multiple',
    options: [
      { value: "redes-sociais", label: "Redes sociais", points: 10 },
      { value: "indicacao", label: "Indicação", points: 15 },
      { value: "anuncios", label: "Anúncios pagos", points: 20 },
      { value: "portal", label: "Portais imobiliários", points: 12 }
    ]
  },
  {
    id: 6,
    question: "Qual sua meta de vendas para os próximos 6 meses?",
    type: 'single',
    options: [
      { value: "5-10", label: "5 a 10 vendas", points: 10 },
      { value: "10-20", label: "10 a 20 vendas", points: 15 },
      { value: "20-50", label: "20 a 50 vendas", points: 20 },
      { value: "mais-50", label: "Mais de 50 vendas", points: 25 }
    ]
  },
  {
    id: 7,
    question: "Você tem conhecimento sobre documentação do MCMV?",
    type: 'single',
    options: [
      { value: "basico", label: "Conhecimento básico", points: 10 },
      { value: "intermediario", label: "Conhecimento intermediário", points: 15 },
      { value: "avancado", label: "Conhecimento avançado", points: 20 },
      { value: "especialista", label: "Sou especialista", points: 25 }
    ]
  },
  {
    id: 8,
    question: "Qual região você atende principalmente?",
    type: 'single',
    options: [
      { value: "capital", label: "Capital", points: 20 },
      { value: "grande-capital", label: "Grande capital", points: 18 },
      { value: "interior", label: "Interior", points: 15 },
      { value: "multiplas", label: "Múltiplas regiões", points: 25 }
    ]
  },
  {
    id: 9,
    question: "Você gostaria de receber leads pré-qualificados diariamente?",
    type: 'single',
    options: [
      { value: "sim-muito", label: "Sim, com certeza!", points: 25 },
      { value: "sim-talvez", label: "Sim, talvez", points: 15 },
      { value: "nao-sei", label: "Não sei", points: 5 },
      { value: "nao", label: "Não tenho interesse", points: 0 }
    ]
  }
];

const QuizContainer = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [score, setScore] = useState(0);
  const [showScorePopup, setShowScorePopup] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const playScoreSound = () => {
    // Simula som de caixa registradora
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmccAj2Yz/DJayYHKHDr+tOOOggOUrHn6Y5cFwlEnN3vpm8dAjuXzu/UfS4MJInT8tyMOgkTSK3n668FHxo');
    audio.play().catch(() => {
      // Fallback se o áudio não funcionar
      console.log('Ding! +' + getQuestionPoints() + ' pontos!');
    });
  };

  const getQuestionPoints = () => {
    const question = questions[currentQuestion];
    const selectedAnswers = answers[question.id] || [];
    return selectedAnswers.reduce((total, answer) => {
      const option = question.options.find(opt => opt.value === answer);
      return total + (option?.points || 0);
    }, 0);
  };

  const handleAnswer = (answer: string[]) => {
    const question = questions[currentQuestion];
    setAnswers(prev => ({ ...prev, [question.id]: answer }));
    
    const points = answer.reduce((total, ans) => {
      const option = question.options.find(opt => opt.value === ans);
      return total + (option?.points || 0);
    }, 0);
    
    setScore(prev => prev + points);
    setShowScorePopup(true);
    playScoreSound();
    
    setTimeout(() => {
      setShowScorePopup(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setIsCompleted(true);
      }
    }, 2000);
  };

  const handleConfirmation = () => {
    if (!name || !phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha seu nome e telefone para continuar.",
        variant: "destructive"
      });
      return;
    }
    
    // Redirecionar para WhatsApp com resumo
    const summary = generateSummary();
    const message = encodeURIComponent(summary);
    window.open(`https://wa.me/84991469591?text=${message}`, '_blank');
  };

  const generateSummary = () => {
    const questionTexts = questions.map(q => {
      const userAnswers = answers[q.id] || [];
      const answerTexts = userAnswers.map(answer => {
        const option = q.options.find(opt => opt.value === answer);
        return option?.label || answer;
      });
      return `${q.question}\nR: ${answerTexts.join(', ')}`;
    }).join('\n\n');

    return `🎯 RESULTADO DO PERFIL CERTO - MCMV\n\n👤 Nome: ${name}\n📞 Telefone: ${phone}\n🏆 Pontuação: ${score} pontos\n\n📋 RESPOSTAS:\n${questionTexts}\n\n✅ STATUS: APROVADO para receber leads quentes do MCMV!\n\n🎯 Este funil foi personalizado para sua região e perfil profissional.\n\n🚀 Solicito contato para ativação do sistema de IA qualificado!`;
  };

  if (isCompleted) {
    return (
      <QuizResult 
        score={score}
        name={name}
        setName={setName}
        phone={phone}
        setPhone={setPhone}
        onConfirm={handleConfirmation}
      />
    );
  }

  const progress = ((currentQuestion) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Perfil Certo - Quiz MCMV</h1>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="font-bold text-lg text-gray-800">{score} pontos</span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <QuizQuestion 
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
        />

        {/* Score Popup */}
        {showScorePopup && (
          <ScorePopup 
            points={getQuestionPoints()}
            totalScore={score}
          />
        )}
      </div>
    </div>
  );
};

export default QuizContainer;
