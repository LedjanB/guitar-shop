import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const GET_GUITAR = gql`
  query ($brandId: ID!, $modelId: ID!) {
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
    variables: { brandId, modelId: guitarId }
  });
  const [tab, setTab] = useState("specs");
  const [visible, setVisible] = useState(2);
  const { t } = useLanguage();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading guitar details</p>;

  const guitar = data.findUniqueModel;

  return (
    <div>
      <h1>{guitar.name}</h1>
      <p>{guitar.description}</p>
      <p><strong>Price:</strong> ${guitar.price}</p>

      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setTab("specs")}>{t.specs}</button>
        <button onClick={() => setTab("musicians")}>{t.musicians}</button>
      </div>

      {tab === "specs" && (
        <ul>
          {Object.entries(guitar.specs).map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))}
        </ul>
      )}

      {tab === "musicians" && (
        <div>
          {guitar.musicians.slice(0, visible).map((m, idx) => (
            <div key={idx} style={{ marginBottom: "10px" }}>
              <p><strong>{m.name}</strong></p>
              {m.musicianImage && <img src={m.musicianImage} alt={m.name} width="120" />}
              {m.bands?.length > 0 && (
                <p>Bands: {m.bands.join(", ")}</p>
              )}
            </div>
          ))}
          {visible < guitar.musicians.length && (
            <button onClick={() => setVisible(visible + 2)}>{t.showMore}</button>
          )}
        </div>
      )}
    </div>
  );
}