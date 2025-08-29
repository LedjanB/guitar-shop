import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const GET_BRANDS = gql`
  query {
    findAllBrands {
      id
      name
      image
    }
  }
`;

export default function BrandsPage() {
  const { loading, error, data } = useQuery(GET_BRANDS);
  const navigate = useNavigate();
  const { t } = useLanguage();

  if (loading) return <div className="container"><p className="muted">Loading…</p></div>;
  if (error) return <div className="container"><p className="muted">Error loading brands</p></div>;

  return (
    <div className="container">
      {/* Hero */}
      <section className="hero">
        <div>
          <h1>
            {t.heroTitleA} <span className="accent">{t.heroTitleB}</span> {t.heroTitleC}
          </h1>
          <p className="muted">{t.heroSubtitle}</p>
        </div>
        <div className="hero-visual" aria-hidden />
      </section>

      {/* Brands grid */}
      <h2 className="section-title">{t.featuring}</h2>
      <p className="section-subtitle">{t.pickBrand}</p>

      <div className="brands-grid">
        {data.findAllBrands.map((b) => (
          <button
            key={b.id}
            className="brand-card"
            onClick={() => navigate(`/brand/${b.id}`)}
            aria-label={`Open ${b.name}`}
          >
            {b.image
              ? <img src={b.image} alt={`${b.name} logo`} loading="lazy" />
              : <span className="sr-only">{b.name}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}