import React from 'react';
import './App.css';
import Home from './pages/home/Home';
import About from './pages/about/AboutPage';
import Sidebar from './components/sidebar/Sidebar';
import Footer from './components/footer/Footer';
import ContactForm from './pages/contact/Contact';
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";

function NotReady() {
  return (
    <h1>此頁面尚未完成，敬請期待！</h1>
  );
}

// 包一個 component 使用 useLocation
function AppRoutes() {
  const location = useLocation();

  const menuItems = [
    { label: "首頁", link: "/" },
    { label: "關於", link: "/about" },
    { label: "聯絡", link: "/contact" },
    { label: "登入", link: "/login" }
  ];

  return (
    <>
      {/* Sidebar 全站顯示 */}
      <Sidebar item={menuItems} />

      {/* 主要內容容器，避免被固定 Footer 蓋住 */}
      <div className="app-content">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<NotReady />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
      </div>

      {/* 全站固定 Footer */}
      <Footer />
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}

export default App;
