import React from 'react';
import { Link } from 'react-router-dom';
import { BookIcon } from '../components/IconComponents';
import { useAppContext } from '../App';

const HomePage: React.FC = () => {
  const { t } = useAppContext();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-13rem)] -my-8">
      <div className="text-center">
        <div 
          className="relative inline-block p-6 bg-emerald-100/50 rounded-full mb-6"
          style={{ animation: 'pulse 2s infinite' }}
        >
          <BookIcon className="w-24 h-24 text-emerald-600" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 animate-fade-in-down">
          {t('appName.pt1')} <span className="text-emerald-600">{t('appName.pt2')}</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed mb-8 animate-fade-in-up">
          {t('hero.title')}
        </p>
        
        <Link
          to="/textbooks"
          className="inline-block bg-emerald-600 text-white font-bold py-3 px-10 rounded-full hover:bg-emerald-700 transition duration-300 transform hover:scale-105 shadow-lg animate-bounce-in"
        >
          {t('hero.cta')}
        </Link>
      </div>
      
      {/* Adding keyframes for animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(16, 185, 129, 0); }
        }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-in {
            0% { transform: scale(0.5); opacity: 0; }
            70% { transform: scale(1.05); }
            100% { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in-down { animation: fade-in-down 0.5s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.5s ease-out 0.2s forwards; opacity: 0; }
        .animate-bounce-in { animation: bounce-in 0.6s ease-out 0.4s forwards; opacity: 0; transform: scale(0.5); }
      `}</style>
    </div>
  );
};

export default HomePage;