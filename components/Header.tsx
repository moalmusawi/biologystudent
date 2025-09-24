import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { BookIcon, MenuIcon, CloseIcon } from './IconComponents';
import { useAppContext } from '../App';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useAppContext();

  const activeLinkClass = 'bg-emerald-500 text-white';
  const inactiveLinkClass = 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-600';
  const mobileInactiveLinkClass = 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-600';


  const handleLanguageChange = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-emerald-600">
              <BookIcon className="h-8 w-8" />
              <span>{t('appName.pt1')} <span className="text-gray-700">{t('appName.pt2')}</span></span>
            </Link>
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
               <button
                onClick={handleLanguageChange}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-200 focus:outline-none transition-colors"
                aria-label="Toggle Language"
              >
                <span className="font-semibold text-sm">{language === 'ar' ? 'EN' : 'AR'}</span>
              </button>
            </div>

            <div className="md:hidden ml-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded="false"
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