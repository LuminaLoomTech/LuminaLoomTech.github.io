import { useEffect, useState } from 'react';
import { Settings2, ShieldCheck, X } from 'lucide-react';
import styles from './CookieConsent.module.css';

const COOKIE_KEY = 'llt-cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(COOKIE_KEY);
    setVisible(!saved);
  }, []);

  const saveConsent = (value: 'accepted' | 'necessary') => {
    window.localStorage.setItem(COOKIE_KEY, value);
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <aside className={styles.cookiePanel} aria-label="Cookie 設定">
      <div className={styles.panelGlow} aria-hidden="true" />
      <div className={styles.panelHeader}>
        <div className={styles.iconWrap}>
          <ShieldCheck size={20} strokeWidth={1.8} />
        </div>
        <div>
          <span>Privacy</span>
          <h2>Cookie 設定</h2>
        </div>
        <button type="button" className={styles.closeButton} onClick={() => saveConsent('necessary')} aria-label="關閉">
          <X size={18} />
        </button>
      </div>

      <p>
        我們使用必要 Cookie 維持網站功能，並可能使用分析技術改善內容與服務體驗。
      </p>

      {showDetail && (
        <div className={styles.detailBox}>
          <strong>必要 Cookie</strong>
          <span>用於記住偏好設定與維持網站基本運作</span>
          <strong>分析 Cookie</strong>
          <span>用於了解頁面使用狀況並改善網站內容</span>
        </div>
      )}

      <div className={styles.actions}>
        <button type="button" className={styles.primaryButton} onClick={() => saveConsent('accepted')}>
          接受
        </button>
        <button type="button" className={styles.secondaryButton} onClick={() => saveConsent('necessary')}>
          僅必要
        </button>
        <button type="button" className={styles.textButton} onClick={() => setShowDetail((current) => !current)}>
          <Settings2 size={16} />
          設定
        </button>
      </div>
    </aside>
  );
}
