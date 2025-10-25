
import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAppContext } from '../App';
import { QuizResult } from '../types';

const ProfilePage: React.FC = () => {
  const { t, language, profileName, setProfileName } = useAppContext();
  const [nameInput, setNameInput] = useState(profileName);
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    setQuizHistory(history);
  }, []);

  const handleNameSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileName(nameInput);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000); // Hide message after 2 seconds
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString(t('languageCode'), {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
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
          </form>
          {isSaved && <p className="text-green-600 dark:text-green-400 mt-2 text-sm">{language === 'ar' ? 'تم حفظ الاسم بنجاح!' : 'Name saved successfully!'}</p>}
        </div>

        {/* Quiz History */}
        <div className="bg-white p-8 rounded-lg shadow-md dark:bg-slate-800">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-6">{t('profile.quizHistory.title')}</h3>
          {quizHistory.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-start">
                <thead className="border-b-2 dark:border-slate-700">
                  <tr>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">{t('profile.quizHistory.unit')}</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">{t('profile.quizHistory.score')}</th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">{t('profile.quizHistory.date')}</th>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 py-4">{t('profile.quizHistory.empty')}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
