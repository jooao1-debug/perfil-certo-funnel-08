
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
    question: "Em qual região de Natal você atua como corretor?",
    type: 'single',
    options: [
      { value: "zona-norte", label: "Zona Norte (Redinha, Igapó)", points: 20 },
      { value: "zona-sul", label: "Zona Sul (Ponta Negra, Capim Macio)", points: 25 },
      { value: "zona-leste", label: "Zona Leste (Lagoa Nova, Tirol)", points: 25 },
      { value: "zona-oeste", label: "Zona Oeste (Cidade da Esperança)", points: 20 },
      { value: "multiplas-zonas", label: "Múltiplas zonas", points: 30 }
    ]
  },
  {
    id: 2,
    question: "Há quanto tempo você trabalha no mercado imobiliário de Natal?",
    type: 'single',
    options: [
      { value: "menos-1-ano", label: "Menos de 1 ano", points: 10 },
      { value: "1-3-anos", label: "1 a 3 anos", points: 15 },
      { value: "3-5-anos", label: "3 a 5 anos", points: 20 },
      { value: "mais-5-anos", label: "Mais de 5 anos", points: 25 }
    ]
  },
  {
    id: 3,
    question: "Qual sua experiência com financiamento MCMV em Natal?",
    type: 'single',
    options: [
      { value: "nenhuma", label: "Nenhuma experiência", points: 5 },
      { value: "pouca", label: "Pouca experiência", points: 15 },
      { value: "moderada", label: "Experiência moderada", points: 20 },
      { value: "muita", label: "Muita experiência", points: 25 }
    ]
  },
  {
    id: 4,
    question: "Quantos imóveis você vende por mês em Natal?",
    type: 'single',
    options: [
      { value: "0-2", label: "0 a 2 imóveis", points: 10 },
      { value: "3-5", label: "3 a 5 imóveis", points: 15 },
      { value: "6-10", label: "6 a 10 imóveis", points: 20 },
      { value: "mais-10", label: "Mais de 10 imóveis", points: 25 }
    ]
  },
  {
    id: 5,
    question: "Qual o principal perfil de cliente que você atende em Natal?",
    type: 'single',
    options: [
      { value: "primeira-casa", label: "Primeira casa própria", points: 25 },
      { value: "investidor", label: "Investidores", points: 20 },
      { value: "upgrade", label: "Upgrade de imóvel", points: 15 },
      { value: "todos", label: "Todos os perfis", points: 22 }
    ]
  },
  {
    id: 6,
    question: "Como você atualmente capta clientes em Natal?",
    type: 'multiple',
    options: [
      { value: "redes-sociais", label: "Redes sociais", points: 12 },
      { value: "indicacao", label: "Indicação de clientes", points: 18 },
      { value: "anuncios-pagos", label: "Anúncios pagos online", points: 20 },
      { value: "imobiliaria", label: "Através de imobiliária", points: 15 }
    ]
  },
  {
    id: 7,
    question: "Qual sua maior dificuldade para vender mais em Natal?",
    type: 'single',
    options: [
      { value: "leads-qualificados", label: "Falta de leads qualificados", points: 25 },
      { value: "concorrencia", label: "Muita concorrência", points: 15 },
      { value: "documentacao", label: "Burocracia e documentação", points: 18 },
      { value: "conhecimento-mcmv", label: "Conhecimento sobre MCMV", points: 20 }
    ]
  },
  {
    id: 8,
    question: "Qual sua meta de vendas para os próximos 6 meses em Natal?",
    type: 'single',
    options: [
      { value: "5-10", label: "5 a 10 vendas", points: 15 },
      { value: "10-20", label: "10 a 20 vendas", points: 20 },
      { value: "20-40", label: "20 a 40 vendas", points: 25 },
      { value: "mais-40", label: "Mais de 40 vendas", points: 30 }
    ]
  },
  {
    id: 9,
    question: "Você gostaria de receber leads pré-qualificados MCMV em Natal diariamente?",
    type: 'single',
    options: [
      { value: "sim-muito", label: "Sim, com certeza!", points: 30 },
      { value: "sim-talvez", label: "Sim, tenho interesse", points: 20 },
      { value: "nao-sei", label: "Preciso saber mais", points: 10 },
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

  const playMoneySound = () => {
    // Som de dinheiro/caixa registradora mais realista
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Criar sequência de tons para simular som de dinheiro
    const frequencies = [800, 600, 400, 300];
    
    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
      oscillator.type = 'square';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01 + (index * 0.1));
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2 + (index * 0.1));
      
      oscillator.start(audioContext.currentTime + (index * 0.1));
      oscillator.stop(audioContext.currentTime + 0.3 + (index * 0.1));
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
    playMoneySound();
    
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

    return `🎯 PERFIL CERTO - CORRETOR NATAL/RN\n\n👤 Nome: ${name}\n📞 Telefone: ${phone}\n🏆 Pontuação: ${score} pontos\n📍 Região: NATAL/RN\n\n📋 RESPOSTAS COMPLETAS:\n${questionTexts}\n\n✅ STATUS: APROVADO para receber leads MCMV em Natal!\n\n🎯 Este funil foi personalizado especificamente para o mercado imobiliário de Natal/RN e adaptado ao perfil de corretores locais.\n\n🚀 Solicito contato para ativação do sistema de IA qualificado para Natal!`;
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
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">Perfil Certo - Quiz Corretor Natal/RN</h1>
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
