
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';
import { Question } from './QuizContainer';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (answer: string[]) => void;
}

const QuizQuestion = ({ question, onAnswer }: QuizQuestionProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const handleSingleSelect = (value: string) => {
    setSelectedAnswers([value]);
  };

  const handleMultipleSelect = (value: string, checked: boolean) => {
    if (checked) {
      setSelectedAnswers(prev => [...prev, value]);
    } else {
      setSelectedAnswers(prev => prev.filter(answer => answer !== value));
    }
  };

  const handleSubmit = () => {
    if (selectedAnswers.length > 0) {
      onAnswer(selectedAnswers);
      setSelectedAnswers([]);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center leading-relaxed">
          {question.question}
        </h2>

        <div className="space-y-4 mb-8">
          {question.type === 'single' ? (
            <RadioGroup
              value={selectedAnswers[0] || ''}
              onValueChange={handleSingleSelect}
              className="space-y-3"
            >
              {question.options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 cursor-pointer"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label
                    htmlFor={option.value}
                    className="flex-1 cursor-pointer text-base font-medium"
                  >
                    {option.label}
                  </Label>
                  <span className="text-sm text-green-600 font-semibold">
                    +{option.points} pts
                  </span>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <div className="space-y-3">
              {question.options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                >
                  <Checkbox
                    id={option.value}
                    checked={selectedAnswers.includes(option.value)}
                    onCheckedChange={(checked) =>
                      handleMultipleSelect(option.value, !!checked)
                    }
                  />
                  <Label
                    htmlFor={option.value}
                    className="flex-1 cursor-pointer text-base font-medium"
                  >
                    {option.label}
                  </Label>
                  <span className="text-sm text-blue-600 font-semibold">
                    +{option.points} pts
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center">
          <Button
            onClick={handleSubmit}
            disabled={selectedAnswers.length === 0}
            className="bg-gradient-to-r from-green-600 via-yellow-500 to-blue-600 hover:from-green-700 hover:via-yellow-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Confirmar Resposta
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizQuestion;
