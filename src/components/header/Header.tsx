import logo from '../../assets/images/CZ_LOGO3.png';
import styles from './Header.module.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import sidebarStyles from '../sidebar/Sidebar.module.scss';
import { memo } from 'react';

interface HeaderProps {
    onMenuClick?: () => void;
    isSidebarOpen?: boolean;
    onScrollToSection?: (sectionId: string) => void;
}

// Helper：操作 Scroller 容器的滾動
const scrollToTop = (smooth = false) => {
    const scrollContainer = document.querySelector('[class*="scrollContainer"]') as HTMLElement;
    if (scrollContainer) {
        scrollContainer.scrollTop = 0;
        scrollContainer.scrollLeft = 0;
    }
};

const Header = ({ onMenuClick, isSidebarOpen, onScrollToSection }: HeaderProps) => {
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lng = e.target.value;
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
    };

    const handleNewsClick = (e: React.MouseEvent) => {
        e.preventDefault();
        // 先立即滾動
        scrollToTop(false);
        // 導航
        navigate('/news');
        // 在導航後多次確保滾動到頂部
        setTimeout(() => {
            scrollToTop(false);
        }, 50);
        setTimeout(() => {
            scrollToTop(false);
        }, 150);
        setTimeout(() => {
            scrollToTop(false);
        }, 300);
    };

    const scrollToSection = (sectionId: string) => {
        if (onScrollToSection) {
            onScrollToSection(sectionId);
        } else {
            // Fallback：如果沒有 prop，使用本地邏輯
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    };

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (location.pathname !== '/') {
            navigate('/');
        } else {
            scrollToSection('home');
        }
    };

    return (
        <header className={styles.header}>
            <div className={styles.waterBackground}></div>
            {/* 漢堡選單按鈕 */}
            <button 
                className={`${sidebarStyles['sidebar-toggle']} ${isSidebarOpen ? sidebarStyles.open : ''}`}
                onClick={onMenuClick}
                type="button"
            >
                <span></span>
            </button>
            <a 
                href="#home" 
                className={styles.logo}
                onClick={handleLogoClick}
            >
                <img src={logo} className={styles['logo-img']} alt="公司Logo" />
                <span className={styles['company-name']}>希織科技</span>
                <span className={styles.slogan}>{t('header.slogan')}</span>
            </a>
            <nav className={styles.navbar}>
                <a 
                    href="#about"
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('about');
                    }}
                >
                    {t('nav.about')}
                </a>
                <a 
                    href="#services"
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('services');
                    }}
                >
                    {t('nav.services')}
                </a>
                <a 
                    href="#/news"
                    onClick={handleNewsClick}
                >
                    {t('nav.news')}
                </a>
                <a 
                    href="#contact"
                    onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('contact');
                    }}
                >
                    {t('nav.contact')}
                </a>
            </nav>
            <div className={styles['language-switcher']}>
                <select 
                    value={i18n.language}
                    onChange={changeLanguage}
                    className={styles['language-select']}
                >
                    <option value="zh-TW">中文</option>
                    <option value="en-US">English</option>
                    <option value="ja-JP">日本語</option>
                </select>
            </div>
        </header>
    )
}

export default memo(Header);