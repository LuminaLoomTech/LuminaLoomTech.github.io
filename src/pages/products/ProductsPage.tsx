import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  MessageSquareMore,
  WalletCards,
} from 'lucide-react';
import styles from './ProductsPage.module.css';
import {
  implementationSteps,
  platformCapabilities,
  pricingPlans,
  productDomains,
  trustSignals,
} from '../../data/enterpriseProducts';

export default function ProductsPage() {
  const navigate = useNavigate();

  const goToShop = (planId?: string) => {
    navigate(planId ? `/shop?plan=${planId}` : '/shop');
  };

  const goToContact = () => {
    navigate('/');
    window.setTimeout(() => {
      const element = document.getElementById('contact');
      const scrollContainer = document.querySelector('[class*="scrollContainer"]') as HTMLElement | null;

      if (element && scrollContainer) {
        const elementTop = element.getBoundingClientRect().top + scrollContainer.scrollTop;
        scrollContainer.scrollTo({ top: elementTop - 60, behavior: 'smooth' });
      } else {
        element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  return (
    <motion.main
      className={styles.productsPage}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <section id="product-platform" className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>PerfectAuto</span>
            <h1>讓重複流程自己跑</h1>
            <p>自動執行、例外通知、紀錄留存。先從最耗人的流程開始。</p>

            <div className={styles.heroActions}>
              <button type="button" className={styles.primaryButton} onClick={() => goToShop('growth')}>
                <WalletCards size={18} />
                <span>查看購買方案</span>
              </button>
              <button type="button" className={styles.secondaryButton} onClick={goToContact}>
                <MessageSquareMore size={18} />
                <span>預約產品 Demo</span>
              </button>
            </div>
          </div>

          <div className={styles.heroPanel} aria-label="產品摘要">
            <div className={styles.panelHeader}>
              <span>Automation Product</span>
              <strong>PerfectAuto</strong>
            </div>
            <div className={styles.productShot}>
              <img
                src="/content-assets/perfectauto-dashboard.png"
                alt="PerfectAuto 後台系統截圖"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                }}
              />
              <div className={styles.productShotFallback}>
                <span>Upload slot</span>
                <strong>PerfectAuto Dashboard</strong>
                <p>後續可由 WebContro 上傳產品後台截圖替換。</p>
              </div>
            </div>
            <div className={styles.signalGrid}>
              {trustSignals.map((signal) => (
                <div key={signal.label} className={styles.signalCard}>
                  <span>{signal.label}</span>
                  <strong>{signal.value}</strong>
                </div>
              ))}
            </div>
            <div className={styles.panelNote}>
              <FileText size={18} />
              <p>正式費用依流程數量、執行頻率、資料來源與系統串接範圍評估。</p>
            </div>
          </div>
        </div>
      </section>

      <section id="product-catalog" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Product Catalog</span>
          <h2>能自動化的地方</h2>
          <p>少講規格，先看流程。</p>
        </div>

        <div className={styles.domainGrid}>
          {productDomains.map((domain) => {
            const Icon = domain.icon;

            return (
              <article key={domain.title} className={styles.domainCard}>
                <div className={styles.domainIcon}>
                  <Icon size={22} strokeWidth={1.8} />
                </div>
                <h3>{domain.title}</h3>
                <p>{domain.description}</p>
                <div className={styles.moduleList}>
                  {domain.modules.map((module) => (
                    <span key={module}>{module}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="product-capability" className={`${styles.section} ${styles.platformSection}`}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Platform Capability</span>
          <h2>PerfectAuto 核心能力</h2>
          <p>執行、監控、回報。</p>
        </div>

        <div className={styles.capabilityGrid}>
          {platformCapabilities.map((capability) => {
            const Icon = capability.icon;

            return (
              <article key={capability.title} className={styles.capabilityItem}>
                <Icon size={22} strokeWidth={1.8} />
                <div>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="product-pricing" className={styles.pricingSection}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Pricing</span>
          <h2>產品價目表</h2>
          <p>下列價格作為官網購買與洽詢入口。正式報價會依模組、使用人數、導入範圍與付款方式確認。</p>
        </div>

        <div className={styles.pricingGrid}>
          {pricingPlans.map((plan) => (
            <article
              key={plan.id}
              className={`${styles.priceCard} ${plan.featured ? styles.featuredCard : ''}`}
            >
              {plan.featured && <span className={styles.recommendBadge}>推薦入門</span>}
              <div className={styles.priceTop}>
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
              </div>
              <div className={styles.priceValue}>
                <strong>{plan.price}</strong>
                <span>{plan.period}</span>
              </div>
              <div className={styles.audience}>適合：{plan.audience}</div>
              <ul>
                {plan.includes.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={17} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button type="button" className={styles.planButton} onClick={() => goToShop(plan.id)}>
                <span>{plan.cta}</span>
                <ArrowRight size={16} />
              </button>
            </article>
          ))}
        </div>

      </section>

      <section id="product-implementation" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Implementation</span>
          <h2>導入流程</h2>
          <p>企業系統不是單純下單後立即開通，正式購買前會先確認導入範圍，避免買到不適合的模組。</p>
        </div>

        <div className={styles.stepList}>
          {implementationSteps.map((step, index) => (
            <div key={step} className={styles.stepItem}>
              <span>0{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="product-purchase" className={styles.finalCta}>
        <div>
          <span className={styles.eyebrow}>Purchase Ready</span>
          <h2>前往購買</h2>
          <p>選方案，留資料，安排 Demo。</p>
        </div>
        <button type="button" className={styles.primaryButton} onClick={() => goToShop()}>
          <WalletCards size={18} />
          <span>前往購買商城</span>
        </button>
      </section>
    </motion.main>
  );
}
