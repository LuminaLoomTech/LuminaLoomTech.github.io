import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import styles from './NewsPage.module.css';

export default function NewsPage() {
  const { t } = useTranslation();

  // 動態讀取所有 news
  const allNews = [];
  let index = 1;
  while (true) {
    const newsKey = `home.news${index}`;
    const newsContent = t(newsKey);
    if (newsContent === newsKey) break;
    allNews.push({
      id: index,
      content: newsContent,
      date: new Date(2026, 1, index).toLocaleDateString('zh-TW')
    });
    index++;
  }

  return (
    <motion.div 
      className={styles.newsPage}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <motion.h1 
            className={styles.title}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('nav.news')}
          </motion.h1>
        </header>

        <div className={styles.newsList}>
          {allNews.map((news, idx) => (
            <motion.article 
              key={news.id}
              className={styles.newsItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
            >
              <div className={styles.newsDate}>{news.date}</div>
              <div className={styles.newsContent}>{news.content}</div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
