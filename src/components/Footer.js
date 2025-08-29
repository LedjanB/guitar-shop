import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { lang, setLang } = useLanguage();

  return (
    <footer style={{ marginTop: 20 }}>
      <select value={lang} onChange={e => setLang(e.target.value)}>
        <option value="en">English</option>
        <option value="sq">Shqip</option>
        <option value="mk">Македонски</option>
      </select>
    </footer>
  );
}