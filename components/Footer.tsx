
import React from 'react';
import { useAppContext } from '../App';
import { BookIcon, EmailIcon, PhoneIcon, InstagramIcon } from './IconComponents';

const Footer: React.FC = () => {
  const { t } = useAppContext();
  return (
    <footer className="bg-slate-800 text-slate-300 dark:bg-black dark:text-slate-400">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-start">
                {/* About Section */}
                <div className="md:col-span-1">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                        <BookIcon className="h-8 w-8 text-emerald-400" />
                        <span className="text-xl font-bold text-white">{t('appName.pt1')} {t('appName.pt2')}</span>
                    </div>
                    <p className="text-sm">{t('footer.about.text')}</p>
                </div>
                {/* Contact Info */}
                <div>
                    <h4 className="font-bold text-lg text-white mb-4">{t('footer.contact.title')}</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center justify-center md:justify-start gap-3">
                            <EmailIcon className="h-5 w-5 text-emerald-400" />
                            <a href={`mailto:${t('footer.contact.email')}`} className="hover:text-emerald-400 transition-colors">{t('footer.contact.email')}</a>
                        </li>
                        <li className="flex items-center justify-center md:justify-start gap-3">
                            <PhoneIcon className="h-5 w-5 text-emerald-400" />
                            <a href={`tel:${t('footer.contact.phone').replace(/\s/g, '')}`} className="hover:text-emerald-400 transition-colors" dir="ltr">{t('footer.contact.phone')}</a>
                        </li>
                    </ul>
                </div>
                {/* Social Media */}
                <div>
                    <h4 className="font-bold text-lg text-white mb-4">{t('footer.social.title')}</h4>
                    <a href="https://www.instagram.com/m.0o0j" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="inline-block text-slate-300 hover:text-emerald-400 transition-colors">
                        <InstagramIcon className="h-8 w-8" />
                    </a>
                </div>
            </div>
        </div>
        <div className="bg-slate-900 dark:bg-gray-900/50">
            <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-sm text-slate-400 dark:text-slate-500">
                    {t('footer.copyright')}
                </p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
