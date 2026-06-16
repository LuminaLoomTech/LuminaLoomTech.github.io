import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Gamepad2, Hammer, Sparkles } from 'lucide-react';
import styles from './GameBusinessSection.module.css';

const signals = [
  { title: '獨立遊戲', description: '多類型作品開發', icon: Gamepad2 },
  { title: '原創世界觀', description: '角色 故事 場景 設定', icon: Sparkles },
  { title: '開發工具', description: '自研工具協助製作', icon: Hammer },
];

export default function GameBusinessSection() {
  const navigate = useNavigate();

  return (
    <motion.section
      className={styles.gameSection}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.24 }}
    >
      <div className={styles.sceneGrid} aria-hidden="true" />
      <div className={styles.container}>
        <motion.div
          className={styles.copy}
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.32 }}
        >
          <span className={styles.eyebrow}>Game Studio</span>
          <h2>遊戲事業</h2>
          <p>
            希織科技遊戲設計部不只開發單一類型作品，而是以多種類獨立遊戲為方向，
            同時建立輔助開發的內部工具，讓企劃、世界觀、內容製作與版本迭代更有效率。
          </p>
          <button type="button" className={styles.ctaButton} onClick={() => navigate('/games')}>
            <span>前往遊戲頁</span>
            <ArrowUpRight size={18} />
          </button>
        </motion.div>

        <div className={styles.signalGrid}>
          {signals.map((signal, index) => {
            const Icon = signal.icon;

            return (
              <motion.article
                key={signal.title}
                className={styles.signalCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.34, delay: index * 0.08, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.35 }}
              >
                <Icon size={24} strokeWidth={1.8} />
                <h3>{signal.title}</h3>
                <p>{signal.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
