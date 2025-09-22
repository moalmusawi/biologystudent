
import React from 'react';
import SectionTitle from '../components/SectionTitle';

const TeacherGuidePage: React.FC = () => {
  return (
    <div className="text-center">
      <SectionTitle
        title="كتاب المعلم ودليله"
        subtitle="أدلة شاملة وموارد مساعدة للمعلمين."
      />
      <div className="bg-white p-12 rounded-lg shadow-md max-w-3xl mx-auto">
        <p className="text-xl text-gray-500">
        ⌛ المحتوى قيد الإنشاء وسيتم إضافته قريبًا.
        </p>
      </div>
    </div>
  );
};

export default TeacherGuidePage;
