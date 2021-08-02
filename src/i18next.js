import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const fallbackLng = ["en"];
const availableLanguages = ["en", "vi"];

const options = {
    // order and from where user language should be detected
    order: ['querystring', 'navigator', 'path', 'subdomain'],

    // keys or params to lookup language from
    lookupQuerystring: 'lang',
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,
}

i18n
    // load translation using http -> see /public/locales
    .use(Backend)
    // detect user language
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    .init({
        fallbackLng,
        debug: true,
        whitelist: availableLanguages,
        detection: options,

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    });

export default i18n;