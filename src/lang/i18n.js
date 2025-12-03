import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from './en/translation.json';
import fi from './fi/translation.json';


i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
    resources: {
        en: { translation: en},
        fi: { translation: fi}
    },
    fallbackLng: 'en',
    debug: false,
    detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage']
    }
});

export { default } from "i18next";