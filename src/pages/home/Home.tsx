import { useState } from 'react';
import styles from './Home.module.css';
import Banner from '../../components/banner/Banner';
import Intro from '../../components/intro/Intro';
import NewsSection from '../../components/sections/NewsSection';
import ParticleBackground from '../../styles/animation';

import czLogo3 from '../../assets/images/CZ_LOGO3.png';
import hime from '../../assets/images/hime.jpg';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  const [introActive, setIntroActive] = useState(true);

  const banners = [
    { img: czLogo3, alt: '廣告1', text: t('home.bannerText1') },
    { img: czLogo3, alt: '廣告2', text: t('home.bannerText2') },
    { img: hime, alt: '廣告3', text: t('home.bannerText3') }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.particleContainer}>
        <ParticleBackground preset='interactive'/>
      </div>

      {introActive && <Intro onFinish={() => setIntroActive(false)} />}

      <div
        style={{
          transform: introActive ? 'translateY(80px)' : 'translateY(0)',
          transition: 'transform 500ms ease',
          zIndex: 1
        }}
      >
        <Banner banners={banners} />
      </div>

      <NewsSection />
    </div>
  );
}
