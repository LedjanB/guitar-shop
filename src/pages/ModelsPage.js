import { useQuery, gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLanguage } from "../context/LanguageContext";

// 1) Get allowed enum values from the API
const GET_SORT_ENUMS = gql`
  query {
    sortFields: __type(name: "ModelSortField") { enumValues { name } }
    sortOrders: __type(name: "SortOrder") { enumValues { name } }
  }
`;

// 2) Models query (requires id + sortBy)
const GET_MODELS = gql`
  query ($id: ID!, $sortBy: sortBy!) {
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      type
      image
      description
      price
    }
  }
`;

export default function ModelsPage() {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // fetch enum names first
  const enums = useQuery(GET_SORT_ENUMS);

  // pick safe defaults once enums arrive
  const sortField =
    enums.data?.sortFields?.enumValues?.find(e => e.name === "NAME")?.name ||
    enums.data?.sortFields?.enumValues?.[0]?.name;

  const sortOrder =
    enums.data?.sortOrders?.enumValues?.find(e => e.name === "ASC")?.name ||
    enums.data?.sortOrders?.enumValues?.[0]?.name;

  // only run models query when enums are ready
  const { loading, error, data } = useQuery(GET_MODELS, {
    variables: { id: brandId, sortBy: { field: sortField, order: sortOrder } },
    skip: !(sortField && sortOrder),
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [count, setCount] = useState(6);

  if (enums.loading || (!sortField && !enums.error)) return <p>Loading...</p>;
  if (enums.error) return <pre>{enums.error.message}</pre>;
  if (loading) return <p>Loading...</p>;
  if (error) return <pre>{error.message}</pre>; // show real GraphQL error

  let models = data.findBrandModels
    .filter(m => m.name.toLowerCase().includes(search.toLowerCase()))
    .filter(m => (filter ? m.type === filter : true));

  const fetchMore = () => setCount(prev => prev + 6);

  return (
    <div>
      <h1>{t.models}</h1>

      <input
        placeholder={t.search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginRight: "10px" }}
      />

      <select onChange={e => setFilter(e.target.value)}>
        <option value="">{t.allTypes}</option>
        <option value="Electric">{t.electric}</option>
        <option value="Acoustic">{t.acoustic}</option>
      </select>

      <InfiniteScroll
        dataLength={Math.min(models.length, count)}
        next={fetchMore}
        hasMore={count < models.length}
        loader={<p>Loading more...</p>}
      >
        <ul>
          {models.slice(0, count).map(m => (
            <li
              key={m.id}
              style={{ cursor: "pointer", marginBottom: "8px" }}
              onClick={() => navigate(`/brand/${brandId}/guitar/${m.id}`)}
            >
              {m.name} ({m.type})
            </li>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
}