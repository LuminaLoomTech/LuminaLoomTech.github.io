import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  
  const scrollToSection = (sectionId: string) => {
    // 如果不在主頁，先導航到主頁
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

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
            <a href="https://github.com/LuminaLoomTech" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>{t('footer.quickLinks')}</h3>
          <div className="quick-links">
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
            >
              {t('footer.home')}
            </a>
            <a 
              href="#about" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
            >
              {t('footer.about')}
            </a>
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
            >
              {t('footer.contact')}
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} {t('footer.copyright')}</p>
      </div>
    </footer>
  );
};

export default memo(Footer);
