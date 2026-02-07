import styles from './AboutSection.module.css';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <motion.section 
      id="about" 
      className={styles.aboutSection}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.container}>
        <header className={styles.hero}>
          <h1 className={styles.title}>
            {t('about.title')}
          </h1>
          <p className={styles.subtitle}>
            {t('about.subtitle')}
          </p>
        </header>

        <section className={styles.quickStats}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{t('about.softwareDept')}</div>
            <p className={styles.intro}>{t('about.softwareDesc')}</p>
          </div>
        </section>

        <section className={styles.quickStats}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{t('about.gameDept')}</div>
            <h2 style={{ fontSize: '1.5rem', marginTop: '20px', marginBottom: '15px' }}>{t('about.products')}</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ fontSize: '1rem', padding: '8px 0' }}>{t('about.product1')}</li>
            </ul>
          </div>
        </section>
      </div>
    </motion.section>
  );
}
