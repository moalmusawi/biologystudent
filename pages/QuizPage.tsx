
import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { useAppContext } from '../App';
import { BookIcon, ExternalLinkIcon, HeartIcon, HeartIconFilled } from '../components/IconComponents';
import { useFavorites } from '../components/FavoritesContext';
import { courseData } from '../courseData';

const UnitFourPage: React.FC = () => {
  const { t } = useAppContext();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  const unit = courseData.find(u => u.key === 'unit4');

  if (!unit) {
    return <div>Unit not found</div>;
  }
  
  const handleFavoriteToggle = (lesson: { titleKey: string; link: string; }) => {
    if (isFavorite(lesson.link)) {
      removeFavorite(lesson.link);
    } else {
      addFavorite({ ...lesson, unitTitleKey: unit.titleKey });
    }
  };


  return (
    <div>
      <SectionTitle
        title={t(unit.titleKey)}
        subtitle={t(unit.subtitleKey)}
      />

      <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md dark:bg-slate-800">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-6">{t(unit.contentTitleKey)}</h3>
        <div className="space-y-4">
          {unit.lessons.map((lesson, index) => {
            const favorited = isFavorite(lesson.link);
            return (
              <div key={index} className="group flex items-center bg-slate-50 rounded-lg border border-slate-200 hover:shadow-lg hover:border-emerald-300 transition-all duration-300 transform hover:-translate-y-1 dark:bg-slate-700/50 dark:border-slate-700 dark:hover:border-emerald-700">
                <a 
                  href={lesson.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex-grow"
                >
                  <div className="p-5 flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-full group-hover:bg-emerald-200 transition-colors duration-300 dark:bg-slate-700 dark:group-hover:bg-slate-600">
                      <BookIcon className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-md font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300 dark:text-slate-100 dark:group-hover:text-emerald-400">
                        {t(lesson.titleKey)}
                      </h4>
                      <p className="mt-1 text-sm text-emerald-600 font-semibold flex items-center dark:text-emerald-400">
                        {t('successCriteria.open')}
                        <ExternalLinkIcon className="w-4 h-4 ml-2 rtl:mr-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                      </p>
                    </div>
                  </div>
                </a>
                <button 
                  onClick={() => handleFavoriteToggle(lesson)}
                  className="p-4 m-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200"
                  aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {favorited ? (
                    <HeartIconFilled className="w-6 h-6 text-red-500" />
                  ) : (
                    <HeartIcon className="w-6 h-6 text-gray-400 group-hover:text-red-400" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-12 w-full max-w-4xl mx-auto">
        <div className="bg-emerald-50 p-8 rounded-lg shadow-inner border border-emerald-200 text-center dark:bg-emerald-900/40 dark:border-emerald-800">
            <h4 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200 mb-4">{t('unit.activities.title')}</h4>
            <p className="text-emerald-700 dark:text-emerald-300 mb-6 max-w-2xl mx-auto">{t('unit.activities.subtitle')}</p>
            <Link
                to="/unit-4/quiz"
                className="inline-block bg-emerald-600 text-white font-bold py-3 px-10 rounded-full hover:bg-emerald-700 transition duration-300 transform hover:scale-105 shadow-lg"
            >
                {t('unit.activities.cta_active')}
            </Link>
        </div>
      </div>
    </div>
  );
};

export default UnitFourPage;
