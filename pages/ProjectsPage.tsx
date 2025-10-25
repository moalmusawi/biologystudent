

import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAppContext } from '../App';
import { BookIcon, ExternalLinkIcon } from '../components/IconComponents';

const ExamsPage: React.FC = () => {
  const { t } = useAppContext();
  
  const reviews = [
    { titleKey: 'exams.reviews.unit1', link: 'https://drive.google.com/file/d/1qL0Q7L8uQetJ8nGWHREmlx90G3XKmZ73/view?usp=drive_link' },
    { titleKey: 'exams.reviews.unit2', link: 'https://drive.google.com/file/d/1gCNRkyEq8X7ek2dX-CiEDLGd04wkvshz/view?usp=drive_link' },
    { titleKey: 'exams.reviews.unit3', link: 'https://drive.google.com/file/d/1Wnxa0K6ETt6evKGhvK_yew-tqMcXG5uv/view?usp=drive_link' },
    { titleKey: 'exams.reviews.unit4', link: 'https://drive.google.com/file/d/1pA0DDbyurnTt5yuFrLtJwDEuumVdWNKd/view?usp=drive_link' },
    { titleKey: 'exams.reviews.unit5and6', link: 'https://drive.google.com/file/d/1Q2y8QQj17xdib23AR9agMvJgINNZ7vI5/view?usp=drive_link' },
    { titleKey: 'exams.reviews.unit7', link: 'https://drive.google.com/file/d/1-PomSsPsJND5gwvno949SBEuIhW_w38l/view?usp=drive_link' },
  ];

  const finals = [
    { titleKey: 'exams.finals.term1', link: 'https://drive.google.com/file/d/1SIc2Cb0qfHSY0FaQhJDGM85M6OkCYh2a/view?usp=sharing' },
    { titleKey: 'exams.finals.term2', link: 'https://drive.google.com/file/d/1PoZCXZOtv2NNF6lBym5TQ-TDHFA0jhhW/view?usp=drive_link' },
  ];

  const renderLinks = (items: { titleKey: string; link: string }[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {items.map((item, index) => (
        <a 
          key={index} 
          href={item.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 dark:bg-slate-800 dark:hover:shadow-lg dark:hover:shadow-emerald-700/20"
        >
          <div className="p-6 flex items-center space-x-4 rtl:space-x-reverse">
            <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-full group-hover:bg-emerald-200 transition-colors duration-300 dark:bg-slate-700 dark:group-hover:bg-slate-600">
              <BookIcon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300 dark:text-slate-100 dark:group-hover:text-emerald-400">
                {t(item.titleKey)}
              </h4>
              <p className="mt-1 text-sm text-emerald-600 font-semibold flex items-center dark:text-emerald-400">
                {t('successCriteria.open')}
                <ExternalLinkIcon className="w-4 h-4 ml-2 rtl:mr-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );

  return (
    <div>
      <SectionTitle
        title={t('exams.title')}
        subtitle={t('exams.subtitle')}
      />
      <div className="max-w-5xl mx-auto space-y-16">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-8 text-center">{t('exams.reviews.title')}</h3>
          {renderLinks(reviews)}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-8 text-center">{t('exams.finals.title')}</h3>
          {renderLinks(finals)}
        </div>
      </div>
    </div>
  );
};

export default ExamsPage;