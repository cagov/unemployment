import HttpApi from "i18next-http-backend/cjs";
import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Usage note: only the "br", "strong", "i", and "p" tags can be used in translation.json
// Other tags must be converted (delete the key from translation.json, ensure debug:true here,
// load the page and copy the console output with converted tags back into translation.json.)

const isDev = process.env.NODE_ENV === "development";

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(HttpApi)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    debug: isDev,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    load: "languageOnly", // ignore the -US in en-US
  });

if (isDev) {
  const { applyClientHMR } = require("i18next-hmr");
  applyClientHMR(i18n);
}

export default i18n;
