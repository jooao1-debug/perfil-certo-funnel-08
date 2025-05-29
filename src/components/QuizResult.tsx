
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trophy, Star, CheckCircle, Phone, User, MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Question } from './QuizContainer';

interface QuizResultProps {
  score: number;
  name: string;
  setName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  onConfirm: () => void;
}

const QuizResult = ({ score, name, setName, phone, setPhone, onConfirm }: QuizResultProps) => {
  const getScoreLevel = () => {
    if (score >= 200) return { level: 'EXCELENTE', color: 'text-green-600', emoji: '🏆' };
    if (score >= 160) return { level: 'MUITO BOM', color: 'text-blue-600', emoji: '⭐' };
    if (score >= 120) return { level: 'BOM', color: 'text-yellow-600', emoji: '👍' };
    return { level: 'REGULAR', color: 'text-orange-600', emoji: '📈' };
  };

  const scoreLevel = getScoreLevel();

  const handleConfirmation = () => {
    if (!name || !phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha seu nome e telefone para continuar.",
        variant: "destructive"
      });
      return;
    }
    
    // Redirecionar para o novo link do WhatsApp
    const summary = generateSummary();
    const message = encodeURIComponent(summary);
    window.open(`https://w.app/perfilcerto?text=${message}`, '_blank');
  };

  const generateSummary = () => {
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

    const answers: Record<number, string[]> = {};

    const questionTexts = questions.map(q => {
      const userAnswers = answers[q.id] || [];
      const answerTexts = userAnswers.map(answer => {
        const option = q.options.find(opt => opt.value === answer);
        return option?.label || answer;
      });
      return `${q.question}\nR: ${answerTexts.join(', ')}`;
    }).join('\n\n');

    return `🎯 PERFIL CERTO - CLIENTE MCMV NATAL/RN\n\n👤 Nome: ${name}\n📞 Telefone: ${phone}\n🏆 Pontuação: ${score} pontos\n📍 Região: NATAL/RN\n\n📋 RESPOSTAS COMPLETAS:\n${questionTexts}\n\n✅ STATUS: QUALIFICADO para MCMV em Natal!\n\n🎯 Este cliente foi pré-qualificado através do nosso sistema de IA especializado em MCMV para Natal/RN.\n\n🚀 Cliente pronto para atendimento!`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4">
      <div className="max-w-4xl mx-auto">
        {/* Celebration Header */}
        <div className="text-center mb-6 sm:mb-8 px-2">
          <div className="mb-4 sm:mb-6">
            <Trophy className="h-12 w-12 sm:h-20 sm:w-20 text-yellow-500 mx-auto mb-2 sm:mb-4" />
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-blue-800 mb-2 sm:mb-4">
              Parabéns! 🎉
            </h1>
          </div>
        </div>

        {/* Score Card */}
        <Card className="mb-6 sm:mb-8 shadow-2xl border-0 bg-green-600 text-white mx-2 sm:mx-0">
          <CardContent className="p-4 sm:p-8 text-center">
            <h2 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4">Sua Pontuação Final</h2>
            <div className="text-4xl sm:text-6xl font-bold mb-2 sm:mb-4 text-yellow-400">{score}</div>
            <div className="flex justify-center space-x-1 mb-2 sm:mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 sm:h-8 sm:w-8 ${
                    i < Math.min(5, Math.floor(score / 40))
                      ? 'text-yellow-400 fill-current'
                      : 'text-yellow-200'
                  }`}
                />
              ))}
            </div>
            <div className="text-lg sm:text-2xl font-bold mb-2 text-yellow-400">
              {scoreLevel.emoji} Classificação: {scoreLevel.level}
            </div>
          </CardContent>
        </Card>

        {/* Approval Message */}
        <Card className="mb-6 sm:mb-8 shadow-lg border-green-200 mx-2 sm:mx-0">
          <CardContent className="p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6 text-center sm:text-left">
              <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-600 mb-2 sm:mb-0 sm:mr-4" />
              <div>
                <h3 className="text-xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">APROVADO! ✅</h3>
                <p className="text-base sm:text-xl text-gray-700">
                  Você está qualificado para receber leads quentes do MCMV em Natal/RN!
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 sm:p-6 rounded-lg border border-green-200">
              <h4 className="font-bold text-base sm:text-lg text-green-800 mb-2 sm:mb-3 flex items-center">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                🎯 O que você vai receber em Natal/RN:
              </h4>
              <ul className="space-y-2 text-sm sm:text-base text-green-700">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Sistema de IA qualificado para MCMV em Natal</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Leads pré-qualificados das zonas de Natal diariamente</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Funil personalizado para o mercado potiguar</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Suporte especializado em MCMV local</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="shadow-lg border-blue-200 mx-2 sm:mx-0">
          <CardContent className="p-4 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-blue-800">
              Confirme seus dados para ativação
            </h3>
            
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <div>
                <Label htmlFor="name" className="text-sm sm:text-base font-semibold flex items-center mb-2 text-gray-800">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-blue-600" />
                  Nome Completo *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Digite seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-base sm:text-lg py-2 sm:py-3 border-gray-300"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-sm sm:text-base font-semibold flex items-center mb-2 text-gray-800">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-green-600" />
                  WhatsApp *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(84) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-base sm:text-lg py-2 sm:py-3 border-gray-300"
                  required
                />
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={onConfirm}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 sm:py-6 px-6 sm:px-12 rounded-lg text-base sm:text-xl shadow-lg w-full sm:w-auto"
              >
                <Phone className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                Solicitar Ativação no WhatsApp
              </Button>
              
              <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4 px-2">
                📊 Seu resumo completo será enviado automaticamente<br/>
                🔒 Seus dados estão 100% seguros e protegidos
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Regional Notice */}
        <div className="text-center mt-6 sm:mt-8 p-4 sm:p-6 bg-blue-50 rounded-lg border border-blue-200 mx-2 sm:mx-0">
          <p className="text-xs sm:text-sm text-blue-800 font-semibold flex flex-col sm:flex-row items-center justify-center text-center">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-0 sm:mr-2" />
            <span>
              🎯 <strong>Funil Personalizado para Natal/RN:</strong> Este sistema foi especialmente configurado 
              para o mercado imobiliário de Natal e adaptado às características locais do MCMV potiguar.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
