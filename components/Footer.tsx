import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} جميع الحقوق محفوظة لـ محمد بن أحمد الموسوي.
        </p>
      </div>
    </footer>
  );
};

export default Footer;