import { createContext, useState, useContext } from "react";

const translations = {
  en: {
    brands: "Guitar Brands",
    search: "Search",
    allTypes: "All Types",
    electric: "Electric",
    acoustic: "Acoustic",
    models: "Models",
    specs: "Specs",
    musicians: "Musicians",
    showMore: "Show more",
    heroTitleA: "Browse top quality",
    heroTitleB: "Guitars",
    heroTitleC: "online",
    heroSubtitle: "Explore our curated collection of branded guitars.",
    featuring: "Featuring the Best Brands",
    pickBrand: "Select your preferred brand and explore models.",
  },
  sq: {
    brands: "Markat e Kitarave",
    search: "Kërko",
    allTypes: "Të gjitha Llojet",
    electric: "Elektrike",
    acoustic: "Akustike",
    models: "Modelet",
    specs: "Specifikimet",
    musicians: "Muzikantët",
    showMore: "Shfaq më shumë",
    heroTitleA:"Shfleto kitarat me cilësi të lartë",
heroTitleB:"Kitarat",
heroTitleC:"online",
heroSubtitle:"Eksploro koleksionin tonë të markave të njohura.",
featuring:"Markat më të mira",
pickBrand:"Zgjidh markën e preferuar dhe shiko modelet.",
  },
  mk: {
    brands: "Брендови на гитари",
    search: "Пребарај",
    allTypes: "Сите типови",
    electric: "Електрична",
    acoustic: "Акустична",
    models: "Модели",
    specs: "Спецификации",
    musicians: "Музичари",
    showMore: "Покажи повеќе",
    heroTitleA:"Прелистај гитари со врвен квалитет",
heroTitleB:"Гитари",
heroTitleC:"онлајн",
heroSubtitle:"Истражи ја нашата колекција од познати брендови.",
featuring:"Најдобрите брендови",
pickBrand:"Избери бренд и разгледај модели.",
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  const t = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);