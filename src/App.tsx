import React from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import NewsPage from './pages/news/NewsPage';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
import { HashRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import SplashScreen from "./components/splashscreen/Splashscreen";
import Header from './components/header/Header';
import LoginPage from './pages/login/LoginPage';
import { useTranslation } from 'react-i18next';
import czLogo3 from './assets/images/CZ_LOGO3.png';

// 包一個 component 使用 useLocation
function AppRoutes() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);

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
      navigate('/news');
      setTimeout(() => window.scrollTo(0, 0), 100);
      setSidebarOpen(false);
    }},
    { label: t('nav.contact'), link: "#contact", onClick: () => scrollToSection('contact') }
  ];

  if (showLogin) {
    return <LoginPage />;
  }

  return (
    <>
      {/* Sidebar 全站顯示 */}
      <header>
        <Header 
          onMenuClick={handleMenuClick}
          isSidebarOpen={sidebarOpen}
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
