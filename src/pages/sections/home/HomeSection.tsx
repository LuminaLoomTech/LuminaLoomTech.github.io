import { useMemo, useState } from 'react';
import styles from './HomeSection.module.css';
import Banner from '../../../components/banner/Banner';
import NewsSection from '../../../components/sections/NewsSection';
import ParticleBackground from '../../../styles/animation';
import { useTranslation } from 'react-i18next';
import bannerBgImage from '../../../assets/images/BANNER-final.webp';

// 預設 banners（立即可用，不依賴 i18n）
const DEFAULT_BANNERS = [
  { img: '', alt: '廣告1', text: '軟體設計' },
  { img: '', alt: '廣告2', text: 'APP設計' },
  { img: '', alt: '廣告3', text: '遊戲設計' },
  { img: '', alt: '廣告4', text: '網頁設計' },
];

export default function HomeSection() {
  const { t, i18n } = useTranslation();
  const [bannerLoaded, setBannerLoaded] = useState(false);

  // 使用 useMemo 快取 banners，有翻譯時更新
  const banners = useMemo(() => {
    const bannerList = [];
    let index = 1;

    while (i18n.exists(`home.banner${index}Text`)) {
      const text = t(`home.banner${index}Text`);
      const imageName = t(`home.banner${index}Image`);

      let image = '';
      // 只有當圖片名稱不為空時才嘗試載入
      if (imageName && imageName.trim() !== '') {
        try {
          image = require(`../../../assets/images/${imageName}`);
        } catch (error) {
          console.warn(`圖片載入失敗: ${imageName}`);
        }
      }
      
      bannerList.push({
        img: image,
        alt: `廣告${index}`,
        text: text
      });

      index++;
    }

    // 如果沒有翻譯數據，返回預設值
    return bannerList.length > 0 ? bannerList : DEFAULT_BANNERS;
  }, [i18n, t]);

  // 靜態導入背景圖片，立即可用
  const backgroundImage = bannerBgImage;

  return (
    <section id="home" className={styles.homeSection}>
      {bannerLoaded && (
        <div className={styles.particleContainer}>
          <ParticleBackground preset='interactive'/>
        </div>
      )}
      <div style={{ zIndex: 1 }}>
        <Banner 
          banners={banners} 
          backgroundImage={backgroundImage}
          onImageLoad={() => setBannerLoaded(true)}
        />
      </div>
      <NewsSection />
    </section>
  );
}