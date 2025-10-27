
import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAppContext } from '../App';
import { useFavorites, FavoriteItem } from '../components/FavoritesContext';
import { BookmarkIcon } from '../components/IconComponents';
import ResourceLink from '../components/ResourceLink';

const ReferencePage: React.FC = () => {
  const { t } = useAppContext();
  const { favorites, removeFavorite, isFavorite } = useFavorites();

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
                   <ResourceLink
                    key={item.link}
                    lesson={item}
                    isFavorite={true}
                    onToggleFavorite={() => removeFavorite(item.link)}
                  />
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
