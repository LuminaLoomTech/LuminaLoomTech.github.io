import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CalendarDays, Newspaper } from 'lucide-react';
import styles from './NewsPage.module.css';

type NewsItem = {
  id: number;
  date: string;
  title: string;
};

const parseNews = (id: number, content: string): NewsItem => {
  const match = content.match(/^(\d{4}\/\d{2}\/\d{2})\s+(.+)$/);

  if (!match) {
    return {
      id,
      date: '更新中',
      title: content,
    };
  }

  return {
    id,
    date: match[1],
    title: match[2],
  };
};

export default function NewsPage() {
  const { t } = useTranslation();
  const allNews: NewsItem[] = [];
  let index = 1;

  while (true) {
    const newsKey = `home.news${index}`;
    const newsContent = t(newsKey);

    if (newsContent === newsKey) {
      break;
    }

    allNews.push(parseNews(index, newsContent));
    index += 1;
  }

  return (
    <motion.main
      className={styles.newsPage}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>News</span>
          <h1>最新公告</h1>
          <p>公司更新 產品進度 與重要資訊</p>
        </header>

        <div className={styles.newsList}>
          {allNews.length > 0 ? (
            allNews.map((news, idx) => (
              <motion.article
                key={news.id}
                className={styles.newsItem}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.08 + idx * 0.06 }}
              >
                <div className={styles.newsMeta}>
                  <span>
                    <Newspaper size={15} />
                    公告
                  </span>
                  <span>
                    <CalendarDays size={15} />
                    {news.date}
                  </span>
                </div>
                <h2>{news.title}</h2>
                <p>希織科技產品與公司營運相關更新</p>
              </motion.article>
            ))
          ) : (
            <article className={styles.newsItem}>
              <div className={styles.newsMeta}>
                <span>
                  <Newspaper size={15} />
                  公告
                </span>
              </div>
              <h2>公告準備中</h2>
              <p>後續會在此更新產品進度與公司消息</p>
            </article>
          )}
        </div>
      </div>
    </motion.main>
  );
}
