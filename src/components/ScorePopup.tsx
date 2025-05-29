
import { useEffect, useState } from 'react';
import { Trophy, Star } from 'lucide-react';

interface ScorePopupProps {
  points: number;
  totalScore: number;
}

const ScorePopup = ({ points, totalScore }: ScorePopupProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div
        className={`transform transition-all duration-500 ${
          isVisible
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-50 opacity-0 translate-y-10'
        }`}
      >
        <div className="bg-gradient-to-r from-green-500 via-yellow-400 to-blue-500 text-white p-8 rounded-2xl shadow-2xl border-4 border-white animate-pulse">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Trophy className="h-16 w-16 text-yellow-200 animate-bounce" />
            </div>
            
            <h3 className="text-3xl font-bold mb-2">
              +{points} Pontos! 🎉
            </h3>
            
            <p className="text-xl mb-4">
              Sua pontuação: <span className="font-bold text-yellow-200">{totalScore}</span>
            </p>
            
            <div className="flex justify-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < Math.min(5, Math.floor(points / 5))
                      ? 'text-yellow-200 fill-current'
                      : 'text-yellow-200/50'
                  } animate-pulse`}
                  style={{
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
            
            <p className="text-lg font-semibold animate-bounce">
              Continue jogando! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScorePopup;
