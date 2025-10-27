
import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAppContext } from '../App';
import ExternalResourceLink from '../components/ExternalResourceLink';

const TextbooksPage: React.FC = () => {
  const { t } = useAppContext();
  
  const books = [
    { titleKey: 'textbooks.sb1', link: 'https://ict.moe.gov.om/book/PDF/10/cls10_Bio_SB_P1/index.html' },
    { titleKey: 'textbooks.ab1', link: 'https://ict.moe.gov.om/book/PDF/10/cls10_Bio_AB_P1/index.html' },
    { titleKey: 'textbooks.sb2', link: 'https://ict.moe.gov.om/book/PDF/10/cls10_Bio_Talib_P2/index.html' },
    { titleKey: 'textbooks.ab2', link: 'https://ict.moe.gov.om/book/PDF/10/cls10_Bio_AB_P2/index.html' },
  ];

  return (
    <div>
      <SectionTitle
        title={t('textbooks.title')}
        subtitle={t('textbooks.subtitle')}
      />
      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-8 text-center">{t('textbooks.grade10')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {books.map((book, index) => (
            <ExternalResourceLink
              key={index}
              link={book.link}
              titleKey={book.titleKey}
              openTextKey="textbooks.openBook"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextbooksPage;
