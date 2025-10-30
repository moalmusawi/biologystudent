import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full py-4 bg-gray-900 dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-300 dark:text-slate-400">
        <p>جميع الحقوق محفوظة © {currentYear} محمد بن أحمد الموسوي</p>
      </div>
    </footer>
  );
};

export default Footer;
