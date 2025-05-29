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
    question: "Qual sua situação atual de moradia?",
    type: 'single',
    options: [
      { value: "moro-aluguel", label: "Moro de aluguel", points: 25 },
      { value: "moro-familia", label: "Moro com a família", points: 30 },
      { value: "casa-propria", label: "Tenho casa própria", points: 15 },
      { value: "outros", label: "Outros", points: 20 }
    ]
  },
  {
    id: 2,
    question: "Qual sua renda familiar mensal?",
    type: 'single',
    options: [
      { value: "ate-2400", label: "Até R$ 2.400 (Faixa 1)", points: 30 },
      { value: "2401-4400", label: "R$ 2.401 a R$ 4.400 (Faixa 1,5)", points: 28 },
      { value: "4401-7000", label: "R$ 4.401 a R$ 7.000 (Faixa 2)", points: 25 },
      { value: "7001-10000", label: "R$ 7.001 a R$ 10.000 (Faixa 3)", points: 22 },
      { value: "acima-10000", label: "Acima de R$ 10.000", points: 10 }
    ]
  },
  {
    id: 3,
    question: "Já possui financiamento imobiliário?",
    type: 'single',
    options: [
      { value: "primeiro", label: "Não, seria o primeiro", points: 30 },
      { value: "quitei", label: "Sim, mas já quitei", points: 20 },
      { value: "pagando", label: "Sim, ainda estou pagando", points: 5 }
    ]
  },
  {
    id: 4,
    question: "Qual região de Natal prefere?",
    type: 'single',
    options: [
      { value: "zona-norte", label: "Zona Norte", points: 25 },
      { value: "zona-oeste", label: "Zona Oeste", points: 25 },
      { value: "zona-sul", label: "Zona Sul", points: 20 },
      { value: "grande-natal", label: "Grande Natal", points: 22 },
      { value: "litoral-sul", label: "Litoral Sul", points: 18 }
    ]
  },
  {
    id: 5,
    question: "Qual o prazo desejado para compra?",
    type: 'single',
    options: [
      { value: "ate-3-meses", label: "Até 3 meses", points: 30 },
      { value: "3-6-meses", label: "3 a 6 meses", points: 25 },
      { value: "6-meses-1-ano", label: "6 meses a 1 ano", points: 20 },
      { value: "mais-1-ano", label: "Mais de 1 ano", points: 10 }
    ]
  },
  {
    id: 6,
    question: "Qual valor pode dar de entrada?",
    type: 'single',
    options: [
      { value: "sem-entrada", label: "Não tenho entrada", points: 15 },
      { value: "ate-5000", label: "Até R$ 5.000", points: 20 },
      { value: "5000-15000", label: "R$ 5.000 a R$ 15.000", points: 25 },
      { value: "15000-30000", label: "R$ 15.000 a R$ 30.000", points: 28 },
      { value: "acima-30000", label: "Acima de R$ 30.000", points: 30 }
    ]
  },
  {
    id: 7,
    question: "Trabalha com carteira assinada?",
    type: 'single',
    options: [
      { value: "sim-mais-2-anos", label: "Sim, mais de 2 anos", points: 30 },
      { value: "sim-menos-2-anos", label: "Sim, menos de 2 anos", points: 25 },
      { value: "autonomo", label: "Não, sou autônomo", points: 15 },
      { value: "empresario", label: "Não, sou empresário", points: 20 }
    ]
  },
  {
    id: 8,
    question: "Seu nome está no SPC/Serasa?",
    type: 'single',
    options: [
      { value: "limpo", label: "Não, está limpo", points: 30 },
      { value: "valores-baixos", label: "Sim, mas são valores baixos", points: 20 },
      { value: "valores-altos", label: "Sim, valores altos", points: 5 },
      { value: "nao-sei", label: "Não sei", points: 10 }
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
