


import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import { useAppContext } from '../App';
import { QuizResult } from '../types';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizProps {
  unitKey: 'unit1' | 'unit2' | 'unit3' | 'unit4' | 'unit5' | 'unit6' | 'unit7';
}

const QUIZ_BATCH_SIZE = 5;

// Helper to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Quiz: React.FC<QuizProps> = ({ unitKey }) => {
  const { t } = useAppContext();

  const allQuestions: QuizQuestion[] = useMemo(() => t(`${unitKey}.quiz.questions`), [t, unitKey]);

  const [sessionQuestions, setSessionQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [sessionKey, setSessionKey] = useState(0); // Used to trigger a new session

  const score = useMemo(() => {
    return selectedAnswers.reduce((acc, answer, index) => {
      if (answer !== null && answer === sessionQuestions[index].correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }, [selectedAnswers, sessionQuestions]);

  useEffect(() => {
    const seenIndicesKey = `quiz_seen_${unitKey}`;
    let seenIndices: number[] = JSON.parse(localStorage.getItem(seenIndicesKey) || '[]');

    if (seenIndices.length >= allQuestions.length) {
      seenIndices = []; // Reset if all questions have been seen
    }

    const availableIndices = allQuestions
      .map((_, index) => index)
      .filter(index => !seenIndices.includes(index));

    const shuffledAvailableIndices = shuffleArray(availableIndices);
    const nextBatchIndices = shuffledAvailableIndices.slice(0, QUIZ_BATCH_SIZE);
    
    const newSessionQuestions = nextBatchIndices.map(index => allQuestions[index]);
    setSessionQuestions(newSessionQuestions);

    // Reset state for the new session
    setCurrentQuestionIndex(0);
    setSelectedAnswers(Array(newSessionQuestions.length).fill(null));
    setShowResults(false);

  }, [allQuestions, unitKey, sessionKey]);

  const handleAnswerSelect = (optionIndex: number) => {
    if (showResults) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < sessionQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);

    const newResult: QuizResult = {
        unitKey,
        score,
        total: sessionQuestions.length,
        date: new Date().toISOString(),
    };
    const history: QuizResult[] = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    history.unshift(newResult);
    localStorage.setItem('quizHistory', JSON.stringify(history.slice(0, 20)));


    const seenIndicesKey = `quiz_seen_${unitKey}`;
    const seenIndices: number[] = JSON.parse(localStorage.getItem(seenIndicesKey) || '[]');
    
    const justAnsweredOriginalIndices = sessionQuestions.map(sq => 
      allQuestions.findIndex(aq => aq.question === sq.question)
    );

    const newSeenIndices = [...new Set([...seenIndices, ...justAnsweredOriginalIndices])];
    localStorage.setItem(seenIndicesKey, JSON.stringify(newSeenIndices));
  };

  const handleRetry = () => {
    setSessionKey(prevKey => prevKey + 1); // Trigger useEffect to start a new session
  };


  if (sessionQuestions.length === 0) {
    return <div>Loading questions...</div>
  }

  if (showResults) {
    const unitNumber = unitKey.replace('unit', '');
    const backToUnitPath = `/unit-${unitNumber}`;

    return (
      <div>
        <SectionTitle title={t(`${unitKey}.quiz.title`)} />
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl text-center">
          <h3 className="text-3xl font-bold text-gray-800 dark:text-slate-100 mb-4">
            {t(`${unitKey}.quiz.score`, { score, total: sessionQuestions.length })}
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
            <button
              onClick={handleRetry}
              className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-700 transition duration-300 transform hover:scale-105 shadow-lg"
            >
              {t(`${unitKey}.quiz.retry`)}
            </button>
            <Link
              to={backToUnitPath}
              className="bg-gray-200 text-gray-700 font-bold py-3 px-8 rounded-full hover:bg-gray-300 transition duration-300 shadow-lg dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500"
            >
              {t('quiz.backToUnit')}
            </Link>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8 space-y-4">
          {sessionQuestions.map((q, index) => {
            const userAnswerIndex = selectedAnswers[index];
            const isCorrect = userAnswerIndex === q.correctAnswer;
            return (
              <div key={index} className={`p-6 rounded-lg shadow-md ${isCorrect ? 'bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-800' : 'bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-800'} border`}>
                <p className="font-bold text-lg text-gray-800 dark:text-slate-100 mb-4">{index + 1}. {q.question}</p>
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  {t(`${unitKey}.quiz.yourAnswer`)} <span className={`font-semibold ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>{userAnswerIndex !== null ? q.options[userAnswerIndex] : 'No answer'}</span>
                </p>
                {!isCorrect && (
                  <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                    {t(`${unitKey}.quiz.correctAnswer`)} <span className="font-semibold text-green-700 dark:text-green-400">{q.options[q.correctAnswer]}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const currentQuestion = sessionQuestions[currentQuestionIndex];
  const selectedOption = selectedAnswers[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === sessionQuestions.length - 1;
  const progressPercentage = ((currentQuestionIndex + 1) / sessionQuestions.length) * 100;

  return (
    <div>
      <SectionTitle
        title={t(`${unitKey}.quiz.title`)}
        subtitle={t(`${unitKey}.quiz.subtitle`)}
      />

      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl">
        <div className="mb-4 h-2.5 w-full rounded-full bg-gray-200 dark:bg-slate-700">
          <div
            className="h-2.5 rounded-full bg-emerald-500 transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h4 className="text-lg font-bold text-gray-800 dark:text-slate-100">{currentQuestion.question}</h4>
          <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full dark:bg-slate-700 dark:text-slate-400">
            {t(`${unitKey}.quiz.question`, { current: currentQuestionIndex + 1, total: sessionQuestions.length })}
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
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-105 dark:bg-emerald-600 dark:border-emerald-500' 
                    : 'bg-slate-50 text-gray-700 border-slate-200 hover:bg-emerald-100 hover:border-emerald-300 dark:bg-slate-700/50 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-emerald-900/50 dark:hover:border-emerald-700'
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
              {t(`${unitKey}.quiz.submit`)}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="bg-gray-700 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-slate-600 dark:hover:bg-slate-500"
            >
              {t(`${unitKey}.quiz.next`)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
