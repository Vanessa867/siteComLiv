import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptBR from './locales/pt.json'; // Arquivo com as traduções em português
import enUS from './locales/en.json'; // Arquivo com as traduções em inglês

i18n
  .use(initReactI18next) // Passa o i18n para o react-i18next
  .init({
    resources: {
      pt: { translation: ptBR },
      en: { translation: enUS },
    },
    lng: 'pt', // Idioma inicial
    fallbackLng: 'pt', // Idioma de fallback
    interpolation: {
      escapeValue: false, // React já escapa por padrão
    },
  });

export default i18n;
