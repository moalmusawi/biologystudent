
import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { useAppContext } from '../App';
import { QuizResult } from '../types';

const QuizReviewPage: React.FC = () => {
    const { state } = useLocation();
    const { t } = useAppContext();
    const quizResult = state?.quizResult as QuizResult | undefined;

    if (!quizResult) {
        return <Navigate to="/profile" replace />;
    }

    const { unitKey, score, total, date, questions, selectedAnswers } = quizResult;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString(t('languageCode'), {
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div>
            <SectionTitle title={t('quizReview.title')} subtitle={t(`${unitKey}.quiz.title`)} />

            <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-lg shadow-xl mb-8">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-4 border-b pb-4 dark:border-slate-700">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100">
                        {t('quizReview.score')}: {score} / {total}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">{t('quizReview.date')}:</span> {formatDate(date)}
                    </p>
                </div>

                <div className="mt-6 space-y-4">
                    {questions.map((q, index) => {
                        const userAnswerIndex = selectedAnswers[index];
                        const isCorrect = userAnswerIndex === q.correctAnswer;
                        return (
                            <div key={index} className={`p-6 rounded-lg shadow-md ${isCorrect ? 'bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-800' : 'bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-800'} border`}>
                                <p className="font-bold text-lg text-gray-800 dark:text-slate-100 mb-4">{index + 1}. {q.question}</p>
                                <p className="text-sm text-gray-600 dark:text-slate-400">
                                    {t(`${unitKey}.quiz.yourAnswer`)} <span className={`font-semibold ${isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>{userAnswerIndex !== null && q.options[userAnswerIndex] ? q.options[userAnswerIndex] : 'لا توجد إجابة'}</span>
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

            <div className="text-center">
                <Link
                    to="/profile"
                    className="bg-gray-200 text-gray-700 font-bold py-3 px-8 rounded-full hover:bg-gray-300 transition duration-300 shadow-lg dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500"
                >
                    {t('quizReview.backToProfile')}
                </Link>
            </div>
        </div>
    );
};

export default QuizReviewPage;
