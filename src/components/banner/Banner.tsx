import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import styles from './Banner.module.css';

interface BannerProps {
  banners: Array<{
    img: string;
    alt: string;
    text: string;
  }>;
}

export default function Banner({ banners }: BannerProps) {
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <section className={styles.bannerSection}>
      <button
        className={styles.bannerBtn}
        onClick={() => {
          setBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);
        }}
      >
        ‹
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={bannerIndex}
          className={styles.bannerContent}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <img
            src={banners[bannerIndex].img}
            alt={banners[bannerIndex].alt}
            className={styles.bannerImg}
          />
          <div className={styles.bannerText}>
            {banners[bannerIndex].text}
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        className={styles.bannerBtn}
        onClick={() => {
          setBannerIndex((prev) => (prev + 1) % banners.length);
        }}
      >
        ›
      </button>
    </section>
  );
}