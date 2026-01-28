import React from 'react';
import './App.css';
import Home from './pages/home/Home';
import About from './pages/about/AboutPage';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
import ContactForm from './pages/contact/Contact';
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import SplashScreen from "./components/splashscreen/Splashscreen";
import Services from './pages/services/Services';
import Header from './components/header/Header';
import LoginPage from './pages/login/LoginPage';
import { useTranslation } from 'react-i18next';
import czLogo3 from './assets/images/CZ_LOGO3.png';

function NotReady() {
  return (
    <h1>此頁面尚未完成，敬請期待！</h1>
  );
}

// 包一個 component 使用 useLocation
function AppRoutes() {
  const location = useLocation();
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // 當路由改變時自動關閉 Sidebar（暫時註釋測試）
  // React.useEffect(() => {
  //   setSidebarOpen(false);
  // }, [location.pathname]);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    { label: t('nav.home'), link: "/" },
    { label: t('nav.about'), link: "/about" },
    { label: t('nav.services'), link: "/services" },
    { label: t('nav.contact'), link: "/contact" }
    // { label: t('nav.login'), link: "/login" }  // 暫時隱藏登入選項
  ];

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

      {/* 主要內容容器，避免被固定 Footer 蓋住 */}
      <div className={`app-content ${sidebarOpen ? 'pushed' : ''}`}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/login" element={<LoginPage />} />
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
