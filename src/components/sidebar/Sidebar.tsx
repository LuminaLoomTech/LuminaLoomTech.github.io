import React from 'react';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  item: { label: string; link: string; onClick?: () => void }[];
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ item, isOpen, onClose }: SidebarProps) => {
  const handleClick = (onClick?: () => void) => {
    if (onClick) {
      onClick();
    }
    onClose();
  };

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
                <a 
                  href={menu.link} 
                  onClick={(e) => {
                    if (menu.onClick) {
                      e.preventDefault();
                      handleClick(menu.onClick);
                    } else {
                      onClose();
                    }
                  }}
                >
                  {menu.label}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;