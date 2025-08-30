import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/header.module.css';

const Header = ({ showBack = false }) => {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        {showBack && (
          <Link to="/" className={styles.backLink}>
            ← Back To Home
          </Link>
        )}
        <div className={styles.logo}>
          <span className={styles.logoMark}>Vibe</span>Strings
        </div>
      </div>
      
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Play like a <span className={styles.highlight}>Rock</span> star</h1>
          <p className={styles.subtitle}>Discover your perfect guitar and unleash your inner musician</p>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.logoContainer}>
            <img 
              src="/path-to-ibanez-logo.png" 
              alt="Ibanez Guitars" 
              className={styles.brandLogo}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
