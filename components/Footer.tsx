import React from 'react';
import { useAppContext } from '../App';

const Footer: React.FC = () => {
  const { t } = useAppContext();
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-gray-400">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;