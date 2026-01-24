// src/utils/motionPresets.ts
// 動態函式 方便改方向及時間 ex:<motion.div {...fadeIn('left', 50, 0.8, 0.2)} />
type Direction = 'up' | 'down' | 'left' | 'right';

export function fadeIn(direction: Direction, offset = 30, duration = 0.6, delay = 0) {
  const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
  const value = direction === 'up' || direction === 'left' ? offset : -offset;

  return {
    initial: { opacity: 0, [axis]: value },
    animate: { opacity: 1, [axis]: 0 },
    transition: { duration, delay },
  };
}
export function fadeOut(direction: Direction, offset = 30, duration = 0.6, delay = 0) {
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
    transition: { duration: 0.6 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.6 }
  }
};

export const fadeLast = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.6 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 2.0 } // ← 最後一句淡出比較慢
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
