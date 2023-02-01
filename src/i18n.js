import i18n from 'i18next';
import * as en from './locales/en.json';
import * as de from './locales/de.json';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from "i18next-browser-languagedetector";

export const resources = {
  en: {
    translation: en,
  },
  de: {
    translation: de
  },
};

i18n.use(LanguageDetector).use(initReactI18next).init({
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
  fallbackLng: 'de',
  resources,
});

export default i18n;