import { motion } from 'framer-motion';
import { ArrowRight, CalendarDays, Newspaper } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styles from './NewsSection.module.css';

type NewsItem = {
  date: string;
  title: string;
};

const parseNews = (content: string): NewsItem => {
  const match = content.match(/^(\d{4}\/\d{2}\/\d{2})\s+(.+)$/);

  if (!match) {
    return {
      date: '更新中',
      title: content,
    };
  }

  return {
    date: match[1],
    title: match[2],
  };
};

const scrollToTop = () => {
  const scrollContainer = document.querySelector('[class*="scrollContainer"]') as HTMLElement | null;
  if (scrollContainer) {
    scrollContainer.scrollTop = 0;
    scrollContainer.scrollLeft = 0;
  }
};

export default function NewsSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const allNews: NewsItem[] = [];
  let index = 1;

  while (true) {
    const newsKey = `home.news${index}`;
    const newsContent = t(newsKey);

    if (newsContent === newsKey) {
      break;
    }

    allNews.push(parseNews(newsContent));
    index += 1;
  }

  const displayedNews = allNews.slice(0, 3);

  const goToNews = () => {
    navigate('/news');
    window.setTimeout(scrollToTop, 100);
  };

  return (
    <motion.section
      className={styles.newsSection}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.22 }}
    >
      <div className={styles.techGrid} aria-hidden="true" />
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <span className={styles.eyebrow}>News</span>
          <h2>最新公告</h2>
          <p>產品進度 公司更新 與重要資訊</p>
        </motion.div>

        <div className={styles.newsGrid}>
          {displayedNews.length > 0 ? (
            displayedNews.map((news, itemIndex) => (
              <motion.article
                key={`${news.date}-${news.title}`}
                className={styles.newsCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.36, delay: itemIndex * 0.08, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.35 }}
              >
                <div className={styles.cardTop}>
                  <span className={styles.category}>
                    <Newspaper size={15} />
                    公告
                  </span>
                  <span className={styles.date}>
                    <CalendarDays size={15} />
                    {news.date}
                  </span>
                </div>
                <h3>{news.title}</h3>
                <p>希織科技產品與公司營運相關更新</p>
              </motion.article>
            ))
          ) : (
            <motion.article
              className={styles.newsCard}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.36, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.35 }}
            >
              <div className={styles.cardTop}>
                <span className={styles.category}>
                  <Newspaper size={15} />
                  公告
                </span>
              </div>
              <h3>公告準備中</h3>
              <p>後續會在此更新產品進度與公司消息</p>
            </motion.article>
          )}
        </div>

        <motion.button
          type="button"
          className={styles.newsButton}
          onClick={goToNews}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.12, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <span>查看全部公告</span>
          <ArrowRight size={17} />
        </motion.button>
      </div>
    </motion.section>
  );
}
