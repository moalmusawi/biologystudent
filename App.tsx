
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import { translations } from './translations';
import BackToTopButton from './components/BackToTopButton';
import { FavoritesProvider } from './components/FavoritesContext';
import Search from './components/Search';
import { QuizResult } from './types';

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
import ReferencePage from './pages/ReferencePage';
import ProfilePage from './pages/ProfilePage';
import QuizReviewPage from './pages/QuizReviewPage';


// Types
type Language = 'ar' | 'en';
type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: (key: string, options?: any) => any;
  profileName: string;
  setProfileName: (name: string) => void;
  fontSize: number;
  setFontSize: (size: number | ((prev: number) => number)) => void;
  highContrast: boolean;
  setHighContrast: (contrast: boolean | ((prev: boolean) => boolean)) => void;
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

// App Component acting as Provider
const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ar');
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme') as Theme;
    if (storedTheme) return storedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [profileName, setProfileNameState] = useState<string>(() => localStorage.getItem('profileName') || '');
  const [fontSize, setFontSize] = useState<number>(() => {
    const storedSize = localStorage.getItem('fontSize');
    return storedSize ? parseFloat(storedSize) : 15;
  });
  const [highContrast, setHighContrast] = useState<boolean>(() => localStorage.getItem('highContrast') === 'true');

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

  // Theme effect
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Profile Name effect
  const setProfileName = (name: string) => {
    setProfileNameState(name);
    localStorage.setItem('profileName', name);
  };

  // Accessibility effects
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    localStorage.setItem('highContrast', String(highContrast));
  }, [highContrast]);

  const t = useCallback((key: string, options?: any): any => {
    const translation = translations[language][key] || key;
    if (options) {
      return Object.keys(options).reduce((acc, current) => {
        return acc.replace(`{${current}}`, options[current]);
      }, translation);
    }
    return translation;
  }, [language]);
  
  const contextValue = {
    language,
    setLanguage,
    theme,
    setTheme,
    t,
    profileName,
    setProfileName,
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
  };

  const handleOpenSearch = () => setIsSearchOpen(true);
  const handleCloseSearch = () => setIsSearchOpen(false);

  return (
    <AppContext.Provider value={contextValue}>
      <FavoritesProvider>
        <HashRouter>
          <div className="flex flex-col min-h-screen">
            <Header onSearchClick={handleOpenSearch} />
            {isSearchOpen && <Search onClose={handleCloseSearch} />}
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
                    <Route path="/references" element={<ReferencePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/quiz-review" element={<QuizReviewPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Routes>
            </main>
            <BackToTopButton />
        </div>
        </HashRouter>
      </FavoritesProvider>
    </AppContext.Provider>
  );
};

export default App;