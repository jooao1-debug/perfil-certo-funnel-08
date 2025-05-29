
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Trophy, Zap, Phone, MapPin } from 'lucide-react';
import QuizContainer from '@/components/QuizContainer';

const Index = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  if (showQuiz) {
    return <QuizContainer />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-3 sm:py-4">
        <div className="container mx-auto px-2 sm:px-4 text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Perfil Certo</h1>
          <p className="text-xs sm:text-sm opacity-90 px-2">
            O primeiro sistema de IA qualificado inteligente para o MCMV em Natal/RN!
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-2 sm:px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-2" />
              <span className="text-lg sm:text-xl font-bold text-blue-600">NATAL/RN</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-gray-800 mb-2 sm:mb-4 px-2">
              Corretor de Imóveis
            </h2>
            <h3 className="text-xl sm:text-3xl md:text-5xl font-bold text-green-600 mb-4 sm:mb-6 px-2">
              Receba Leads Quentes do MCMV!
            </h3>
            <p className="text-lg sm:text-xl md:text-2xl text-yellow-600 mb-6 sm:mb-8 font-semibold px-2">
              Responda 9 perguntas e veja o caminho que o seu lead vai fazer!
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 px-2 sm:px-0">
            <Card className="border-green-200 bg-white shadow-lg">
              <CardContent className="p-4 sm:p-6 text-center">
                <Trophy className="h-10 w-10 sm:h-12 sm:w-12 text-green-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="font-bold text-base sm:text-lg mb-2 text-green-600">Sistema Inteligente</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  IA qualificada especialmente para o mercado MCMV de Natal
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-yellow-200 bg-white shadow-lg">
              <CardContent className="p-4 sm:p-6 text-center">
                <Zap className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="font-bold text-base sm:text-lg mb-2 text-yellow-600">Leads Quentes</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  Receba apenas clientes qualificados e prontos para comprar
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200 bg-white shadow-lg sm:col-span-2 md:col-span-1">
              <CardContent className="p-4 sm:p-6 text-center">
                <Star className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600 mx-auto mb-3 sm:mb-4" />
                <h4 className="font-bold text-base sm:text-lg mb-2 text-blue-600">Funil Personalizado</h4>
                <p className="text-sm sm:text-base text-gray-600">
                  Adaptado especificamente para Natal e região metropolitana
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Button */}
          <div className="space-y-3 sm:space-y-4 px-2 sm:px-0">
            <Button 
              onClick={() => setShowQuiz(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 sm:py-6 px-6 sm:px-12 rounded-lg text-lg sm:text-xl shadow-lg w-full sm:w-auto"
            >
              🎯 Quero fazer o teste agora!
            </Button>
            <p className="text-xs sm:text-sm text-gray-500">
              ⚡ Teste gratuito • 📊 Resultado instantâneo • 🔒 100% seguro
            </p>
          </div>

          {/* Social Proof */}
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-4 text-gray-600 px-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
            </div>
            <span className="font-semibold text-sm sm:text-base text-center">
              +200 corretores utilizando em Natal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
