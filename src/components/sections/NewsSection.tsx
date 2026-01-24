import styles from './NewsSection.module.css';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import Button from '../ui/Button';

export default function NewsSection() {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  const allNews = [
    t('home.news1'),
    t('home.news2'),
    t('home.news3'),
  ];

  const displayedNews = showAll ? allNews : allNews.slice(0, 1);

  return (
    <section className={styles.newsSection}>
      <h2 className={styles.sectionTitle}>{t('home.news')}</h2>
      <ul className={styles.newsList}>
        {displayedNews.map((news, index) => (
          <li key={index}>{news}</li>
        ))}
      </ul>
      <div className={styles.buttonContainer}>
        <Button 
          type="button"
          variant="puretext"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? t('home.showLess') : t('home.showMore')}
        </Button>
      </div>
    </section>
  );
}
    