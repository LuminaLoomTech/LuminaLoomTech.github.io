import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Banner.module.css';

interface BannerProps {
  banners: Array<{
    img: string;
    alt: string;
    text: string;
  }>;
  backgroundImage?: string;
}

export default function Banner({ banners, backgroundImage }: BannerProps) {
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % banners.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <section className={styles.bannerSection}>
      {/* 全頁面寬度背景層 */}
      {backgroundImage && (
        <div 
          className={styles.bannerBackground}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <button
        className={styles.bannerBtn}
        onClick={() => {
          setBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);
        }}
      >
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="55%" stopColor="#999999" stopOpacity="1" />
              <stop offset="100%" stopColor="#555555" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* 粗的內層 - 製造尖端變寬效果 */}
          <ChevronLeft 
            size={40} 
            strokeWidth={7}
            style={{ 
              stroke: 'url(#arrowGradient)',
              position: 'absolute',
              opacity: 0.7
            }}
            absoluteStrokeWidth
          />
          {/* 細的外層 - 完整輪廓 */}
          <ChevronLeft 
            size={42} 
            strokeWidth={4}
            style={{ stroke: 'url(#arrowGradient)' }}
            absoluteStrokeWidth
          />
        </div>
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
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* 粗的內層 - 製造尖端變寬效果 */}
          <ChevronRight 
            size={40} 
            strokeWidth={7}
            style={{ 
              stroke: 'url(#arrowGradient)',
              position: 'absolute',
              opacity: 0.7
            }}
            absoluteStrokeWidth
          />
          {/* 細的外層 - 完整輪廓 */}
          <ChevronRight 
            size={42} 
            strokeWidth={4}
            style={{ stroke: 'url(#arrowGradient)' }}
            absoluteStrokeWidth
          />
        </div>
      </button>

      {/* Banner 指示器 */}
      <div className={styles.bannerIndicators}>
        {banners.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${index === bannerIndex ? styles.indicatorActive : ''}`}
            onClick={() => setBannerIndex(index)}
            aria-label={`前往 banner ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}