
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
      <div className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold">Perfil Certo</h1>
          <p className="text-sm opacity-90">O primeiro sistema de IA qualificado inteligente para o MCMV em Natal/RN!</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-blue-600">NATAL/RN</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              Corretor de Imóveis
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-green-600 mb-6">
              Receba Leads Quentes do MCMV!
            </h3>
            <p className="text-xl md:text-2xl text-yellow-600 mb-8 font-semibold">
              Responda 9 perguntas e veja o caminho que o seu lead vai fazer!
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-green-200 bg-white shadow-lg">
              <CardContent className="p-6 text-center">
                <Trophy className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-bold text-lg mb-2 text-green-600">Sistema Inteligente</h4>
                <p className="text-gray-600">IA qualificada especialmente para o mercado MCMV de Natal</p>
              </CardContent>
            </Card>
            
            <Card className="border-yellow-200 bg-white shadow-lg">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <h4 className="font-bold text-lg mb-2 text-yellow-600">Leads Quentes</h4>
                <p className="text-gray-600">Receba apenas clientes qualificados e prontos para comprar</p>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200 bg-white shadow-lg">
              <CardContent className="p-6 text-center">
                <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h4 className="font-bold text-lg mb-2 text-blue-600">Funil Personalizado</h4>
                <p className="text-gray-600">Adaptado especificamente para Natal e região metropolitana</p>
              </CardContent>
            </Card>
          </div>

          {/* CTA Button */}
          <div className="space-y-4">
            <Button 
              onClick={() => setShowQuiz(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-6 px-12 rounded-lg text-xl shadow-lg"
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
            <span className="font-semibold">+200 corretores aprovados em Natal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
