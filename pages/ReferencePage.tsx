
import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAppContext } from '../App';
import { useFavorites, FavoriteItem } from '../components/FavoritesContext';
import { BookIcon, ExternalLinkIcon, HeartIconFilled, BookmarkIcon } from '../components/IconComponents';

const ReferencePage: React.FC = () => {
  const { t } = useAppContext();
  const { favorites, removeFavorite } = useFavorites();

  const groupedFavorites = favorites.reduce((acc, item) => {
    const unitTitle = t(item.unitTitleKey);
    if (!acc[unitTitle]) {
      acc[unitTitle] = [];
    }
    acc[unitTitle].push(item);
    return acc;
  }, {} as Record<string, FavoriteItem[]>);

  return (
    <div>
      <SectionTitle
        title={t('references.title')}
        subtitle={t('references.subtitle')}
      />

      {favorites.length === 0 ? (
        <div className="text-center bg-white p-12 rounded-lg shadow-md max-w-3xl mx-auto dark:bg-slate-800">
            <BookmarkIcon className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <p className="text-xl text-gray-500 dark:text-gray-400">
            {t('references.empty')}
            </p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-12">
          {Object.entries(groupedFavorites).map(([unitTitle, items]) => (
            <div key={unitTitle} className="bg-white p-8 rounded-lg shadow-md dark:bg-slate-800">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-6 border-b-2 border-emerald-200 dark:border-emerald-700/50 pb-3">{unitTitle}</h3>
              <div className="space-y-4">
                {items.map((item) => (
                   <div key={item.link} className="group flex items-center bg-slate-50 rounded-lg border border-slate-200 hover:shadow-lg hover:border-emerald-300 transition-all duration-300 dark:bg-slate-700/50 dark:border-slate-700 dark:hover:border-emerald-700">
                    <a 
                      href={item.link} 
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
                            {t(item.titleKey)}
                          </h4>
                          <p className="mt-1 text-sm text-emerald-600 font-semibold flex items-center dark:text-emerald-400">
                            {t('successCriteria.open')}
                            <ExternalLinkIcon className="w-4 h-4 ml-2 rtl:mr-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                          </p>
                        </div>
                      </div>
                    </a>
                    <button 
                      onClick={() => removeFavorite(item.link)}
                      className="p-4 m-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200"
                      aria-label={'Remove from favorites'}
                    >
                        <HeartIconFilled className="w-6 h-6 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReferencePage;
