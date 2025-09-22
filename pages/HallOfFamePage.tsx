
import React from 'react';
import SectionTitle from '../components/SectionTitle';

const UnitThreePage: React.FC = () => {
  return (
    <div className="text-center">
      <SectionTitle
        title="الوحدة الثالثة"
        subtitle="استكشف محتوى وموارد الوحدة التعليمية الثالثة."
      />
      <div className="bg-white p-12 rounded-lg shadow-md max-w-3xl mx-auto">
        <p className="text-xl text-gray-500">
        ⌛ المحتوى قيد الإنشاء وسيتم إضافته قريبًا.
        </p>
      </div>
    </div>
  );
};

export default UnitThreePage;
