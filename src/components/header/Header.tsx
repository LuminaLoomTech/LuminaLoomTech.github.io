import logo from '../../assets/images/CZ_LOGO3.png';
import styles from './Header.module.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import sidebarStyles from '../sidebar/Sidebar.module.scss';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Globe2 } from 'lucide-react';

interface HeaderProps {
    onMenuClick?: () => void;
    isSidebarOpen?: boolean;
    onScrollToSection?: (sectionId: string) => void;
}

const Header = ({ onMenuClick, isSidebarOpen, onScrollToSection }: HeaderProps) => {
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [activeHomeSection, setActiveHomeSection] = useState<'about' | 'services' | 'contact' | null>(null);
    const languageRef = useRef<HTMLDivElement | null>(null);

    const languageOptions = [
        { value: 'zh-TW', label: '中文' },
        { value: 'en-US', label: 'EN' },
        { value: 'ja-JP', label: '日本語' },
    ];

    const currentLanguage = languageOptions.find((option) => option.value === i18n.language) || languageOptions[0];

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (!languageRef.current?.contains(event.target as Node)) {
                setIsLanguageOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    useEffect(() => {
        if (location.pathname !== '/') {
            setActiveHomeSection(null);
        }
    }, [location.pathname]);

    const getRouteNavClass = (target: 'products' | 'shop' | 'games' | 'news') => {
        const isActive = location.pathname === `/${target}`;

        return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;
    };

    const getHomeNavClass = (section: 'about' | 'services' | 'contact') => (
        location.pathname === '/' && activeHomeSection === section
            ? `${styles.navLink} ${styles.active}`
            : styles.navLink
    );

    const getHomeSectionGroup = (sectionId: string): 'about' | 'services' | 'contact' | null => {
        if (sectionId === 'about' || sectionId.startsWith('about-')) {
            return 'about';
        }

        if (sectionId === 'services' || sectionId.startsWith('service-')) {
            return 'services';
        }

        if (sectionId === 'contact' || sectionId.startsWith('contact-')) {
            return 'contact';
        }

        return null;
    };

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng);
        setIsLanguageOpen(false);
    };

    const scrollPageToTop = () => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    };

    const highlightTarget = (element: HTMLElement) => {
        element.classList.remove('section-focus-flash');
        window.setTimeout(() => {
            element.classList.add('section-focus-flash');
        }, 20);
        window.setTimeout(() => {
            element.classList.remove('section-focus-flash');
        }, 1700);
    };

    const scrollToTarget = (targetId: string, smooth = true) => {
        const element = document.getElementById(targetId);
        const scrollContainer = document.querySelector('[class*="scrollContainer"]') as HTMLElement | null;

        if (!element) {
            return false;
        }

        if (scrollContainer) {
            const elementTop = element.getBoundingClientRect().top + scrollContainer.scrollTop;
            scrollContainer.scrollTo({
                top: elementTop - 84,
                behavior: smooth ? 'smooth' : 'auto',
            });
        } else {
            element.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
        }

        highlightTarget(element);
        return true;
    };

    const scrollToTargetWhenReady = (targetId: string) => {
        let attempts = 0;
        const maxAttempts = 30;

        const tryScroll = () => {
            attempts += 1;
            if (scrollToTarget(targetId, true) || attempts >= maxAttempts) {
                return;
            }
            window.setTimeout(tryScroll, 120);
        };

        window.setTimeout(tryScroll, 80);
    };

    const goToHomeSection = (sectionId: string) => {
        setActiveHomeSection(getHomeSectionGroup(sectionId));

        if (location.pathname !== '/') {
            navigate('/');
            scrollToTargetWhenReady(sectionId);
            return;
        }

        scrollToTarget(sectionId);
    };

    const goToRoute = (path: string, targetId?: string) => {
        setActiveHomeSection(null);
        scrollPageToTop();
        navigate(path);

        if (targetId) {
            scrollToTargetWhenReady(targetId);
            return;
        }

        [50, 150, 300].forEach((delay) => {
            window.setTimeout(scrollPageToTop, delay);
        });
    };

    const handleNewsClick = (e: React.MouseEvent) => {
        e.preventDefault();
        goToRoute('/news');
    };

    const handleProductsClick = (e: React.MouseEvent) => {
        e.preventDefault();
        goToRoute('/products');
    };

    const handleShopClick = (e: React.MouseEvent) => {
        e.preventDefault();
        goToRoute('/shop');
    };

    const handleGamesClick = (e: React.MouseEvent) => {
        e.preventDefault();
        goToRoute('/games');
    };

    const scrollToSection = (sectionId: string) => {
        setActiveHomeSection(getHomeSectionGroup(sectionId));

        if (onScrollToSection) {
            onScrollToSection(sectionId);
            window.setTimeout(() => scrollToTarget(sectionId), 180);
        } else {
            // Fallback：如果沒有 prop，使用本地邏輯
            scrollToTarget(sectionId);
        }
    };

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (location.pathname !== '/') {
            navigate('/');
        } else {
            setActiveHomeSection(null);
            scrollToSection('home');
        }
    };

    const navItems = [
        {
            label: t('nav.about'),
            href: '#about',
            className: getHomeNavClass('about'),
            onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                scrollToSection('about');
            },
            children: [
                { label: '公司使命', description: '少子化缺工與效率管理', onClick: () => goToHomeSection('about-mission') },
                { label: '事業體', description: '企業軟體與遊戲事業', onClick: () => goToHomeSection('about-business') },
                { label: '組織架構', description: '三部門與扁平管理', onClick: () => goToHomeSection('about-team') },
            ],
        },
        {
            label: t('nav.services'),
            href: '#services',
            className: getHomeNavClass('services'),
            onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                scrollToSection('services');
            },
            children: [
                { label: '流程自動化', description: '整理重複作業與規則流程', onClick: () => goToHomeSection('service-automation') },
                { label: '內部系統', description: '資料 權限 表單與管理整合', onClick: () => goToHomeSection('service-internal-system') },
                { label: 'AI 協助', description: '資料整理與公司事務輔助', onClick: () => goToHomeSection('service-ai-assist') },
                { label: '導入支援', description: '需求盤點 上線與維護', onClick: () => goToHomeSection('service-delivery') },
            ],
        },
        {
            label: t('nav.products'),
            href: '#/products',
            className: getRouteNavClass('products'),
            onClick: handleProductsClick,
            children: [
                { label: '企業系統平台', description: '自動化與內部系統整合', onClick: () => goToRoute('/products', 'product-platform') },
                { label: '自動化系統', description: '大量電腦作業流程處理', onClick: () => goToRoute('/products', 'product-catalog') },
                { label: '管理模組', description: '人事 行政 採購 財務等模組', onClick: () => goToRoute('/products', 'product-catalog') },
                { label: '產品報價', description: '查看方案與起始價格', onClick: () => goToRoute('/products', 'product-pricing') },
            ],
        },
        {
            label: t('nav.shop'),
            href: '#/shop',
            className: getRouteNavClass('shop'),
            onClick: handleShopClick,
            children: [
                { label: '完整平台', description: '自動化加內部系統年約', onClick: () => goToRoute('/shop', 'shop-plans') },
                { label: '單模組選購', description: '挑選需要的業務系統', onClick: () => goToRoute('/shop', 'shop-systems') },
                { label: '刷卡付款', description: '預留第三方金流導入', onClick: () => goToRoute('/shop', 'shop-payment') },
                { label: '匯款購買', description: '送出訂單後人工對帳', onClick: () => goToRoute('/shop', 'shop-payment') },
            ],
        },
        {
            label: t('nav.games'),
            href: '#/games',
            className: getRouteNavClass('games'),
            onClick: handleGamesClick,
            children: [
                { label: '遊戲事業', description: '多類型獨立遊戲開發', onClick: () => goToRoute('/games', 'game-overview') },
                { label: '世界觀', description: '角色 場景 規則與故事', onClick: () => goToRoute('/games', 'game-world') },
                { label: '開發工具', description: '協助內容製作與迭代', onClick: () => goToRoute('/games', 'game-tools') },
                { label: 'Steam 導流', description: '作品頁公開後導向願望清單', onClick: () => goToRoute('/games', 'game-steam') },
            ],
        },
        {
            label: t('nav.news'),
            href: '#/news',
            className: getRouteNavClass('news'),
            onClick: handleNewsClick,
            children: [
                { label: '公司公告', description: '營運與網站更新', onClick: () => goToRoute('/news') },
                { label: '產品進度', description: '系統開發與測試紀錄', onClick: () => goToRoute('/news') },
                { label: '遊戲消息', description: '作品公開與開發近況', onClick: () => goToRoute('/news') },
            ],
        },
        {
            label: t('nav.contact'),
            href: '#contact',
            className: getHomeNavClass('contact'),
            onClick: (e: React.MouseEvent) => {
                e.preventDefault();
                scrollToSection('contact');
            },
            children: [
                { label: '業務洽詢', description: '企業系統與導入需求', onClick: () => goToHomeSection('contact-form') },
                { label: '遊戲合作', description: '作品與遊戲事業聯繫', onClick: () => goToHomeSection('contact-form') },
                { label: '聯絡資訊', description: 'Email 電話 地址與表單', onClick: () => goToHomeSection('contact-info') },
            ],
        },
    ];

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
                {navItems.map((item) => (
                    <div className={styles.navItem} key={item.label}>
                        <a
                            className={item.className}
                            href={item.href}
                            onClick={item.onClick}
                            aria-haspopup="true"
                        >
                            {item.label}
                        </a>
                        <div className={styles.dropdownPanel}>
                            <span className={styles.dropdownTitle}>{item.label}</span>
                            <div className={styles.dropdownList}>
                                {item.children.map((child) => (
                                    <button
                                        type="button"
                                        key={child.label}
                                        className={styles.dropdownButton}
                                        onClick={child.onClick}
                                    >
                                        <span>{child.label}</span>
                                        <small>{child.description}</small>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </nav>
            <div className={styles['language-switcher']} ref={languageRef}>
                <button
                    type="button"
                    className={styles.languageButton}
                    onClick={() => setIsLanguageOpen((open) => !open)}
                    aria-label="Change language"
                    aria-haspopup="listbox"
                    aria-expanded={isLanguageOpen}
                >
                    <Globe2 className={styles.languageIcon} size={20} aria-hidden="true" />
                    <span>{currentLanguage.label}</span>
                    <ChevronDown className={`${styles.languageChevron} ${isLanguageOpen ? styles.languageChevronOpen : ''}`} size={17} aria-hidden="true" />
                </button>

                {isLanguageOpen && (
                    <div className={styles.languageMenu} role="listbox" aria-label="Language options">
                        {languageOptions.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                className={`${styles.languageOption} ${option.value === i18n.language ? styles.languageOptionActive : ''}`}
                                onClick={() => changeLanguage(option.value)}
                                role="option"
                                aria-selected={option.value === i18n.language}
                            >
                                <span>{option.label}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </header>
    )
}
export default Header;
