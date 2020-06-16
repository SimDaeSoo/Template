import i18n from 'i18next'
import {
  initReactI18next
} from 'react-i18next';
import EN from './en/index.json'
import KO from './ko/index.json'
const resource = {
  en: { translation: EN },
  ko: { translation: KO }
};
i18n.use(initReactI18next).init({
  resources: resource,
  lng: 'en',
  fallbackLng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
});
export default i18n;
