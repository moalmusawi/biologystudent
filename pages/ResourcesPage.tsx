import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAppContext } from '../App';

const SummariesPage: React.FC = () => {
  const { t } = useAppContext();
  return (
    <div className="text-center">
      <SectionTitle
        title={t('summaries.title')}
        subtitle={t('summaries.subtitle')}
      />
      <div className="bg-white p-12 rounded-lg shadow-md max-w-3xl mx-auto">
        <p className="text-xl text-gray-500">
          {t('placeholder.content')}
        </p>
      </div>
    </div>
  );
};

export default SummariesPage;