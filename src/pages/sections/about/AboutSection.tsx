import styles from './AboutSection.module.css';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export default function AboutSection() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.section 
      id="about" 
      className={styles.aboutSection}
      initial={{ opacity: 0, x: isMobile ? 0 : -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={styles.container}>
        <header className={styles.hero}>
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t('about.title')}
          </motion.h1>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {t('about.subtitle')}
          </motion.p>
        </header>

        <motion.section 
          className={styles.quickStats}
          initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className={styles.statCard}>
            <div className={styles.statValue}>{t('about.softwareDept')}</div>
            <p className={styles.intro}>{t('about.softwareDesc')}</p>
          </div>
        </motion.section>

        <motion.section 
          className={styles.quickStats}
          initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className={styles.statCard}>
            <div className={styles.statValue}>{t('about.gameDept')}</div>
            <h2 style={{ fontSize: '1.5rem', marginTop: '20px', marginBottom: '15px' }}>{t('about.products')}</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ fontSize: '1rem', padding: '8px 0' }}>{t('about.product1')}</li>
            </ul>
          </div>
        </motion.section>
      </div>
    </motion.section>
  );
}
