
import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAppContext } from '../App';
import ExternalResourceLink from '../components/ExternalResourceLink';

const SuccessCriteriaPage: React.FC = () => {
  const { t } = useAppContext();
  
  const criteria = [
    { titleKey: 'successCriteria.chapter1', link: 'https://drive.google.com/file/d/1dyP8GvDjdbFqZrdx9wp67P7p19RqDmgm/view?usp=drive_link' },
    { titleKey: 'successCriteria.chapter2', link: 'https://drive.google.com/file/d/19DY0kpsSLsnGnH1EIV_RRdzmrqpTLBkZ/view?usp=drive_link' },
  ];

  return (
    <div>
      <SectionTitle
        title={t('successCriteria.title')}
        subtitle={t('successCriteria.subtitle')}
      />
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 gap-8">
          {criteria.map((item, index) => (
            <ExternalResourceLink
              key={index}
              link={item.link}
              titleKey={item.titleKey}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessCriteriaPage;
