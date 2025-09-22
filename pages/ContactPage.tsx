import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { InstagramIcon, PhoneIcon, EmailIcon } from '../components/IconComponents';

const ContactPage: React.FC = () => {
  return (
    <div>
      <SectionTitle
        title="اتصل بنا"
        subtitle="يسعدنا تواصلكم معنا! سواء كان لديكم سؤال، اقتراح، أو رغبة في الانضمام."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">أرسل لنا رسالة</h3>
          <form action="mailto:malmusawi475@gmail.com" method="POST" encType="text/plain">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">الاسم</label>
              <input type="text" id="name" name="الاسم" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="اسمك الكامل" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">البريد الإلكتروني</label>
              <input type="email" id="email" name="البريد_الإلكتروني" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="example@email.com" required />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2">الرسالة</label>
              <textarea id="message" name="الرسالة" rows={5} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="اكتب رسالتك هنا..." required></textarea>
            </div>
            <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-md hover:bg-emerald-700 transition duration-300 transform hover:scale-105">
              إرسال الرسالة
            </button>
          </form>
        </div>
        
        {/* Contact Info & Social Media */}
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">معلومات التواصل</h3>
            
            <div className="space-y-6 text-gray-700">
                <div className="flex items-center gap-4">
                    <EmailIcon className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                    <div>
                        <p className="font-bold">البريد الإلكتروني</p>
                        <a href="mailto:malmusawi475@gmail.com" className="text-gray-600 hover:text-emerald-600 transition-colors">
                            malmusawi475@gmail.com
                        </a>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <PhoneIcon className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                    <div>
                        <p className="font-bold">رقم الهاتف</p>
                        <a href="tel:+96879293515" className="text-gray-600 hover:text-emerald-600 transition-colors" dir="ltr">
                           +968 7929 3515
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 my-8"></div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4">تابعنا</h3>
            <p className="text-gray-600 mb-6">كن على اطلاع دائم بآخر أخبارنا وفعالياتنا.</p>
            <div className="flex space-x-reverse space-x-6">
                <a href="https://www.instagram.com/m.0o0j" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-emerald-600 transition-colors duration-300">
                    <InstagramIcon className="h-8 w-8" />
                </a>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <h3 className="text-2xl font-bold text-gray-800 mb-4">مشرف المشروع</h3>
            <div className="space-y-3">
                <p className="font-bold text-lg text-gray-800">أ.غالب النخيلي</p>
                <a href="https://www.instagram.com/gallb98" aria-label="Instagram Supervisor" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 transition-colors duration-300">
                    <InstagramIcon className="h-7 w-7" />
                    <span className="font-semibold">gallb98</span>
                </a>
            </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;