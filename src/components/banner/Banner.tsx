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

      <div className={styles.bannerContent}>
        <img
          src={banners[bannerIndex].img}
          alt={banners[bannerIndex].alt}
          className={styles.bannerImg}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />
        <div className={styles.bannerText}>
          {banners[bannerIndex].text}
        </div>
      </div>

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