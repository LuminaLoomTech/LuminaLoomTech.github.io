import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>聯絡資訊</h3>
          <p>Email: your.email@example.com</p>
          <p>電話: +886 912-345-678</p>
        </div>
        
        <div className="footer-section">
          <h3>社群媒體</h3>
          <div className="social-links">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>快速連結</h3>
          <div className="quick-links">
            <a href="/">首頁</a>
            <a href="/about">關於</a>
            <a href="/contact">聯絡</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} 公司. 版權所有.</p>
      </div>
    </footer>
  );
};

export default Footer;
