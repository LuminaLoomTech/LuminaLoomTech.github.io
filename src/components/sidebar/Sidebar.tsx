import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/animations/motionPresets';

interface SidebarProps {
  item: { label: string; link: string }[];
}

const Sidebar = ({ item }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* 漢堡按鈕 */}
      <motion.button
        className={`${styles['sidebar-toggle']} ${isOpen ? styles.open : ''}`}
        {...fadeIn('down', 20, 0.5, 0.2)}
        drag="y"
        dragConstraints={{ top: 0, bottom: window.innerHeight - 50 }}
        dragElastic={0.2}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span> {/* 漢堡線 */}
      </motion.button>

      {/* 遮罩 */}
      {isOpen && (
        <div
          className={`${styles['sidebar-overlay']} ${styles.show}`}
          onClick={closeSidebar}
        />
      )}

      {/* 側邊欄 */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        {isOpen && (
          <div className={styles['sidebar-content']}>
            {item.map((menu) => (
              <div key={`${menu.label}-${menu.link}`} className={styles['sidebar-item']}>
                <Link to={menu.link} onClick={closeSidebar}>
                  {menu.label}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;