import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import styles from './BrandsPage.module.css';

const BRANDS_QUERY = gql`
  query {
    findAllBrands {
      id
      name
      image
    }
  }
`;

const BrandsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [featuredBrands, setFeaturedBrands] = useState([]);

  const { loading, error, data } = useQuery(BRANDS_QUERY);

  useEffect(() => {
    if (data?.findAllBrands) {
      const featured = [...data.findAllBrands].slice(0, 4);
      setFeaturedBrands(featured);
      setFilteredBrands(data.findAllBrands);
    }
  }, [data]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (data?.findAllBrands) {
      const filtered = data.findAllBrands.filter(brand =>
        brand.name.toLowerCase().includes(term)
      );
      setFilteredBrands(filtered);
    }
  };

  if (loading) return <div className={styles.loading}>Loading brands...</div>;
  if (error) return <div className={styles.error}>Error loading brands: {error.message}</div>;

  return (
    <div className={styles.brandsPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>
            Find Your Perfect <span className={styles.highlight}>Guitar</span>
          </h1>
          <p>Explore our collection of premium guitar brands</p>
        </div>
      </section>

      {/* Featured Brands Showcase */}
      <section className={styles.featuredBrands}>
        <div className={styles.container}>
          <h2>
            Featured <span className={styles.highlight}>Brands</span>
          </h2>
          <div className={styles.brandShowcase}>
            {featuredBrands.map((brand) => (
              <div key={brand.id} className={styles.brandCard}>
                <div className={styles.brandLogoContainer}>
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className={styles.brandLogo}
                  />
                </div>
                <h3>{brand.name}</h3>
                <Link
                  to={`/brand/${brand.id}`}
                  className={styles.exploreButton}
                >
                  Explore {brand.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Brands Section */}
      <section className={styles.allBrands}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>
              All <span className={styles.highlight}>Brands</span>
            </h2>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search brands..."
                value={searchTerm}
                onChange={handleSearch}
                className={styles.searchInput}
              />
              <select className={styles.filterSelect}>
                <option value="all">All Types</option>
                <option value="electric">Electric</option>
                <option value="acoustic">Acoustic</option>
                <option value="bass">Bass</option>
                <option value="classical">Classical</option>
              </select>
            </div>
          </div>

          <div className={styles.brandsGrid}>
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand) => (
                <Link
                  to={`/brand/${brand.id}`}
                  key={brand.id}
                  className={styles.brandItem}
                >
                  <div className={styles.brandImageContainer}>
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className={styles.brandImage}
                    />
                  </div>
                  <h3>{brand.name}</h3>
                </Link>
              ))
            ) : (
              <div className={styles.noResults}>
                No brands found matching your search.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2>Ready to Find Your Perfect Guitar?</h2>
          <p>Browse our full collection of premium guitars and accessories</p>
          <button className={styles.ctaButton}>Shop Now</button>
        </div>
      </section>
    </div>
  );
};

export default BrandsPage;
