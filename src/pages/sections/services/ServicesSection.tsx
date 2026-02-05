import styles from './ServicesSection.module.css';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export default function ServicesSection() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const services = [
    {
      title: t('services.service1'),
      description: t('services.service1Desc'),
      icon: '🧩',
    },
    {
      title: t('services.service2'),
      description: t('services.service2Desc'),
      icon: '⚙️',
    },
    {
      title: t('services.service3'),
      description: t('services.service3Desc'),
      icon: '💻',
    },
    {
      title: t('services.service4'),
      description: t('services.service4Desc'),
      icon: '🔧',
    },
    {
      title: t('services.service5'),
      description: t('services.service5Desc'),
      icon: '📊',
    },
    {
      title: t('services.service6'),
      description: t('services.service6Desc'),
      icon: '🧠',
    },
  ];

  return (
    <motion.section 
      id="services" 
      className={styles.servicesSection}
      initial={{ opacity: 0, x: isMobile ? 0 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.header 
        className={styles.servicesHeader}
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h1 className={styles.servicesTitle}>{t('services.title')}</h1>
        <p>{t('services.subtitle')}</p>
      </motion.header>

      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <motion.div 
            key={service.title} 
            className={styles.serviceCard}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className={styles.serviceIcon}>{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
