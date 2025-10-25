import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { useAppContext } from '../App';
import { QuizResult } from '../types';

const ProfilePage: React.FC = () => {
  const { t, profileName, setProfileName } = useAppContext();
  const [nameInput, setNameInput] = useState(profileName);
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isNameCleared, setIsNameCleared] = useState(false);
  const [showConfirmClearHistory, setShowConfirmClearHistory] = useState(false);

  // State for undo functionality (quiz history only)
  const [isHistoryCleared, setIsHistoryCleared] = useState(false);
  const historyBackupRef = useRef<QuizResult[]>([]);
  const undoHistoryTimerRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);
  const [undoHistoryCountdown, setUndoHistoryCountdown] = useState(5);

  useEffect(() => {
    try {
        const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
        setQuizHistory(history);
    } catch(e) {
        setQuizHistory([]);
    }
  }, []);
  
  // Cleanup timers on component unmount
  useEffect(() => {
    return () => {
        if (undoHistoryTimerRef.current) {
            clearTimeout(undoHistoryTimerRef.current);
        }
        if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
        }
    };
  }, []);

  const handleNameSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    setProfileName(nameInput);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000); // Hide message after 2 seconds
  };
  
  const handleNameClear = () => {
    setNameInput('');
    setProfileName('');
    setIsNameCleared(true);
    setTimeout(() => setIsNameCleared(false), 2000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString(t('languageCode'), {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const handleConfirmClearHistory = () => {
    historyBackupRef.current = [...quizHistory];
    localStorage.removeItem('quizHistory');
    setQuizHistory([]);
    setShowConfirmClearHistory(false);
    setIsHistoryCleared(true);
    setUndoHistoryCountdown(5);

    undoHistoryTimerRef.current = window.setTimeout(() => {
      setIsHistoryCleared(false);
      historyBackupRef.current = [];
      if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current);
      }
    }, 5000);

    countdownIntervalRef.current = window.setInterval(() => {
        setUndoHistoryCountdown(prev => {
            if (prev <= 1) {
                if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
                return 0;
            }
            return prev - 1;
        });
    }, 1000);
  };

  const handleUndoClearHistory = () => {
    if (undoHistoryTimerRef.current) {
      clearTimeout(undoHistoryTimerRef.current);
    }
    if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
    }
    localStorage.setItem('quizHistory', JSON.stringify(historyBackupRef.current));
    setQuizHistory(historyBackupRef.current);
    setIsHistoryCleared(false);
    historyBackupRef.current = [];
  };

  return (
    <div>
      <SectionTitle title={t('profile.title')} subtitle={t('profile.subtitle')} />
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Info */}
          <div className="bg-white p-8 rounded-lg shadow-md dark:bg-slate-800">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-6">{t('profile.name.title')}</h3>
            <form onSubmit={handleNameSave} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder={t('profile.name.placeholder')}
                className="flex-grow w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-800 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
              />
              <button type="submit" className="bg-emerald-600 text-white font-bold py-2 px-6 rounded-md hover:bg-emerald-700 transition duration-300">
                {t('profile.name.save')}
              </button>
              {profileName && (
                <button 
                  type="button" 
                  onClick={handleNameClear} 
                  className="bg-red-600 text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition duration-300"
                >
                  {t('profile.name.clear')}
                </button>
              )}
            </form>
            {isSaved && <p className="text-green-600 dark:text-green-400 mt-2 text-sm">{t('profile.name.savedMessage')}</p>}
            {isNameCleared && <p className="text-red-600 dark:text-red-400 mt-2 text-sm">{t('profile.name.clearedMessage')}</p>}
          </div>

          {/* Quiz History */}
          <div className="bg-white p-8 rounded-lg shadow-md dark:bg-slate-800">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100">{t('profile.quizHistory.title')}</h3>
                {quizHistory.length > 0 && !isHistoryCleared && !showConfirmClearHistory && (
                    <button 
                        onClick={() => setShowConfirmClearHistory(true)} 
                        className="text-sm font-semibold text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400 transition-colors"
                    >
                        {t('profile.quizHistory.clear')}
                    </button>
                )}
            </div>

            {isHistoryCleared ? (
                <div className="text-center py-4">
                    <p className="text-gray-600 dark:text-slate-400">{t('profile.quizHistory.clearedMessage')}</p>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <button onClick={handleUndoClearHistory} className="text-sky-600 font-bold hover:underline">
                          {t('profile.data.undo')}
                      </button>
                      <span className="text-sm text-gray-400 dark:text-slate-500">({undoHistoryCountdown})</span>
                    </div>
                </div>
            ) : quizHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-start">
                  <thead className="border-b-2 dark:border-slate-700">
                    <tr>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">{t('profile.quizHistory.unit')}</th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">{t('profile.quizHistory.score')}</th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-left">{t('profile.quizHistory.date')}</th>
                      <th className="p-3 text-sm font-semibold tracking-wide text-right"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-700/50">
                    {quizHistory.map((result, index) => (
                      <tr key={index}>
                        <td className="p-3 font-semibold text-gray-800 dark:text-slate-200">{t(`${result.unitKey}.title`)}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                              <span className="font-semibold">{result.score} / {result.total}</span>
                              <div className="w-24 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                  <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${(result.score / result.total) * 100}%` }}></div>
                              </div>
                          </div>
                        </td>
                        <td className="p-3 text-sm text-gray-500 dark:text-gray-400">{formatDate(result.date)}</td>
                        <td className="p-3 text-right">
                          <Link
                              to="/quiz-review"
                              state={{ quizResult: result }}
                              className="bg-emerald-600 text-white text-sm font-bold py-2 px-4 rounded-full hover:bg-emerald-700 transition"
                          >
                              {t('profile.quizHistory.review')}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 py-4">{t('profile.quizHistory.empty')}</p>
            )}

            {showConfirmClearHistory && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700/50 rounded-lg">
                    <p className="font-semibold text-red-800 dark:text-red-200">{t('profile.quizHistory.clearConfirmTitle')}</p>
                    <p className="text-sm text-red-700 dark:text-red-300 mt-1">{t('profile.quizHistory.clearConfirmDesc')}</p>
                    <div className="mt-4 flex gap-4">
                        <button
                            onClick={handleConfirmClearHistory}
                            className="bg-red-600 text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition"
                        >
                            {t('profile.quizHistory.confirm.yes')}
                        </button>
                        <button
                            onClick={() => setShowConfirmClearHistory(false)}
                            className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-md hover:bg-gray-300 transition dark:bg-slate-600 dark:text-slate-200 dark:hover:bg-slate-500"
                        >
                            {t('profile.data.confirm.no')}
                        </button>
                    </div>
                </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default ProfilePage;