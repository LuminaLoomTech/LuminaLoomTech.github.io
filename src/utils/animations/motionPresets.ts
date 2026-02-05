// src/utils/motionPresets.ts
// 動態函式 方便改方向及時間 ex:<motion.div {...fadeIn('left', 50, 0.4, 0.2)} />
type Direction = 'up' | 'down' | 'left' | 'right';

// 優化後的動畫預設 - 使用更快的持續時間 (0.4s)，改善效能
export function fadeIn(direction: Direction, offset = 30, duration = 0.4, delay = 0) {
  const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
  const value = direction === 'up' || direction === 'left' ? offset : -offset;

  return {
    initial: { opacity: 0, [axis]: value },
    animate: { opacity: 1, [axis]: 0 },
    transition: { duration, delay },
  };
}
export function fadeOut(direction: Direction, offset = 30, duration = 0.4, delay = 0) {
  const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
  const value = direction === 'up' || direction === 'left' ? -offset : offset;


  return {
    exit: { opacity: 0, [axis]: value },
    transition: { duration, delay },
  };
}
export const fadeNormal = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

export const fadeLast = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5 } // ← 退出速度改快
  }
};


export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
};

export const slideInLeft = {
  initial: { x: -50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
};

export const slideInRight = {
  initial: { x: 50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
};
