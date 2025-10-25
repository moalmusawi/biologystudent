

import React, { useState, useMemo, useEffect } from 'react';
import { useAppContext } from '../App';
import { courseData } from '../courseData';
import { CloseIcon, BookIcon } from './IconComponents';

interface SearchProps {
  onClose: () => void;
}

const Search: React.FC<SearchProps> = ({ onClose }) => {
  const { t } = useAppContext();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const searchResults = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    const lowerCaseQuery = query.toLowerCase();
    const results: { lesson: any; unit: any }[] = [];

    courseData.forEach(unit => {
      unit.lessons.forEach(lesson => {
        const lessonTitle = t(lesson.titleKey).toLowerCase();
        if (lessonTitle.includes(lowerCaseQuery)) {
          results.push({ lesson, unit });
        }
      });
    });

    return results;
  }, [query, t]);

  return (
    <div 
      className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex justify-center items-start pt-16 md:pt-24"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative bg-white dark:bg-slate-800 w-11/12 md:w-3/4 lg:w-1/2 max-w-3xl rounded-lg shadow-2xl flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-slate-100">{t('search.title')}</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-200 focus:outline-none transition-colors dark:text-gray-400 dark:hover:bg-gray-700"
            aria-label="Close search"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder')}
            autoFocus
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
          />
        </div>

        <div className="flex-grow overflow-y-auto p-6 pt-0">
            {query.trim() && (
                <>
                    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-4">{t('search.resultsTitle')}</h3>
                    {searchResults.length > 0 ? (
                        <ul className="space-y-3">
                            {searchResults.map(({ lesson, unit }, index) => (
                            <li key={index} className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg flex items-center justify-between transition hover:bg-slate-100 dark:hover:bg-slate-600">
                                <div>
                                <p className="font-bold text-gray-800 dark:text-slate-100">{t(lesson.titleKey)}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {t('search.inUnit', { unitTitle: t(unit.titleKey) })}
                                </p>
                                </div>
                                <a
                                    href={lesson.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-emerald-600 text-white font-bold py-2 px-5 rounded-full hover:bg-emerald-700 transition duration-300 transform hover:scale-105 shadow-md"
                                >
                                    {t('search.go')}
                                </a>
                            </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-8">
                            <BookIcon className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-500 mb-2" />
                            <p className="text-gray-500 dark:text-gray-400">{t('search.noResults')}</p>
                        </div>
                    )}
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default Search;