import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { useAppContext } from '../App';
import { UsersIcon } from '../components/IconComponents';

const MyStudentsPage: React.FC = () => {
    const { t } = useAppContext();

    // Mock data for UI demonstration
    const mockStudents = [
        { name: 'علي عبدالله', lastQuiz: 'الوحدة الاولى: النقل', score: '5/5' },
        { name: 'فاطمة محمد', lastQuiz: 'الوحدة الثانية: التنفس', score: '3/5' },
        { name: 'سارة خالد', lastQuiz: 'الوحدة الاولى: النقل', score: '4/5' },
    ];

    return (
        <div>
            <SectionTitle title={t('myStudents.title')} subtitle={t('myStudents.subtitle')} />
            
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg border-l-4 border-amber-500">
                    <h4 className="font-bold text-amber-800 dark:text-amber-200">{t('myStudents.backendNote.title')}</h4>
                    <p className="mt-2 text-amber-700 dark:text-amber-300 text-sm">{t('myStudents.backendNote.body')}</p>
                </div>

                <div className="bg-white p-8 rounded-lg shadow-md dark:bg-slate-800">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-slate-100 mb-6 flex items-center gap-3">
                        <UsersIcon className="w-8 h-8 text-emerald-500" />
                        <span>{t('myStudents.studentList')}</span>
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-start">
                            <thead className="border-b-2 dark:border-slate-700">
                                <tr>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">{t('myStudents.tableName')}</th>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">{t('myStudents.tableLastQuiz')}</th>
                                    <th className="p-3 text-sm font-semibold tracking-wide text-left">{t('myStudents.tableScore')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-slate-700/50">
                                {mockStudents.map((student, index) => (
                                    <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                                        <td className="p-3 font-semibold text-gray-800 dark:text-slate-200">{student.name}</td>
                                        <td className="p-3 text-gray-600 dark:text-slate-400">{student.lastQuiz}</td>
                                        <td className="p-3 font-semibold text-gray-800 dark:text-slate-200">{student.score}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyStudentsPage;
