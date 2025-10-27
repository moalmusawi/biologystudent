
import React from 'react';
import { BookIcon, ExternalLinkIcon, HeartIcon, HeartIconFilled } from './IconComponents';
import { useAppContext } from '../App';

interface ResourceLinkProps {
  lesson: { titleKey: string; link: string; };
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const ResourceLink: React.FC<ResourceLinkProps> = ({ lesson, isFavorite, onToggleFavorite }) => {
  const { t } = useAppContext();

  return (
    <div className="group flex items-center bg-slate-50 rounded-lg border border-slate-200 hover:shadow-lg hover:border-emerald-300 transition-all duration-300 transform hover:-translate-y-1 dark:bg-slate-700/50 dark:border-slate-700 dark:hover:border-emerald-700">
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
        onClick={onToggleFavorite}
        className="p-4 m-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? (
          <HeartIconFilled className="w-6 h-6 text-red-500" />
        ) : (
          <HeartIcon className="w-6 h-6 text-gray-400 group-hover:text-red-400" />
        )}
      </button>
    </div>
  );
};

export default ResourceLink;
