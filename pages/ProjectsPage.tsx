
import React from 'react';
import SectionTitle from '../components/SectionTitle';

const ExamsPage: React.FC = () => {
  return (
    <div className="text-center">
      <SectionTitle
        title="اسئلة اختبارات"
        subtitle="نماذج اختبارات سابقة وأسئلة تدريبية لمساعدتك على الاستعداد."
      />
      <div className="bg-white p-12 rounded-lg shadow-md max-w-3xl mx-auto">
        <p className="text-xl text-gray-500">
        ⌛ المحتوى قيد الإنشاء وسيتم إضافته قريبًا.
        </p>
      </div>
    </div>
  );
};

export default ExamsPage;
