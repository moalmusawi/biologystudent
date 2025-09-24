import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { InstagramIcon, PhoneIcon, EmailIcon } from '../components/IconComponents';
import { useAppContext } from '../App';

const ContactPage: React.FC = () => {
  const { t, language } = useAppContext();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    const subject = `Message from "No Life Without Biology" from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    window.location.href = `mailto:malmusawi475@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div>
      <SectionTitle
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('contact.form.title')}</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">{t('contact.form.name')}</label>
              <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-800" placeholder={t('contact.form.name.placeholder')} required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">{t('contact.form.email')}</label>
              <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-800" placeholder={t('contact.form.email.placeholder')} required />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2">{t('contact.form.message')}</label>
              <textarea id="message" name="message" rows={5} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-gray-800" placeholder={t('contact.form.message.placeholder')} required></textarea>
            </div>
            <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 px-4 rounded-md hover:bg-emerald-700 transition duration-300 transform hover:scale-105">
              {t('contact.form.submit')}
            </button>
          </form>
        </div>
        
        {/* Contact Info & Social Media */}
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">{t('contact.info.title')}</h3>
            
            <div className="space-y-6 text-gray-700">
                <div className="flex items-center gap-4">
                    <EmailIcon className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                    <div>
                        <p className="font-bold">{t('contact.info.email')}</p>
                        <a href="mailto:malmusawi475@gmail.com" className="text-gray-600 hover:text-emerald-600 transition-colors">
                            malmusawi475@gmail.com
                        </a>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <PhoneIcon className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                    <div>
                        <p className="font-bold">{t('contact.info.phone')}</p>
                        <a href="tel:+96879293515" className="text-gray-600 hover:text-emerald-600 transition-colors" dir="ltr">
                           +968 7929 3515
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 my-8"></div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('contact.social.title')}</h3>
            <p className="text-gray-600 mb-6">{t('contact.social.subtitle')}</p>
            <div className={`flex ${language === 'ar' ? 'space-x-reverse space-x-6' : 'space-x-6'}`}>
                <a href="https://www.instagram.com/m.0o0j" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-emerald-600 transition-colors duration-300">
                    <InstagramIcon className="h-8 w-8" />
                </a>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <h3 className="text-2xl font-bold text-gray-800 mb-4">{t('contact.supervisor.title')}</h3>
            <div className="space-y-3">
                <p className="font-bold text-lg text-gray-800">{t('contact.supervisor.name')}</p>
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