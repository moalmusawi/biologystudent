
import React from 'react';
import { BookIcon, ExternalLinkIcon } from './IconComponents';
import { useAppContext } from '../App';

interface ExternalResourceLinkProps {
  titleKey: string;
  link: string;
  openTextKey?: string;
}

const ExternalResourceLink: React.FC<ExternalResourceLinkProps> = ({ titleKey, link, openTextKey = 'successCriteria.open' }) => {
  const { t } = useAppContext();
  return (
    <a
      href={link}
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
            {t(titleKey)}
          </h4>
          <p className="mt-1 text-sm text-emerald-600 font-semibold flex items-center dark:text-emerald-400">
            {t(openTextKey)}
            <ExternalLinkIcon className="w-4 h-4 ml-2 rtl:mr-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
          </p>
        </div>
      </div>
    </a>
  );
};

export default ExternalResourceLink;
