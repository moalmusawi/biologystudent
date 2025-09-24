import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAppContext } from '../App';
import { BookIcon, ExternalLinkIcon } from '../components/IconComponents';

const TeacherGuidePage: React.FC = () => {
  const { t } = useAppContext();
  const guideLink = "https://drive.google.com/file/d/1SNc9z2g5Xdp_72YU3xbX20yWwze7gV-O/view?usp=drive_link";

  return (
    <div>
      <SectionTitle
        title={t('teacherGuide.title')}
        subtitle={t('teacherGuide.subtitle')}
      />
      <div className="max-w-3xl mx-auto">
         <a
          href={guideLink}
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
                {t('teacherGuide.guideTitle')}
              </h4>
              <p className="mt-1 text-sm text-emerald-600 font-semibold flex items-center">
                {t('teacherGuide.openGuide')}
                <ExternalLinkIcon className="w-4 h-4 ml-2 rtl:mr-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default TeacherGuidePage;