import styles from './NewsSection.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from '../ui/Button';

// Helper：操作 Scroller 容器的滾動
const scrollToTop = (smooth = false) => {
    const scrollContainer = document.querySelector('[class*="scrollContainer"]') as HTMLElement;
    if (scrollContainer) {
        scrollContainer.scrollTop = 0;
        scrollContainer.scrollLeft = 0;
    }
};

export default function NewsSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // 動態讀取所有 news
  const allNews = [];
  let index = 1;
  while (true) {
    const newsKey = `home.news${index}`;
    const newsContent = t(newsKey);
    // 如果翻譯結果等於 key 本身，表示該 news 不存在
    if (newsContent === newsKey) break;
    allNews.push(newsContent);
    index++;
  }

  const displayedNews = allNews.slice(0, 5);
  const hasMoreNews = allNews.length > 5;

  return (
    <section className={styles.newsSection}>
      <h2 className={styles.sectionTitle}>{t('home.news')}</h2>
      <ul className={styles.newsList}>
        {displayedNews.map((news, index) => (
          <li key={index}>{news}</li>
        ))}
      </ul>
      {hasMoreNews && (
        <div className={styles.buttonContainer}>
          <Button 
            type="button"
            variant="puretext"
            onClick={() => {
              navigate('/news');
              setTimeout(() => scrollToTop(false), 100);
            }}
          >
            {t('home.viewAllNews') || '查看全部新聞'}
          </Button>
        </div>
      )}
    </section>
  );
}
    