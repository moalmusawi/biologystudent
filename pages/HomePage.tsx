
import React from 'react';
import { Link } from 'react-router-dom';
import { BookIcon, DnaIcon, LeafIcon, MicroscopeIcon, EcgIcon } from '../components/IconComponents';
import { useAppContext } from '../App';

const HomePage: React.FC = () => {
  const { t } = useAppContext();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-13rem)] -my-8 overflow-hidden">
      <div className="text-center relative">
        <div 
          className="relative inline-block p-6 bg-emerald-100/50 rounded-full mb-6 dark:bg-emerald-900/50"
          style={{ animation: 'pulse 2s infinite' }}
        >
          <BookIcon className="w-24 h-24 text-emerald-600 dark:text-emerald-400" />

          {/* Animated Icons */}
          <DnaIcon className="w-8 h-8 text-emerald-500 absolute top-1/2 left-1/2 icon-anim" style={{ animationName: 'float-1' }} />
          <LeafIcon className="w-8 h-8 text-cyan-500 absolute top-1/2 left-1/2 icon-anim" style={{ animationName: 'float-2' }} />
          <MicroscopeIcon className="w-8 h-8 text-amber-500 absolute top-1/2 left-1/2 icon-anim" style={{ animationName: 'float-3' }} />
          <EcgIcon className="w-8 h-8 text-rose-500 absolute top-1/2 left-1/2 icon-anim" style={{ animationName: 'float-4' }} />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-slate-100 mb-4 animate-fade-in-down">
          {t('appName.pt1')} <span className="text-emerald-600 dark:text-emerald-400">{t('appName.pt2')}</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-slate-400 leading-relaxed mb-8 animate-fade-in-up">
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

        .icon-anim {
          transform-origin: center center;
          opacity: 0;
          animation-duration: 20s; /* 4 icons * 5s = 20s total cycle */
          animation-iteration-count: infinite;
          animation-timing-function: ease-out;
        }

        @keyframes float-1 { /* DNA */
          0% { transform: translate(-50%, -50%) scale(0.3) rotate(0deg); opacity: 0; }
          5%, 20% { opacity: 0.9; }
          25% { transform: translate(-100px, -100px) scale(1) rotate(360deg); opacity: 0; }
          100% { transform: translate(-100px, -100px) scale(1) rotate(360deg); opacity: 0; }
        }
        @keyframes float-2 { /* Leaf */
          0%, 25% { transform: translate(-50%, -50%) scale(0.3) rotate(0deg); opacity: 0; }
          30%, 45% { opacity: 0.9; }
          50% { transform: translate(120px, -90px) scale(1) rotate(-360deg); opacity: 0; }
          100% { transform: translate(120px, -90px) scale(1) rotate(-360deg); opacity: 0; }
        }
        @keyframes float-3 { /* Microscope */
          0%, 50% { transform: translate(-50%, -50%) scale(0.3) rotate(0deg); opacity: 0; }
          55%, 70% { opacity: 0.9; }
          75% { transform: translate(-100px, 120px) scale(1) rotate(360deg); opacity: 0; }
          100% { transform: translate(-100px, 120px) scale(1) rotate(360deg); opacity: 0; }
        }
        @keyframes float-4 { /* EcgIcon */
          0%, 75% { transform: translate(-50%, -50%) scale(0.3) rotate(0deg); opacity: 0; }
          80%, 95% { opacity: 0.9; }
          100% { transform: translate(130px, 100px) scale(1) rotate(-360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;