import { useState, useEffect } from 'react';
import styles from '../../pages/sections/home/HomeSection.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeNormal, fadeLast } from '../../utils/animations/motionPresets';
import texts from './introTexts';

type Props = {
  onFinish?: () => void;
};

export default function Intro({ onFinish }: Props) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [show, setShow] = useState(true); // 改為 true，預設顯示

  const isLast = index === texts.length - 1;

  // 只在第一次掛載檢查 localStorage
  useEffect(() => {
    const seen = localStorage.getItem('introShown');
    if (seen) {
      setShow(false); // 已看過 → 直接隱藏並跳過
      onFinish?.();
    }
    // 如果沒看過，show 維持 true，正常顯示
  }, [onFinish]);

  useEffect(() => {
    if (!show || leaving) return; // 已離場或不顯示 → 不做切換
    const timer = setTimeout(() => {
      if (!isLast) {
        setIndex(prev => prev + 1);
      } else {
        setLeaving(true); // 最後一句 → 開始淡出
        localStorage.setItem('introShown', 'true'); // 記錄已看過
      }
    }, isLast ? 1000 : 800); // 縮短時間：最後1秒，其他0.8秒

    return () => clearTimeout(timer);
  }, [index, isLast, leaving, show]);

  return (
    <div className={styles.welcomeWrapper} aria-live="polite">
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          if (leaving) {
            onFinish?.();
          }
        }}
      >
        {show && !leaving && (
          <motion.div
            key={index}
            variants={isLast ? fadeLast : fadeNormal}
            initial="initial"
            animate="animate"
            exit="exit"
            className={styles.welcomeText}
            style={{
              fontSize: '28px',
              lineHeight: 1.2,
              textAlign: 'center',
            }}
          >
            {texts[index].split('\n').map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
