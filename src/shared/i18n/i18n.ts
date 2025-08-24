import en from '@/assets/locales/en/common.json';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import pl from '@/assets/locales/pl/common.json';

export const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
  resources: {
    en: { common: en },
    pl: { common: pl }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  ns: ['common'],
  defaultNS: 'common'
});

export default i18n;


