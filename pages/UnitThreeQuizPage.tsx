import React, { useState, useMemo } from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAppContext } from '../App';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

const UnitThreeQuizPage: React.FC = () => {
  const { t } = useAppContext();
  const questions: QuizQuestion[] = useMemo(() => t('unit3.quiz.questions'), [t]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (optionIndex: number) => {
    if (showResults) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers(Array(questions.length).fill(null));
    setShowResults(false);
  };

  const score = useMemo(() => {
    return selectedAnswers.reduce((acc, answer, index) => {
      return answer === questions[index].correctAnswer ? acc + 1 : acc;
    }, 0);
  }, [selectedAnswers, questions]);

  if (showResults) {
    return (
      <div>
        <SectionTitle title={t('unit3.quiz.title')} />
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            {t('unit3.quiz.score', { score, total: questions.length })}
          </h3>
          <button
            onClick={handleRetry}
            className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-700 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            {t('unit3.quiz.retry')}
          </button>
        </div>

        <div className="max-w-4xl mx-auto mt-8 space-y-4">
          {questions.map((q, index) => {
            const userAnswer = selectedAnswers[index];
            const isCorrect = userAnswer === q.correctAnswer;
            return (
              <div key={index} className={`p-6 rounded-lg shadow-md ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border`}>
                <p className="font-bold text-lg text-gray-800 mb-4">{index + 1}. {q.question}</p>
                <p className="text-sm text-gray-600">
                  {t('unit3.quiz.yourAnswer')} <span className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>{userAnswer !== null ? q.options[userAnswer] : 'No answer'}</span>
                </p>
                {!isCorrect && (
                  <p className="text-sm text-gray-600 mt-1">
                    {t('unit3.quiz.correctAnswer')} <span className="font-semibold text-green-700">{q.options[q.correctAnswer]}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedOption = selectedAnswers[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div>
      <SectionTitle
        title={t('unit3.quiz.title')}
        subtitle={t('unit3.quiz.subtitle')}
      />

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-lg font-bold text-gray-800">{currentQuestion.question}</h4>
          <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {t('unit3.quiz.question', { current: currentQuestionIndex + 1, total: questions.length })}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedOption === index;
            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 rounded-lg text-start transition duration-200 border-2 ${
                  isSelected 
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-105' 
                    : 'bg-slate-50 text-gray-700 border-slate-200 hover:bg-emerald-100 hover:border-emerald-300'
                }`}
              >
                <span className="font-semibold">{option}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-700 transition duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              {t('unit3.quiz.submit')}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="bg-gray-700 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('unit3.quiz.next')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitThreeQuizPage;