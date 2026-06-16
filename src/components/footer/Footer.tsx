import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowUp, ArrowUpRight, Github, Mail, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: t('footer.home'), section: 'home' },
    { label: t('footer.about'), section: 'about' },
    { label: t('nav.services'), section: 'services' },
    { label: t('footer.contact'), section: 'contact' },
  ];

  const scrollToSection = (sectionId: string) => {
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

  const goToNews = () => {
    navigate('/news');
    const scrollContainer = document.querySelector('[class*="scrollContainer"]') as HTMLElement | null;
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
      scrollContainer.scrollLeft = 0;
    }
  };

  const goToProducts = () => {
    navigate('/products');
    setTimeout(() => {
      const scrollContainer = document.querySelector('[class*="scrollContainer"]') as HTMLElement | null;
      if (scrollContainer) {
        scrollContainer.scrollTop = 0;
        scrollContainer.scrollLeft = 0;
      }
    }, 60);
  };

  return (
    <footer className="footer">
      <div className="footer-shell">
        <div className="footer-main">
          <section className="footer-action-panel">
            <span className="footer-column-label">Actions</span>
            <div className="footer-actions">
              <button
                type="button"
                className="footer-primary-action"
                onClick={() => scrollToSection('contact')}
              >
                <span>{t('footer.contact')}</span>
                <ArrowUpRight size={15} />
              </button>

              <button
                type="button"
                className="footer-inline-action"
                onClick={goToNews}
              >
                <span>{t('nav.news')}</span>
                <ArrowUpRight size={15} />
              </button>

              <button
                type="button"
                className="footer-inline-action"
                onClick={goToProducts}
              >
                <span>{t('nav.products')}</span>
                <ArrowUpRight size={15} />
              </button>

              <button
                type="button"
                className="footer-inline-action"
                onClick={() => scrollToSection('home')}
              >
                <span>{t('footer.home')}</span>
                <ArrowUp size={15} />
              </button>
            </div>
          </section>

          <div className="footer-columns">
            <section className="footer-column">
              <span className="footer-column-label">{t('footer.contactInfo')}</span>
              <div className="footer-list">
                <a className="footer-list-item footer-list-item-contact" href="mailto:Luminaloomtechbd@gmail.com">
                  <span className="footer-list-icon"><Mail size={16} /></span>
                  <span className="footer-list-text">{t('footer.email')}</span>
                </a>
                <a className="footer-list-item footer-list-item-contact" href="tel:0984108473">
                  <span className="footer-list-icon"><Phone size={16} /></span>
                  <span className="footer-list-text">{t('footer.phone')}</span>
                </a>
              </div>
            </section>

            <section className="footer-column">
              <span className="footer-column-label">{t('footer.quickLinks')}</span>
              <div className="footer-list">
                {quickLinks.map((link) => (
                  <a
                    key={link.section}
                    href={`#${link.section}`}
                    className="footer-list-item footer-list-item-link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.section);
                    }}
                  >
                    <span className="footer-list-text">{link.label}</span>
                    <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </section>

            <section className="footer-column footer-column-end">
              <span className="footer-column-label">{t('footer.socialMedia')}</span>
              <div className="footer-list">
                <a
                  className="footer-list-item footer-list-item-link"
                  href="https://github.com/LuminaLoomTech"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="footer-list-icon"><Github size={16} /></span>
                  <span className="footer-list-text">GitHub</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </section>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} {t('footer.copyright')}</p>
          <div className="footer-bottom-line" />
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
