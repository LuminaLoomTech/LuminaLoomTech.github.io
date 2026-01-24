import React, { useState, useEffect } from 'react';
import styles from './Contact.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '@/utils/animations/motionPresets';
import Header from "../../components/header/Header";
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [userIp, setUserIp] = useState('');

  // ⚠️ 僅測試用：正式站建議移除，改由後端取得
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setUserIp(data.ip))
      .catch(() => setUserIp('無法取得'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    // 基本防濫用與驗證
    if (!email.includes('@')) {
      alert('請輸入正確的 Email');
      return;
    }

    if (message.length > 1000) {
      alert('訊息過長，請縮短至 1000 字以內');
      return;
    }

    setLoading(true);

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || '';
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '';
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '';

    if (!serviceId || !templateId || !publicKey) {
      alert('系統設定錯誤，請聯絡管理員');
      setLoading(false);
      return;
    }

    const templateParams = {
      name,
      email,
      phone: contactMethod || '未提供',
      message,
      timestamp: new Date().toLocaleString('zh-TW'),
      user_ip: userIp || '未提供',
      source_page: 'Contact Page',
    };

    try {
      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      alert(`感謝您的聯絡，${name}！我們會儘快回覆您。`);

      // 清空表單
      setName('');
      setEmail('');
      setMessage('');
      setContactMethod('');
    } catch (error) {
      console.error('EmailJS 發送失敗', error);
      alert('送出失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
    <Header />
    <motion.div className={styles.spacer} {...fadeIn('up', 20, 0.6, 0.1)}>
      <div className={styles.info}>
        <h2 className={styles.title}>{t('contact.title')}</h2>
          <p>{t('contact.phone')}</p>
          <p>{t('contact.email')}</p>
          <p>{t('contact.address')}</p>
          <p>{t('contact.manager')}</p>
          <p>{t('contact.serviceHours')}</p>
          <br />
          <p>{t('contact.software')}</p>
          <p>{t('contact.softwareManager')}</p>
          <br />
          <p>{t('contact.game')}</p>
          <p>負責人:Yumeki</p>
      </div>
      <div className={styles.wrapper}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>{t('contact.formTitle')}</h2>

            <div className={styles.field}>
              <label className={styles.label}>{t('contact.name')}</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className={styles.input}
                placeholder={t('contact.namePlaceholder')}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>{t('contact.emailLabel')}</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className={styles.input}
                placeholder={t('contact.emailPlaceholder')}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>{t('contact.message')}</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
                className={styles.textarea}
                rows={4}
                placeholder={t('contact.messagePlaceholder')}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>{t('contact.phone2')}</label>
              <input
                type="text"
                value={contactMethod}
                onChange={e => setContactMethod(e.target.value)}
                className={styles.input}
                placeholder={t('contact.phonePlaceholder')}
              />
            </div>

            <button
              type="submit"
              className={styles.button}
              disabled={loading}
            >
              {loading ? t('contact.submitting') : t('contact.submit')}
            </button>
          </form>
        </div>
      </motion.div>
    </>
  );
}