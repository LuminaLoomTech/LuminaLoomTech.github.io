import React from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import NewsPage from './pages/news/NewsPage';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
import { HashRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import SplashScreen from "./components/splashscreen/Splashscreen";
import Header from './components/header/Header';
import { useTranslation } from 'react-i18next';
import czLogo3 from './assets/images/CZ_LOGO3.png';

// 包一個 component 使用 useLocation
function AppRoutes() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // 當路由變化時處理 hash 滾動
  React.useEffect(() => {
    // 使用 window.location.hash 確保能讀取到最新的 hash
    const hash = window.location.hash.slice(1);
    
    // 如果有 hash 且不是在 /news 路由上，則嘗試滾動
    if (hash && hash !== '' && !location.pathname.includes('/news')) {
      // 給 MainPage 和動畫足夠的時間載入
      let attemptCount = 0;
      const maxAttempts = 25;
      
      const tryScroll = () => {
        const element = document.getElementById(hash);
        attemptCount++;
        
        if (element) {
          // 找到元素，滾動到它
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 200);
        } else if (attemptCount < maxAttempts) {
          // 繼續重試
          setTimeout(tryScroll, 200);
        }
      };
      
      // 先等待 500ms 確保所有組件都已渲染，然後開始嘗試
      setTimeout(tryScroll, 500);
    }
  }, [location.pathname, location.hash]);

  // 當路由變化時，自動滾動到頂部
  React.useEffect(() => {
    // 所有路由變化都滾動到頂部
    window.scrollTo({ top: 0, behavior: 'auto' });
    // 也可以設置一個延遲以確保完成
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const scrollToSection = (sectionId: string) => {
    // 如果不在主頁，先導航到主頁
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setSidebarOpen(false);
  };

  const menuItems = [
    { label: t('nav.home'), link: "#home", onClick: () => scrollToSection('home') },
    { label: t('nav.about'), link: "#about", onClick: () => scrollToSection('about') },
    { label: t('nav.services'), link: "#services", onClick: () => scrollToSection('services') },
    { label: t('nav.news'), link: "#/news", onClick: () => {
      // 關閉 Sidebar
      setSidebarOpen(false);
      
      // 立即滾動到頂部（不等待）
      window.scrollTo({ top: 0, behavior: 'auto' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      
      // 立即導航
      navigate('/news');
      
      // 持續確保滾動到頂部（對抗可能的干擾）
      const scrollIntervals = [0, 50, 100, 200, 400, 600, 800];
      scrollIntervals.forEach(delay => {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'auto' });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }, delay);
      });
    }},
    { label: t('nav.contact'), link: "#contact", onClick: () => scrollToSection('contact') }
  ];

  return (
    <>
      {/* Sidebar 全站顯示 */}
      <header>
        <Header 
          onMenuClick={handleMenuClick}
          isSidebarOpen={sidebarOpen}
          onScrollToSection={scrollToSection}
        />
      </header>
      <Sidebar 
        item={menuItems} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* 主要內容容器 */}
      <div className={`app-content ${sidebarOpen ? 'pushed' : ''}`}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/news" element={<NewsPage />} />
          {/* Catch-all：所有其他路由都重定向到主頁 */}
          <Route path="*" element={<MainPage />} />
        </Routes>
      </div>

      {/* 全站固定 Footer */}
      <Footer />
    </>
  );
}

function App() {
  const [showSplash, setShowSplash] = React.useState(true);

  // 設定 favicon
  React.useEffect(() => {
    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (link) {
      link.href = czLogo3;
    }
    const appleLink = document.querySelector("link[rel='apple-touch-icon']") as HTMLLinkElement;
    if (appleLink) {
      appleLink.href = czLogo3;
    }
  }, []);

  return (
    <HashRouter>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <AppRoutes />
      )}
    </HashRouter>
  );
}

export default App;
