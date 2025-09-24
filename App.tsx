
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import { translations } from './translations';

// Page Imports
import TextbooksPage from './pages/AboutPage';
import TeacherGuidePage from './pages/NewsAndEventsPage';
import ExamsPage from './pages/ProjectsPage';
import UnitOnePage from './pages/ExperimentsPage';
import UnitTwoPage from './pages/CompetitionsPage';
import UnitThreePage from './pages/HallOfFamePage';
import UnitFourPage from './pages/QuizPage';
import ContactPage from './pages/ContactPage';
import AboutProjectPage from './pages/AboutProjectPage';
import SuccessCriteriaPage from './pages/SuccessCriteriaPage';
import UnitFivePage from './pages/UnitFivePage';
import UnitSixPage from './pages/UnitSixPage';
import UnitSevenPage from './pages/UnitSevenPage';
import UnitOneQuizPage from './pages/UnitOneQuizPage';
import UnitTwoQuizPage from './pages/UnitTwoQuizPage';
import UnitThreeQuizPage from './pages/UnitThreeQuizPage';
import UnitFourQuizPage from './pages/UnitFourQuizPage';
import UnitFiveQuizPage from './pages/UnitFiveQuizPage';
import UnitSixQuizPage from './pages/UnitSixQuizPage';
import UnitSevenQuizPage from './pages/UnitSevenQuizPage';


// Types
type Language = 'ar' | 'en';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: any) => any;
}

// Context
const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Main App Content Component
const AppContent: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutProjectPage />} />
                    <Route path="/success-criteria" element={<SuccessCriteriaPage />} />
                    <Route path="/textbooks" element={<TextbooksPage />} />
                    <Route path="/teacher-guide" element={<TeacherGuidePage />} />
                    <Route path="/exams" element={<ExamsPage />} />
                    <Route path="/unit-1" element={<UnitOnePage />} />
                    <Route path="/unit-1/quiz" element={<UnitOneQuizPage />} />
                    <Route path="/unit-2" element={<UnitTwoPage />} />
                    <Route path="/unit-2/quiz" element={<UnitTwoQuizPage />} />
                    <Route path="/unit-3" element={<UnitThreePage />} />
                    <Route path="/unit-3/quiz" element={<UnitThreeQuizPage />} />
                    <Route path="/unit-4" element={<UnitFourPage />} />
                    <Route path="/unit-4/quiz" element={<UnitFourQuizPage />} />
                    <Route path="/unit-5" element={<UnitFivePage />} />
                    <Route path="/unit-5/quiz" element={<UnitFiveQuizPage />} />
                    <Route path="/unit-6" element={<UnitSixPage />} />
                    <Route path="/unit-6/quiz" element={<UnitSixQuizPage />} />
                    <Route path="/unit-7" element={<UnitSevenPage />} />
                    <Route path="/unit-7/quiz" element={<UnitSevenQuizPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

// App Component acting as Provider
const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ar');

  // Language effect
  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language;
    if (storedLang) {
      setLanguage(storedLang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    if (language === 'ar') {
      document.body.classList.add('font-cairo');
      document.body.classList.remove('font-poppins');
    } else {
      document.body.classList.add('font-poppins');
      document.body.classList.remove('font-cairo');
    }
    localStorage.setItem('language', language);
  }, [language]);

  const t = useCallback((key: string, options?: any): any => {
    const translation = translations[language][key] || key;
    if (options) {
      // A simple interpolation, can be expanded
      return Object.keys(options).reduce((acc, current) => {
        return acc.replace(`{${current}}`, options[current]);
      }, translation);
    }
    return translation;
  }, [language]);
  
  const contextValue = {
    language,
    setLanguage,
    t,
  };

  return (
    <AppContext.Provider value={contextValue}>
        <HashRouter>
            <AppContent />
        </HashRouter>
    </AppContext.Provider>
  );
};

export default App;