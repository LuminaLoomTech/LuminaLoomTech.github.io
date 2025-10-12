import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, fadeOut } from '@/utils/animations/motionPresets';
import styles from './Home.module.css';
import Navbar from '../../components/navbar/Navbar';
import { useState, useEffect } from 'react';
import Header from "../../components/header/Header";

export default function Home() {
  const [index, setIndex] = useState(0);
  
  const texts = [
    "歡迎來到公司網頁", 
    "我們專注於軟體開發",
    "提供創新高效的解決方案",
    "希織工作室"
  ];

  useEffect(() => {
    if (index < texts.length - 1) {
      // 只要不是最後一句，就延遲幾秒後換下一句
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 3000); // 每 3 秒切換一次
      return () => clearTimeout(timer);
    }
  }, [index, texts.length]);

  return (
    <div className={styles.container}>
      <Header />
      <AnimatePresence mode="wait">
        <motion.h1 key={index} className={styles.title}>
          {texts[index].split("").map((char, i) => {
            const fadeInProps = fadeIn("up", 20, 0.5, i * 0.05);
            const fadeOutProps = fadeOut("down", 20, 0.5, i * 0.05);

              return (
                <motion.span
                  key={i}
                  initial={fadeInProps.initial}
                  animate={fadeInProps.animate}
                  exit={fadeOutProps.exit}
                  transition={fadeInProps.transition}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </motion.span>
              );
            })}
          </motion.h1>
        
      </AnimatePresence>

      <Navbar />
      <div className={styles.hero}>
        <img alt="" />
        <motion.div
          className={styles.text}
          {...fadeIn('left', 30, 0.8, 0.3)}
        >
          <h1>本公司網頁</h1>
          <p>
            我們專注於軟體開發與網頁設計，致力於為企業提供創新、穩定與高效的解決方案。
          </p>
          <p>
            我們的服務範圍涵蓋網站建置、系統整合、軟體設計等。
          </p>
        </motion.div>
      </div>
    </div>
  );
}
