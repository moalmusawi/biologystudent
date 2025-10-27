
import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAppContext } from '../App';
import ExternalResourceLink from '../components/ExternalResourceLink';

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
         <ExternalResourceLink
            link={guideLink}
            titleKey="teacherGuide.guideTitle"
            openTextKey="teacherGuide.openGuide"
          />
      </div>
    </div>
  );
};

export default TeacherGuidePage;
