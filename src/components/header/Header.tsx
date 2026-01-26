import logo from '../../assets/images/CZ_LOGO3.png';
import {Link} from 'react-router-dom';
import styles from './Header.module.scss';
import { useTranslation } from 'react-i18next';
import sidebarStyles from '../sidebar/Sidebar.module.scss';
import ParticleBackground from "./ParticleBackground";

interface HeaderProps {
    onMenuClick?: () => void;
    isSidebarOpen?: boolean;
}

const Header = ({ onMenuClick, isSidebarOpen }: HeaderProps) => {
    const { i18n, t } = useTranslation();

    const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const lng = e.target.value;
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
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
            <Link to="/" className={styles.logo}>
                <img src={logo} className={styles['logo-img']} alt="公司Logo" />
                <span className={styles['company-name']}>希織科技</span>
                <span className={styles.slogan}>{t('header.slogan')}</span>
            </Link>
            <nav className={styles.navbar}>
            <Link to="/about">{t('nav.about')}</Link>
            <Link to="/services">{t('nav.services')}</Link>
            <Link to="/contact">{t('nav.contact')}</Link>
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
export default Header;