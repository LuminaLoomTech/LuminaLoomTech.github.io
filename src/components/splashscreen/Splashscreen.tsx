import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/CZ_LOGO3.png";

type SplashscreenProps = {
  onFinish: () => void;
};

const SplashScreen: React.FC<SplashscreenProps> = ({ onFinish }) => {
  // 新增一個狀態：控制是否正在淡出
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // 1️⃣ 播放淡出動畫
      setIsFadingOut(true);

      // 2️⃣ 淡出動畫播放完後（約1秒），再通知父層關閉
      setTimeout(() => {
        onFinish();
      }, 1000);
    }, 3000); // 停留3秒後開始淡出

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        // 外層容器樣式
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          zIndex: 9999,
        }}
        // 進出動畫控制
        initial={{ opacity: 1 }}
        animate={{ opacity: isFadingOut ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* 中央區塊：logo + 公司名稱 */}
        <motion.div
          className="flex items-center"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            gap: 20,
            color: "#fff",
            padding: 24,
            borderRadius: 10,
            display: 'flex', flexDirection: 'row', alignItems: 'center'
          }}
        >
          {/* 左側 logo */}
          <motion.img
            src={logo}
            alt="Company Logo"
            style={{
              width: 84,
              height: 84,
              objectFit: "contain",
              borderRadius: 8,
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />

          {/* 右側文字 */}
          <motion.div
            initial={{ x: 8, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color:"#6eebdeff" }}>
              希織工作室
            </h1>
            <p style={{ 
              margin: "6px 0 0", 
              fontSize: 20, 
              opacity: 0.9,
              color:"#59dbffff",
               }}>
              提供創新高效的軟體解決方案
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
