import { useState, useEffect } from 'react';
import styles from './ContactSection.module.css';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { PhoneIcon, EmailIcon, LocationIcon, UserIcon, ClockIcon } from '../../../components/icons/ContactIcons';

export default function ContactSection() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [userIp, setUserIp] = useState('');

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setUserIp(data.ip))
      .catch(() => setUserIp('無法取得'));
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

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
      source_page: 'Main Page - Contact Section',
    };

    try {
      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      alert(`感謝您的聯絡，${name}！我們會儘快回覆您。`);
      setName('');
      setEmail('');
      setMessage('');
      setContactMethod('');
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert('❌ 發送失敗，請稍後再試或直接聯絡我們。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section 
      id="contact" 
      className={styles.contactSection}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={styles.contactContainer}>
        <motion.header 
          className={styles.contactHeader}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h1 className={styles.contactTitle}>{t('contact.title')}</h1>
          <p className={styles.contactSubtitle}>{t('contact.subtitle')}</p>
        </motion.header>

        <div className={styles.contactContent}>
          {/* 左側：公司聯絡資訊 */}
          <motion.div 
            className={styles.contactInfo}
            initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h2>{t('contact.ourInfo')}</h2>
            
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <PhoneIcon size={32} />
              </div>
              <div>
                <h3>{t('contact.phone')}</h3>
                <p>{t('contact.phoneNumber')}</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <EmailIcon size={32} />
              </div>
              <div>
                <h3>{t('contact.email')}</h3>
                <p>{t('contact.emailAddress')}</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <LocationIcon size={32} />
              </div>
              <div>
                <h3>{t('contact.address')}</h3>
                <p>{t('contact.addressDetail')}</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <UserIcon size={32} />
              </div>
              <div>
                <h3>{t('contact.manager')}</h3>
                <p>{t('contact.managerName')}</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <ClockIcon size={32} />
              </div>
              <div>
                <h3>{t('contact.serviceHours')}</h3>
                <p>{t('contact.serviceHoursDetail')}</p>
              </div>
            </div>

            <div className={styles.departmentInfo}>
              <div className={styles.deptItem}>
                <h4>{t('contact.software')}</h4>
                <p>{t('contact.softwareManager')}</p>
              </div>
              <div className={styles.deptItem}>
                <h4>{t('contact.game')}</h4>
                <p>{t('contact.gameManager')}</p>
              </div>
            </div>
          </motion.div>

          {/* 右側：客戶填寫表單 */}
          <motion.form 
            className={styles.contactForm} 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h2>{t('contact.formTitle')}</h2>

            <div className={styles.formGroup}>
              <label htmlFor="name">{t('contact.name')} *</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder={t('contact.namePlaceholder')}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">{t('contact.emailLabel')} *</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={t('contact.emailPlaceholder')}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contactMethod">{t('contact.phone2')}</label>
              <input
                type="text"
                id="contactMethod"
                value={contactMethod}
                onChange={(e) => setContactMethod(e.target.value)}
                placeholder={t('contact.phonePlaceholder')}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">{t('contact.message')} *</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={6}
                placeholder={t('contact.messagePlaceholder')}
              />
            </div>

            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? t('contact.sending') : t('contact.send')}
            </button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
}
