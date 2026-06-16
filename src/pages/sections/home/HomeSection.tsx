import { Fragment, useEffect, useState } from 'react';
import {
  Activity,
  ArrowRight,
  Bell,
  CheckCircle2,
  MessageSquareMore,
  Play,
  Workflow,
} from 'lucide-react';
import styles from './HomeSection.module.css';
import NewsSection from '../../../components/sections/NewsSection';
import ParticleBackground from '../../../styles/animation';
import { useTranslation } from 'react-i18next';
import bannerBgImage from '../../../assets/images/BANNER-final.webp';

export default function HomeSection() {
  const { t } = useTranslation();
  const [showParticle, setShowParticle] = useState(false);
  const [activeFlow, setActiveFlow] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowParticle(true);
    }, 450);

    return () => window.clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) {
      return;
    }

    const scrollContainer = document.querySelector('[class*="scrollContainer"]') as HTMLElement | null;
    if (scrollContainer) {
      const elementTop = element.getBoundingClientRect().top + scrollContainer.scrollTop;
      scrollContainer.scrollTo({
        top: elementTop - 60,
        behavior: 'smooth',
      });
      return;
    }

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const flowSteps = [
    {
      icon: Workflow,
      title: t('home.process1'),
      description: t('home.process1Desc'),
    },
    {
      icon: Play,
      title: t('home.process2'),
      description: t('home.process2Desc'),
    },
    {
      icon: MessageSquareMore,
      title: t('home.process3'),
      description: t('home.process3Desc'),
    },
  ];

  return (
    <section id="home" className={styles.homeSection}>
      <div
        className={styles.heroBackdrop}
        style={{ backgroundImage: `url(${bannerBgImage})` }}
        aria-hidden="true"
      />
      <div className={styles.heroShade} aria-hidden="true" />

      {showParticle && (
        <div className={styles.particleContainer}>
          <ParticleBackground preset="interactive" />
        </div>
      )}

      <div className={styles.heroShell}>
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>{t('home.eyebrow')}</span>
          <h1 className={styles.heroTitle}>
            {t('home.title')
              .split('\n')
              .map((line) => (
                <span key={line} className={styles.titleLine}>
                  {line}
                </span>
              ))}
          </h1>
          <p className={styles.heroSubtitle}>{t('home.subtitle')}</p>

          <div className={styles.heroActions}>
            <button
              type="button"
              className={styles.primaryAction}
              onClick={() => scrollToSection('contact')}
            >
              <span>{t('home.primaryAction')}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.visualFrame}>
            <div className={styles.mockupWindow} aria-label="PerfectAuto dashboard preview">
              <div className={styles.mockupTopbar}>
                <div className={styles.windowDots} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <strong>PerfectAuto</strong>
                <span className={styles.liveBadge}>Live</span>
              </div>

              <div className={styles.mockupBody}>
                <aside className={styles.mockupRail} aria-hidden="true">
                  <span className={styles.railActive} />
                  <span />
                  <span />
                  <span />
                </aside>

                <div className={styles.dashboardMain}>
                  <div className={styles.dashboardHeader}>
                    <div>
                      <span>{t('home.mockupLabel')}</span>
                      <strong>{t('home.mockupTitle')}</strong>
                    </div>
                    <div className={styles.statusPill}>
                      <Activity size={15} />
                      <span>{t('home.mockupStatus')}</span>
                    </div>
                  </div>

                  <div className={styles.automationCanvas} aria-hidden="true">
                    <div className={styles.orbitField}>
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className={styles.runList}>
                      <span><CheckCircle2 size={15} /> payroll-sync</span>
                      <span><Bell size={15} /> exception-alert</span>
                      <span><Activity size={15} /> report-export</span>
                    </div>
                  </div>

                  <div className={styles.flowPreview}>
                    {flowSteps.map((step, index) => {
                      const Icon = step.icon;

                      return (
                        <Fragment key={step.title}>
                          {index > 0 && <div className={styles.flowLine} aria-hidden="true" />}
                          <button
                            type="button"
                            className={`${styles.flowNode} ${activeFlow === index ? styles.flowNodeActive : ''}`}
                            onClick={() => setActiveFlow(index)}
                            aria-pressed={activeFlow === index}
                          >
                            <Icon size={18} />
                            <span>{step.title}</span>
                          </button>
                        </Fragment>
                      );
                    })}
                  </div>
                  <div className={styles.flowDetail} aria-live="polite">
                    <span>0{activeFlow + 1}</span>
                    <strong>{flowSteps[activeFlow].title}</strong>
                    <p>{flowSteps[activeFlow].description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewsSection />
    </section>
  );
}
