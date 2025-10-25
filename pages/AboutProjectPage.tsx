import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAppContext } from '../App';

const AboutProjectPage: React.FC = () => {
  const { t } = useAppContext();
  return (
    <div>
      <SectionTitle
        title={t('about.title')}
        subtitle={t('about.subtitle')}
      />
      <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto dark:bg-slate-800">
        <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line dark:text-slate-300">
            {t('about.content')}
        </p>
      </div>
    </div>
  );
};

export default AboutProjectPage;