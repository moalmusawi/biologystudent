
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-slate-100">{title}</h2>
      <div className="mt-3 h-1 w-20 bg-emerald-500 mx-auto rounded"></div>
      {subtitle && <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto dark:text-slate-400">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
