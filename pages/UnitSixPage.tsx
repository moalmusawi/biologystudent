import React from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { useAppContext } from '../App';
import { BookIcon, ExternalLinkIcon } from '../components/IconComponents';

const UnitSixPage: React.FC = () => {
  const { t } = useAppContext();

  const lessons = [
    { titleKey: 'unit6.lesson1.title', link: 'https://drive.google.com/file/d/1L00faWdbi19WZAlYcbi3SXxnyKeNQvGO/view?usp=drive_link' },
    { titleKey: 'unit6.lesson2.title', link: 'https://drive.google.com/file/d/173piIGAHK-7Ud43ZhxLBtlX9LgO2epiE/view?usp=drive_link' },
  ];

  return (
    <div>
      <SectionTitle
        title={t('unit6.title')}
        subtitle={t('unit6.subtitle')}
      />

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('unit6.content.title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lessons.map((lesson, index) => (
            <a 
              key={index} 
              href={lesson.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group block bg-slate-50 rounded-lg border border-slate-200 hover:shadow-lg hover:border-emerald-300 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-5 flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-full group-hover:bg-emerald-200 transition-colors duration-300">
                  <BookIcon className="w-7 h-7 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-md font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                    {t(lesson.titleKey)}
                  </h4>
                  <p className="mt-1 text-sm text-emerald-600 font-semibold flex items-center">
                    {t('successCriteria.open')}
                    <ExternalLinkIcon className="w-4 h-4 ml-2 rtl:mr-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-12 max-w-4xl mx-auto">
        <div className="bg-emerald-50 p-8 rounded-lg shadow-inner border border-emerald-200 text-center">
            <h4 className="text-2xl font-bold text-emerald-800 mb-4">{t('unit.activities.title')}</h4>
            <p className="text-emerald-700 mb-6 max-w-2xl mx-auto">{t('unit.activities.subtitle')}</p>
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