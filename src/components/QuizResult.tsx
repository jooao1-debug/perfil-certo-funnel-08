
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trophy, Star, CheckCircle, Phone, User, MapPin } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Celebration Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <Trophy className="h-20 w-20 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-4">
              Parabéns! 🎉
            </h1>
          </div>
        </div>

        {/* Score Card */}
        <Card className="mb-8 shadow-2xl border-0 bg-green-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Sua Pontuação Final</h2>
            <div className="text-6xl font-bold mb-4 text-yellow-400">{score}</div>
            <div className="flex justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-8 w-8 ${
                    i < Math.min(5, Math.floor(score / 40))
                      ? 'text-yellow-400 fill-current'
                      : 'text-yellow-200'
                  }`}
                />
              ))}
            </div>
            <div className="text-2xl font-bold mb-2 text-yellow-400">
              {scoreLevel.emoji} Classificação: {scoreLevel.level}
            </div>
          </CardContent>
        </Card>

        {/* Approval Message */}
        <Card className="mb-8 shadow-lg border-green-200">
          <CardContent className="p-8">
            <div className="flex items-center justify-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-600 mr-4" />
              <div>
                <h3 className="text-3xl font-bold text-green-600 mb-2">APROVADO! ✅</h3>
                <p className="text-xl text-gray-700">
                  Você está qualificado para receber leads quentes do MCMV em Natal/RN!
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-bold text-lg text-green-800 mb-3 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                🎯 O que você vai receber em Natal/RN:
              </h4>
              <ul className="space-y-2 text-green-700">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Sistema de IA qualificado para MCMV em Natal
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Leads pré-qualificados das zonas de Natal diariamente
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Funil personalizado para o mercado potiguar
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Suporte especializado em MCMV local
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="shadow-lg border-blue-200">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-blue-800">
              Confirme seus dados para ativação
            </h3>
            
            <div className="space-y-6 mb-8">
              <div>
                <Label htmlFor="name" className="text-base font-semibold flex items-center mb-2 text-gray-800">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Nome Completo *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Digite seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-lg py-3 border-gray-300"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-base font-semibold flex items-center mb-2 text-gray-800">
                  <Phone className="h-5 w-5 mr-2 text-green-600" />
                  WhatsApp *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(84) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-lg py-3 border-gray-300"
                  required
                />
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={onConfirm}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-xl shadow-lg"
              >
                <Phone className="mr-3 h-6 w-6" />
                Solicitar Ativação no WhatsApp
              </Button>
              
              <p className="text-sm text-gray-500 mt-4">
                📊 Seu resumo completo será enviado automaticamente<br/>
                🔒 Seus dados estão 100% seguros e protegidos
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Regional Notice */}
        <div className="text-center mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-blue-800 font-semibold flex items-center justify-center">
            <MapPin className="h-5 w-5 mr-2" />
            🎯 <strong>Funil Personalizado para Natal/RN:</strong> Este sistema foi especialmente configurado 
            para o mercado imobiliário de Natal e adaptado às características locais do MCMV potiguar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
