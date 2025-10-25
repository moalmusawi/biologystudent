
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { BookIcon, MenuIcon, CloseIcon, SearchIcon, SunIcon, MoonIcon, EllipsisVerticalIcon, LanguageIcon, UserCircleIcon, PlusIcon, MinusIcon, ContrastIcon } from './IconComponents';
import { useAppContext } from '../App';

interface HeaderProps {
  onSearchClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  const toolsMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { language, setLanguage, theme, setTheme, t, profileName, fontSize, setFontSize, highContrast, setHighContrast } = useAppContext();

  const FONT_STEP = 1;
  const MIN_FONT_SIZE = 12;
  const MAX_FONT_SIZE = 24;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target as Node)) {
        setIsToolsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toolsMenuRef]);

  const activeLinkClass = 'bg-emerald-500 text-white';
  const inactiveLinkClass = 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white';
  const mobileInactiveLinkClass = 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-700';

  const handleLanguageChange = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };
  
  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSearchClick = () => {
    onSearchClick();
    setIsToolsMenuOpen(false);
  };

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + FONT_STEP, MAX_FONT_SIZE));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - FONT_STEP, MIN_FONT_SIZE));
  const toggleHighContrast = () => setHighContrast(prev => !prev);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-colors duration-300 dark:bg-slate-800/80 dark:shadow-slate-700/[0.1]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <Link to="/" className="flex items-center text-emerald-600 dark:text-emerald-400">
                    <BookIcon className="h-8 w-8" />
                    </Link>
                </div>
                 <div className="hidden md:block ml-6 rtl:mr-6">
                    {profileName ? (
                        <Link to="/profile" className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-400">
                            <UserCircleIcon className="h-6 w-6" />
                            <span>{t('header.welcome', { name: profileName })}</span>
                        </Link>
                    ) : (
                        <Link to="/profile" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300">
                            {t('header.setupProfile')}
                        </Link>
                    )}
                </div>
            </div>

          <div className="flex items-center">
            <nav className="hidden md:flex items-center space-x-reverse space-x-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.path ? activeLinkClass : inactiveLinkClass
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}
            </nav>

            <div className="flex items-center ml-4">
               <div className="relative" ref={toolsMenuRef}>
                 <button
                    onClick={() => setIsToolsMenuOpen(prev => !prev)}
                    className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none transition-colors"
                    aria-label="Open tools menu"
                    aria-expanded={isToolsMenuOpen}
                    aria-haspopup="true"
                    id="tools-menu-button"
                  >
                   <EllipsisVerticalIcon className="h-6 w-6" />
                 </button>

                 {isToolsMenuOpen && (
                   <div 
                     className="absolute end-0 mt-2 w-64 origin-top-right bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-20 focus:outline-none"
                     role="menu"
                     aria-orientation="vertical"
                     aria-labelledby="tools-menu-button"
                   >
                     <button
                        onClick={handleSearchClick}
                        className="w-full text-start flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        role="menuitem"
                      >
                       <SearchIcon className="h-5 w-5" />
                       <span>{t('search.title')}</span>
                     </button>
                     <div className="my-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                     <button
                        onClick={handleThemeChange}
                        className="w-full text-start flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        role="menuitem"
                      >
                       {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                       <span>{t(theme === 'light' ? 'tools.theme.dark' : 'tools.theme.light')}</span>
                     </button>
                     <button
                        onClick={handleLanguageChange}
                        className="w-full text-start flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        role="menuitem"
                      >
                        <LanguageIcon className="h-5 w-5" />
                       <span>{t(language === 'ar' ? 'tools.language.en' : 'tools.language.ar')}</span>
                     </button>
                    <div className="my-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                     <div className="px-4 pt-3 pb-1">
                        <p className="text-xs font-semibold text-gray-500 uppercase dark:text-gray-400 tracking-wider">{t('tools.accessibility.title')}</p>
                    </div>
                    <div className="flex items-center justify-between px-4 py-2">
                        <span className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">{t('tools.fontSize')}</span>
                        <div className="flex items-center gap-1">
                            <button onClick={decreaseFontSize} disabled={fontSize <= MIN_FONT_SIZE} className="p-1.5 rounded-full text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-700">
                                <MinusIcon className="h-5 w-5" />
                            </button>
                            <button onClick={increaseFontSize} disabled={fontSize >= MAX_FONT_SIZE} className="p-1.5 rounded-full text-gray-500 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed dark:text-gray-400 dark:hover:bg-gray-700">
                                <PlusIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                    <button onClick={toggleHighContrast} className="w-full text-start flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700" role="menuitem">
                        <ContrastIcon className="h-5 w-5" />
                        <span>{t('tools.highContrast')}</span>
                        <span className={`ms-auto text-xs font-bold px-2 py-0.5 rounded-full ${highContrast ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}>
                            {highContrast ? 'ON' : 'OFF'}
                        </span>
                    </button>

                   </div>
                 )}
               </div>
            </div>

            <div className="md:hidden ml-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:text-gray-400 dark:hover:bg-emerald-600"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  location.pathname === link.path ? activeLinkClass : mobileInactiveLinkClass
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
