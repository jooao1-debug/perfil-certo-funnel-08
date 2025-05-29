
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Trophy, Zap, Phone } from 'lucide-react';
import QuizContainer from '@/components/QuizContainer';

const Index = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  if (showQuiz) {
    return <QuizContainer />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold">Perfil Certo</h1>
          <p className="text-sm opacity-90">O primeiro sistema de IA qualificado inteligente para o MCMV em 2025!</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 animate-fade-in">
              Corretor de Imóveis
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 bg-clip-text text-transparent mb-6">
              Receba Leads Quentes do MCMV!
            </h3>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Responda 10 perguntas e veja o caminho que o seu lead vai fazer!
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="hover:scale-105 transition-transform duration-300 border-green-200">
              <CardContent className="p-6 text-center">
                <Trophy className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-bold text-lg mb-2">Sistema Inteligente</h4>
                <p className="text-gray-600">IA qualificada especialmente para o mercado MCMV</p>
              </CardContent>
            </Card>
            
            <Card className="hover:scale-105 transition-transform duration-300 border-yellow-200">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h4 className="font-bold text-lg mb-2">Leads Quentes</h4>
                <p className="text-gray-600">Receba apenas clientes qualificados e prontos para comprar</p>
              </CardContent>
            </Card>
            
            <Card className="hover:scale-105 transition-transform duration-300 border-blue-200">
              <CardContent className="p-6 text-center">
                <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h4 className="font-bold text-lg mb-2">Funil Personalizado</h4>
                <p className="text-gray-600">Adaptado especificamente para sua região e mercado</p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Button */}
          <div className="space-y-4">
            <Button 
              onClick={() => setShowQuiz(true)}
              className="bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 hover:from-green-700 hover:via-yellow-600 hover:to-blue-700 text-white font-bold py-6 px-12 rounded-full text-xl shadow-lg animate-pulse hover:animate-none transition-all duration-300 transform hover:scale-105"
            >
              🎯 Quero fazer o teste agora!
            </Button>
            <p className="text-sm text-gray-500">
              ⚡ Teste gratuito • 📊 Resultado instantâneo • 🔒 100% seguro
            </p>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex justify-center items-center space-x-4 text-gray-600">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
              <Star className="h-5 w-5 text-yellow-500 fill-current" />
            </div>
            <span className="font-semibold">+500 corretores aprovados</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
