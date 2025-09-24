import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAppContext } from '../App';
import { BookIcon, ExternalLinkIcon } from '../components/IconComponents';

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
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">{t('textbooks.grade10')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {books.map((book, index) => (
            <a 
              key={index} 
              href={book.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6 flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-shrink-0 bg-emerald-100 p-3 rounded-full group-hover:bg-emerald-200 transition-colors duration-300">
                  <BookIcon className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                    {t(book.titleKey)}
                  </h4>
                  <p className="mt-1 text-sm text-emerald-600 font-semibold flex items-center">
                    {t('textbooks.openBook')}
                    <ExternalLinkIcon className="w-4 h-4 ml-2 rtl:mr-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextbooksPage;