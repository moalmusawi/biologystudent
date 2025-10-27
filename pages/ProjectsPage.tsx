
import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAppContext } from '../App';
import ExternalResourceLink from '../components/ExternalResourceLink';

const ExamsPage: React.FC = () => {
  const { t } = useAppContext();
  
  const reviews = [
    { titleKey: 'exams.reviews.unit1', link: 'https://drive.google.com/file/d/1qL0Q7L8uQetJ8nGWHREmlx90G3XKmZ73/view?usp=drive_link' },
    { titleKey: 'exams.reviews.unit2', link: 'https://drive.google.com/file/d/1gCNRkyEq8X7ek2dX-CiEDLGd04wkvshz/view?usp=drive_link' },
    { titleKey: 'exams.reviews.unit3', link: 'https://drive.google.com/file/d/1Wnxa0K6ETt6evKGhvK_yew-tqMcXG5uv/view?usp=drive_link' },
    { titleKey: 'exams.reviews.unit4', link: 'https://drive.google.com/file/d/1pA0DDbyurnTt5yuFrLtJwDEuumVdWNKd/view?usp=drive_link' },
    { titleKey: 'exams.reviews.unit5and6', link: 'https://drive.google.com/file/d/1Q2y8QQj17xdib23AR9agMvJgINNZ7vI5/view?usp=drive_link' },
    { titleKey: 'exams.reviews.unit7', link: 'https://drive.google.com/file/d/1-PomSsPsJND5gwvno949SBEuIhW_w38l/view?usp=drive_link' },
  ];

  const finals = [
    { titleKey: 'exams.finals.term1', link: 'https://drive.google.com/file/d/1SIc2Cb0qfHSY0FaQhJDGM85M6OkCYh2a/view?usp=sharing' },
    { titleKey: 'exams.finals.term2', link: 'https://drive.google.com/file/d/1PoZCXZOtv2NNF6lBym5TQ-TDHFA0jhhW/view?usp=drive_link' },
  ];

  const renderLinks = (items: { titleKey: string; link: string }[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {items.map((item, index) => (
        <ExternalResourceLink
          key={index}
          link={item.link}
          titleKey={item.titleKey}
        />
      ))}
    </div>
  );

  return (
    <div>
      <SectionTitle
        title={t('exams.title')}
        subtitle={t('exams.subtitle')}
      />
      <div className="max-w-5xl mx-auto space-y-16">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-8 text-center">{t('exams.reviews.title')}</h3>
          {renderLinks(reviews)}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-8 text-center">{t('exams.finals.title')}</h3>
          {renderLinks(finals)}
        </div>
      </div>
    </div>
  );
};

export default ExamsPage;
