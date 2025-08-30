import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import styles from '../styles/footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Contact Column */}
        <div className={styles.footerColumn}>
          <h3 className={styles.columnTitle}>Contact Us</h3>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <FaMapMarkerAlt className={styles.contactIcon} />
              <span>123 Guitar Street, Music City, MC 12345</span>
            </li>
            <li className={styles.contactItem}>
              <FaEnvelope className={styles.contactIcon} />
              <a href="mailto:info@vibestrings.com">info@vibestrings.com</a>
            </li>
            <li className={styles.contactItem}>
              <FaPhone className={styles.contactIcon} />
              <a href="tel:+1234567890">+1 (234) 567-890</a>
            </li>
          </ul>
        </div>

        {/* Quick Links Column */}
        <div className={styles.footerColumn}>
          <h3 className={styles.columnTitle}>Quick Links</h3>
          <ul className={styles.linkList}>
            <li><a href="/store">Store</a></li>
            <li><a href="/collections">Collections</a></li>
            <li><a href="/new-arrivals">New Arrivals</a></li>
            <li><a href="/sale">Sale</a></li>
            <li><a href="/support">Support</a></li>
          </ul>
        </div>

        {/* Information Column */}
        <div className={styles.footerColumn}>
          <h3 className={styles.columnTitle}>Information</h3>
          <ul className={styles.linkList}>
            <li><a href="/about">About Us</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/shipping">Shipping & Returns</a></li>
            <li><a href="/careers">Careers</a></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className={styles.footerColumn}>
          <h3 className={styles.columnTitle}>Newsletter</h3>
          <p className={styles.newsletterText}>
            Subscribe to our newsletter for the latest updates and offers.
          </p>
          <form className={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className={styles.newsletterInput}
              required 
            />
            <button type="submit" className={styles.newsletterButton}>
              Subscribe
            </button>
          </form>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" aria-label="Facebook">
              <FaFacebook className={styles.socialIcon} />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <FaTwitter className={styles.socialIcon} />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <FaInstagram className={styles.socialIcon} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className={styles.copyrightBar}>
        <div className={styles.copyrightContent}>
          <p> 2024 VibeStrings. All rights reserved.</p>
          <div className={styles.legalLinks}>
            <a href="/privacy">Privacy Policy</a>
            <span className={styles.divider}>|</span>
            <a href="/terms">Terms of Service</a>
            <span className={styles.divider}>|</span>
            <a href="/sitemap">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;