import React from 'react';
import styles from './About.module.css';
import { fadeIn } from '@/utils/animations/motionPresets';
import { motion } from 'framer-motion';
import Header from "../../components/header/Header";
import { useTranslation } from 'react-i18next';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <>
    <Header />
    <div className={styles.container}>
      <header className={styles.hero}>
        <motion.h1 className={styles.title} {...fadeIn('down', 20, 0.6, 0.1)}>{t('about.title')}</motion.h1>
        <motion.p className={styles.subtitle} {...fadeIn('down', 20, 0.6, 0.2)}>
          {t('about.subtitle')}
        </motion.p>
      </header>

      <motion.section className={styles.quickStats} {...fadeIn("up",20,0.6,0.1)} >
        <div className={styles.statCard}>
          <div className={styles.statValue}>{t('about.softwareDept')}</div>
          <p className={styles.intro}>
            {t('about.softwareDesc')}
          </p>
          <div className={styles.statLabel}></div>
        </div>
      </motion.section>

         <motion.section className={styles.quickStats} {...fadeIn("up",20,0.6,0.1)} >
        <div className={styles.statCard}>
          <div className={styles.statValue}>{t('about.gameDept')}</div>
          <div className={styles.statLabel}></div>
        </div>
      </motion.section>

      <motion.section className={styles.grid} {...fadeIn('up', 20, 0.6, 0.5)}>
        <article className={styles.card}>
          <h2>{t('about.products')}</h2>
          <ul>
            <li>{t('about.product1')}</li>
            
          </ul>
        </article>
      </motion.section>
    </div>
  </>
  );
}

export {}


