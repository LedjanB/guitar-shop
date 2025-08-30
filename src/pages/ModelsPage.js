import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import styles from './ModelsPage.module.css';

const GET_BRAND_MODELS = gql`
  query GetBrandModels($id: ID!, $sortBy: sortBy!) {
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      price
      image
      type
      description
    }
  }
`;

const ModelsPage = () => {
  const { brandId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filteredModels, setFilteredModels] = useState([]);

  // ✅ Pass sortBy as required input object
  const { loading, error, data } = useQuery(GET_BRAND_MODELS, {
    variables: {
      id: parseInt(brandId, 10),   // brandId is numeric
      sortBy: { field: "name", order: "ASC" }
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (data?.findBrandModels) {
      let result = [...data.findBrandModels];

      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter(model =>
          model.name.toLowerCase().includes(term) ||
          (model.description && model.description.toLowerCase().includes(term))
        );
      }

      if (filterType !== 'all') {
        result = result.filter(model =>
          model.type?.toLowerCase() === filterType.toLowerCase()
        );
      }

      setFilteredModels(result);
    }
  }, [data, searchTerm, filterType]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading models...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Error loading models</h2>
        <p>{error.message}</p>
        <Link to="/" className={styles.backButton}>
          ← Back to Brands
        </Link>
      </div>
    );
  }

  const models = filteredModels || [];

  return (
    <div className={styles.modelsPage}>
      <header className={styles.pageHeader}>
        <div className={styles.container}>
          <Link to="/" className={styles.backLink}>← Back to Brands</Link>
          <h1>Brand <span className={styles.highlight}>Guitars</span></h1>
          <p className={styles.pageSubtitle}>
            Explore our collection of premium guitars
          </p>
        </div>
      </header>

      <section className={styles.filtersSection}>
        <div className={styles.container}>
          <div className={styles.filtersContainer}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
                aria-label="Search guitar models"
              />
            </div>
            <div className={styles.filterGroup}>
              <label htmlFor="guitarType" className={styles.filterLabel}>
                Filter by Type:
              </label>
              <select
                id="guitarType"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Types</option>
                <option value="electric">Electric</option>
                <option value="acoustic">Acoustic</option>
                <option value="bass">Bass</option>
                <option value="classical">Classical</option>
              </select>
            </div>
          </div>
          <div className={styles.resultsCount}>
            {models.length} {models.length === 1 ? 'model' : 'models'} found
          </div>
        </div>
      </section>

      <section className={styles.modelsGridSection}>
        <div className={styles.container}>
          {models.length > 0 ? (
            <div className={styles.modelsGrid}>
              {models.map((model) => (
                <Link
                  to={`/brand/${brandId}/guitar/${model.id}`}
                  key={model.id}
                  className={styles.modelCard}
                >
                  <div className={styles.modelImageContainer}>
                    {model.image ? (
                      <img src={model.image} alt={model.name} className={styles.modelImage} />
                    ) : (
                      <div className={styles.imagePlaceholder}></div>
                    )}
                    <div className={styles.modelTypeBadge}>{model.type}</div>
                  </div>
                  <div className={styles.modelInfo}>
                    <h3 className={styles.modelName}>{model.name}</h3>
                    <p className={styles.modelDescription}>
                      {model.description || 'No description available.'}
                    </p>
                    <div className={styles.modelPrice}>
                      ${parseFloat(model.price).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </div>
                    <div className={styles.viewDetails}>View Details →</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.noResults}>
              <h3>No models found</h3>
              <button onClick={() => { setSearchTerm(''); setFilterType('all'); }} className={styles.resetButton}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ModelsPage;
