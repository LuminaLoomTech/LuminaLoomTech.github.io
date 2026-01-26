import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  item: { label: string; link: string }[];
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ item, isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* 遮罩 */}
      {isOpen && (
        <div
          className={`${styles['sidebar-overlay']} ${styles.show}`}
          onClick={onClose}
        />
      )}

      {/* 側邊欄 */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        {isOpen && (
          <div className={styles['sidebar-content']}>
            {item.map((menu) => (
              <div key={`${menu.label}-${menu.link}`} className={styles['sidebar-item']}>
                <Link to={menu.link} onClick={onClose}>
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