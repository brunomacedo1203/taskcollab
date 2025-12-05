import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { defaultLocale, supportedLocales } from './config';

import ptCommon from './messages/pt/common.json';
import ptHeader from './messages/pt/header.json';
import ptAuth from './messages/pt/auth.json';
import ptTasks from './messages/pt/tasks.json';
import ptNotifications from './messages/pt/notifications.json';
import ptHome from './messages/pt/home.json';

import enCommon from './messages/en/common.json';
import enHeader from './messages/en/header.json';
import enAuth from './messages/en/auth.json';
import enTasks from './messages/en/tasks.json';
import enNotifications from './messages/en/notifications.json';
import enHome from './messages/en/home.json';

const resources = {
  pt: {
    common: ptCommon,
    header: ptHeader,
    auth: ptAuth,
    tasks: ptTasks,
    notifications: ptNotifications,
    home: ptHome,
  },
  en: {
    common: enCommon,
    header: enHeader,
    auth: enAuth,
    tasks: enTasks,
    notifications: enNotifications,
    home: enHome,
  },
} as const;

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: defaultLocale,
    fallbackLng: defaultLocale,
    supportedLngs: supportedLocales,
    ns: ['common', 'header', 'auth', 'tasks', 'notifications', 'home'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    debug: import.meta.env.DEV,
    returnNull: false,
  });

export default i18n;
