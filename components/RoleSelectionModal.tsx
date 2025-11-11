import React from 'react';
import { useAppContext } from '../App';

interface RoleSelectionModalProps {
  onSelectRole: (role: 'student' | 'teacher') => void;
}

const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({ onSelectRole }) => {
  const { t } = useAppContext();

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-80 z-[100] flex justify-center items-center backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-800 w-11/12 max-w-md rounded-lg shadow-2xl p-8 text-center animate-bounce-in">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-4">{t('roleModal.title')}</h2>
        <p className="text-gray-600 dark:text-slate-400 mb-8">{t('roleModal.subtitle')}</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => onSelectRole('teacher')}
            className="flex-1 bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-emerald-700 transition duration-300 transform hover:scale-105"
          >
            {t('roleModal.teacher')}
          </button>
          <button
            onClick={() => onSelectRole('student')}
            className="flex-1 bg-sky-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-sky-700 transition duration-300 transform hover:scale-105"
          >
            {t('roleModal.student')}
          </button>
        </div>
      </div>
       <style>{`
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes bounce-in {
            0% { transform: scale(0.8); opacity: 0; }
            70% { transform: scale(1.05); }
            100% { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-bounce-in { animation: bounce-in 0.4s ease-out 0.1s forwards; }
      `}</style>
    </div>
  );
};

export default RoleSelectionModal;
