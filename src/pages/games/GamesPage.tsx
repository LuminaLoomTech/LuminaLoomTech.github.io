import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Box,
  Code2,
  Gamepad2,
  Gem,
  Hammer,
  Map,
  Sparkles,
} from 'lucide-react';
import styles from './GamesPage.module.css';

const gameFeatures = [
  {
    title: '獨立遊戲',
    icon: Gamepad2,
  },
  {
    title: '原創世界',
    icon: Map,
  },
  {
    title: '角色敘事',
    icon: Hammer,
  },
  {
    title: '長期作品',
    icon: Code2,
  },
];

const worldNodes = ['契約', '魔法', '邊境', '學派', '遺跡', '選擇'];

export default function GamesPage() {
  const scrollToWorld = () => {
    const element = document.getElementById('game-world');
    const scrollContainer = document.querySelector('[class*="scrollContainer"]') as HTMLElement | null;

    if (!element) {
      return;
    }

    if (scrollContainer) {
      const elementTop = element.getBoundingClientRect().top + scrollContainer.scrollTop;
      scrollContainer.scrollTo({ top: elementTop - 84, behavior: 'smooth' });
    } else {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.main
      className={styles.gamesPage}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38 }}
    >
      <section id="game-overview" className={styles.hero}>
        <div className={styles.starGrid} aria-hidden="true" />
        <div className={styles.heroInner}>
          <motion.div
            className={styles.heroCopy}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <span className={styles.eyebrow}>Game Studio</span>
            <h1>妖精巫師的契約</h1>
            <p>在契約與魔法交界處，選擇會留下光，也會留下代價。</p>
            <div className={styles.heroActions}>
              <a className={styles.steamButton} href="https://store.steampowered.com/" target="_blank" rel="noreferrer">
                <ArrowUpRight size={19} />
                <span>前往 Steam</span>
              </a>
              <button type="button" className={styles.secondaryButton} onClick={scrollToWorld}>
                <Sparkles size={19} />
                <span>查看世界觀</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            className={styles.gameVisual}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
            aria-label="遊戲概念視覺"
          >
            <img
              className={styles.keyArtImage}
              src="/content-assets/game-key-art.png"
              alt="妖精巫師的契約遊戲主視覺"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
            <div className={styles.moon} />
            <div className={styles.castleSilhouette}>
              <span />
              <span />
              <span />
            </div>
            <div className={styles.dialogPanel}>
              <strong>開發中</strong>
              <p>Key art / Prototype / Worldbuilding</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="game-world" className={styles.worldSection}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className={styles.eyebrow}>World</span>
          <h2>世界觀</h2>
        </motion.div>

        <div className={styles.worldMap}>
          {worldNodes.map((node, index) => (
            <motion.article
              key={node}
              className={styles.worldNode}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.34, delay: index * 0.05, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.35 }}
            >
              <Gem size={19} />
              <span>{node}</span>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="game-tools" className={styles.featureSection}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.36, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className={styles.eyebrow}>Direction</span>
          <h2>開發方向</h2>
        </motion.div>

        <div className={styles.featureGrid}>
          {gameFeatures.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                className={styles.featureCard}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.34, delay: index * 0.06, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.35 }}
              >
                <Icon size={24} strokeWidth={1.8} />
                <h3>{feature.title}</h3>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="game-steam" className={styles.steamSection}>
        <motion.div
          className={styles.steamPanel}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <Box size={25} />
          <div>
            <span className={styles.eyebrow}>Steam</span>
            <h2>商店頁準備中</h2>
            <p>公開後開放加入願望清單。</p>
          </div>
          <a href="https://store.steampowered.com/" target="_blank" rel="noreferrer">
            <span>前往 Steam</span>
            <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </section>
    </motion.main>
  );
}
