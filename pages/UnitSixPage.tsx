
import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { useAppContext } from '../App';
import { useFavorites } from '../components/FavoritesContext';
import { courseData } from '../courseData';
import ResourceLink from '../components/ResourceLink';

const UnitSixPage: React.FC = () => {
  const { t } = useAppContext();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  const unit = courseData.find(u => u.key === 'unit6');

  if (!unit) {
    return <div>Unit not found</div>;
  }

  return (
    <div>
      <SectionTitle
        title={t(unit.titleKey)}
        subtitle={t(unit.subtitleKey)}
      />

      <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md dark:bg-slate-800">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-6">{t(unit.contentTitleKey)}</h3>
        <div className="space-y-4">
          {unit.lessons.map((lesson, index) => (
             <ResourceLink
              key={index}
              lesson={lesson}
              isFavorite={isFavorite(lesson.link)}
              onToggleFavorite={() => {
                if (isFavorite(lesson.link)) {
                  removeFavorite(lesson.link);
                } else {
                  addFavorite({ ...lesson, unitTitleKey: unit.titleKey });
                }
              }}
            />
          ))}
        </div>
      </div>

      <div className="mt-12 w-full max-w-4xl mx-auto">
        <div className="bg-emerald-50 p-8 rounded-lg shadow-inner border border-emerald-200 text-center dark:bg-emerald-900/40 dark:border-emerald-800">
            <h4 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200 mb-4">{t('unit.activities.title')}</h4>
            <p className="text-emerald-700 dark:text-emerald-300 mb-6 max-w-2xl mx-auto">{t('unit.activities.subtitle')}</p>
            <Link
                to="/unit-6/quiz"
                className="inline-block bg-emerald-600 text-white font-bold py-3 px-10 rounded-full hover:bg-emerald-700 transition duration-300 transform hover:scale-105 shadow-lg"
            >
                {t('unit.activities.cta_active')}
            </Link>
        </div>
      </div>
    </div>
  );
};

export default UnitSixPage;
