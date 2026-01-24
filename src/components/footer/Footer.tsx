import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>{t('footer.contactInfo')}</h3>
          <p>{t('footer.email')}</p>
          <p>{t('footer.phone')}</p>
        </div>
        
        <div className="footer-section">
          <h3>{t('footer.socialMedia')}</h3>
          <div className="social-links">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>{t('footer.quickLinks')}</h3>
          <div className="quick-links">
            <a href="/">{t('footer.home')}</a>
            <a href="/about">{t('footer.about')}</a>
            <a href="/contact">{t('footer.contact')}</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} {t('footer.copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;
