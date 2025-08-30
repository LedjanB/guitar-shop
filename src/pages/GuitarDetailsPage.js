import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const GET_GUITAR = gql`
  query GetGuitar($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      type
      description
      price
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;

export default function GuitarDetailsPage() {
  const { brandId, guitarId } = useParams();
  const { loading, error, data } = useQuery(GET_GUITAR, {
    variables: { brandId: parseInt(brandId, 10), modelId: guitarId }
  });
  const [tab, setTab] = useState("specs");
  const [visible, setVisible] = useState(2);
  const { t } = useLanguage();

  if (loading) return <div className="container"><p>Loading…</p></div>;
  if (error) return <div className="container"><p>Error: {error.message}</p></div>;

  const guitar = data?.findUniqueModel;
  if (!guitar) return <div className="container"><p>No guitar found.</p></div>;

  return (
    <div className="container">
      <section className="guitar-hero">
        <h1>{guitar.name}</h1>
        <p className="muted">{guitar.description}</p>
        <p><strong>{t.price}:</strong> ${guitar.price}</p>
      </section>

      {/* Tabs */}
      <div className="tabs">
        <button className={tab === "specs" ? "tab active" : "tab"} onClick={() => setTab("specs")}>
          {t.specs}
        </button>
        <button className={tab === "musicians" ? "tab active" : "tab"} onClick={() => setTab("musicians")}>
          {t.musicians}
        </button>
      </div>

      {tab === "specs" && (
        <ul className="specs-list">
          {Object.entries(guitar.specs || {}).map(([key, value]) => (
            <li key={key}><strong>{key}</strong>: {value}</li>
          ))}
        </ul>
      )}

      {tab === "musicians" && (
        <div className="musicians-grid">
          {guitar.musicians?.slice(0, visible).map((m, idx) => (
            <div key={idx} className="musician-card">
              <div className="musician-photo" style={{ background: "#fbe9e7" }}>
                {m.musicianImage && <img src={m.musicianImage} alt={m.name} />}
              </div>
              <p><strong>{m.name}</strong></p>
              {m.bands?.length > 0 && (
                <p className="muted">{t.bands}: {m.bands.join(", ")}</p>
              )}
            </div>
          ))}
          {visible < (guitar.musicians?.length || 0) && (
            <button className="btn" onClick={() => setVisible(visible + 2)}>
              {t.showMore}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
