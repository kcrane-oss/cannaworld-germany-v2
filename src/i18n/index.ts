import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import de from "./locales/de.json";
import en from "./locales/en.json";
import th from "./locales/th.json";

const SUPPORTED = ["de", "en", "th"] as const;
export type AppLanguage = (typeof SUPPORTED)[number];

function initialLanguage(): AppLanguage {
  try {
    const saved = localStorage.getItem("app-language");
    if (saved === "de" || saved === "en" || saved === "th") return saved;
    const nav = navigator.language?.toLowerCase() ?? "";
    if (nav.startsWith("th")) return "th";
    if (nav.startsWith("en")) return "en";
  } catch {
    /* localStorage unavailable */
  }
  return "de";
}

i18n.use(initReactI18next).init({
  resources: {
    de: { translation: de },
    en: { translation: en },
    th: { translation: th },
  },
  lng: initialLanguage(),
  fallbackLng: "de",
  supportedLngs: SUPPORTED,
  interpolation: { escapeValue: false },
});

export function setAppLanguage(lang: AppLanguage) {
  try {
    localStorage.setItem("app-language", lang);
  } catch {
    /* ignore */
  }
  void i18n.changeLanguage(lang);
}

export default i18n;
