import Header from "../../components/header/Header";
import styles from './Services.module.css';
import { useTranslation } from 'react-i18next';

type Service = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export default function Services() {
  const { t } = useTranslation();

  const services: Service[] = [
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
    <section className={styles.services}>
      <Header />
      {/* Hero */}
      <header className={styles.header}>
        <h1 className={styles.title}>{t('services.title')}</h1>
        <p>
          {t('services.subtitle')}
        </p>
      </header>

      {/* Services Grid */}
      <div className={styles.grid}>
        {services.map((service) => (
          <div key={service.title} className={styles.card}>
            <div className={styles.icon}>{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
