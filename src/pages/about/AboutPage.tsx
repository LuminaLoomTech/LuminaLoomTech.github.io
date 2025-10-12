import React from 'react';
import styles from './About.module.css';
import { fadeIn } from '@/utils/animations/motionPresets';
import { motion } from 'framer-motion';
import Header from "../../components/header/Header";

export default function AboutPage() {
  const yearsOfExperience = new Date().getFullYear() - 2024;

  return (
    <>
    <Header />
    <div className={styles.container}>
      <header className={styles.hero}>
        <motion.h1 className={styles.title} {...fadeIn('down', 20, 0.6, 0.1)}>關於我們</motion.h1>
        <motion.p className={styles.subtitle} {...fadeIn('down', 20, 0.6, 0.2)}>
          希織工作室擁有兩大事業體
        </motion.p>
      </header>

      <motion.section className={styles.quickStats} {...fadeIn("up",20,0.6,0.1)} >
        <div className={styles.statCard}>
          <div className={styles.statValue}>{yearsOfExperience}</div>
          <div className={styles.statLabel}>年經驗</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>React</div>
          <div className={styles.statLabel}>主力技術</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>UI/UX</div>
          <div className={styles.statLabel}>設計思維</div>
        </div>
      </motion.section>

      <motion.section className={styles.grid} {...fadeIn('up', 20, 0.6, 0.5)}>
        <article className={styles.card}>
          <h2>我在做什麼</h2>
          <p>
            以元件化思維構建產品，重視效能、可維護性與一致的設計語言。擅長與設計、後端協作，快速交付可用版本。
          </p>
        </article>

        <article className={styles.card}>
          <h2>主要技能</h2>
          <ul className={styles.list}>
            <li>React / TypeScript / React Router</li>
            <li>CSS Modules / CSS Variables / RWD</li>
            <li>State 與資料流設計、表單與驗證</li>
            <li>簡易動畫與互動（Framer Motion / CSS Animations）</li>
          </ul>
        </article>

        <article className={styles.card}>
          <h2>價值觀</h2>
          <ul className={styles.list}>
            <li>以使用者為中心：清楚、穩定、易理解</li>
            <li>重視可讀性：乾淨命名、拆分職責、可測試</li>
            <li>持續學習與分享</li>
          </ul>
        </article>
      </motion.section>

      <motion.section className={styles.cta} {...fadeIn('up', 20, 0.6, 0.8)}>
        <h3>有專案想法嗎？</h3>
        <p>歡迎聯絡我，一起把點子做成作品。</p>
        <a className={styles.ctaButton} href="/contact">聯絡我</a>
      </motion.section>
    </div>
  </>
  );
}

export {}


