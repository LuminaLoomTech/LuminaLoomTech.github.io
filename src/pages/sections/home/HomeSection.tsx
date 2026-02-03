import { useState } from 'react';
import styles from './HomeSection.module.css';
import Banner from '../../../components/banner/Banner';
import Intro from '../../../components/intro/Intro';
import NewsSection from '../../../components/sections/NewsSection';
import ParticleBackground from '../../../styles/animation';
import { useTranslation } from 'react-i18next';

export default function HomeSection() {
  const { t, i18n } = useTranslation();
  
  const [introActive, setIntroActive] = useState(() => {
    return !localStorage.getItem('introShown');
  });

  // 動態讀取所有 banner
  const getBanners = () => {
    const banners = [];
    let index = 1;
    
    while (i18n.exists(`home.banner${index}Text`)) {
      const text = t(`home.banner${index}Text`);
      const imageName = t(`home.banner${index}Image`);
      
      try {
        const image = require(`../../../assets/images/${imageName}`);
        banners.push({
          img: image,
          alt: `廣告${index}`,
          text: text
        });
      } catch (error) {
        console.warn(`圖片載入失敗: ${imageName}`);
      }
      
      index++;
    }
    
    return banners;
  };

  const banners = getBanners();

  const getBackgroundImage = () => {
    if (i18n.exists('home.bannerBackground')) {
      const imageName = t('home.bannerBackground');
      try {
        return require(`../../../assets/images/${imageName}`);
      } catch (error) {
        console.warn(`背景圖片載入失敗: ${imageName}`);
        return undefined;
      }
    }
    return undefined;
  };

  const backgroundImage = getBackgroundImage();

  return (
    <section id="home" className={styles.homeSection}>
      <div className={styles.particleContainer}>
        <ParticleBackground preset='interactive'/>
      </div>
      {introActive && <Intro onFinish={() => setIntroActive(false)} />}
      <div style={{ zIndex: 1 }}>
        <Banner banners={banners} backgroundImage={backgroundImage} />
      </div>
      <NewsSection />
    </section>
  );
}
