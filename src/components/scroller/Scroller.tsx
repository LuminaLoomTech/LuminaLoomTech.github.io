import React, { ReactNode, useRef, useCallback } from 'react';
import styles from './Scroller.module.scss';

interface ScrollerProps {
  children: ReactNode;
}

const Scroller: React.FC<ScrollerProps> = ({ children }) => {
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 節流滾動事件監聽器，避免過頻繁觸發
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      // 滾動事件處理（如需要可在這加入邏輯）
    }, 100);
  }, []);

  return (
    <div className={styles.scrollContainer} onScroll={handleScroll}>
      {children}
    </div>
  );
};

export default Scroller;
