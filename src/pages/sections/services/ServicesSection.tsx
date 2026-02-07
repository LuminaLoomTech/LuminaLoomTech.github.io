import styles from './ServicesSection.module.css';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function ServicesSection() {
  const { t } = useTranslation();

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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <header className={styles.servicesHeader}>
        <h1 className={styles.servicesTitle}>{t('services.title')}</h1>
        <p>{t('services.subtitle')}</p>
      </header>

      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <motion.div 
            key={service.title} 
            className={styles.serviceCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true, amount: 0.3 }}
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
