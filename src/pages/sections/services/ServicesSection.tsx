import styles from './ServicesSection.module.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  ClipboardList,
  Cloud,
  DatabaseZap,
  GitBranch,
  Layers3,
  MessageSquareMore,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type ServiceLink = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

const serviceLinks: ServiceLink[] = [
  {
    id: 'service-automation',
    title: '企業流程自動化',
    description: '重複輸入 表單處理 通知 報表 例行作業',
    icon: Workflow,
  },
  {
    id: 'service-internal-system',
    title: '內部系統導入',
    description: '權限 任務 文件 簽核 資料查詢',
    icon: Layers3,
  },
  {
    id: 'service-systemui',
    title: 'SystemUI 平台',
    description: '單一登入 待辦入口 主資料 跨模組流程',
    icon: BriefcaseBusiness,
  },
  {
    id: 'service-ai-assist',
    title: 'AI 資料整理',
    description: '文件摘要 知識檢索 內部問答 資訊歸納',
    icon: BrainCircuit,
  },
  {
    id: 'service-business-system',
    title: '業務系統導入',
    description: '專案 勞報 銷售 採購 會計 人資',
    icon: ClipboardList,
  },
  {
    id: 'service-integration',
    title: '客製串接維護',
    description: '資料移轉 API 串接 流程延伸 年度維護',
    icon: GitBranch,
  },
  {
    id: 'service-cloud',
    title: '雲端與部署',
    description: '系統上線 權限設定 備份 維運支援',
    icon: Cloud,
  },
  {
    id: 'service-data-report',
    title: '資料治理報表',
    description: '跨系統報表 權限稽核 主檔整合',
    icon: DatabaseZap,
  },
];

const deliverySteps = [
  { title: '盤點', description: '確認現有流程與人工斷點' },
  { title: '建議', description: '挑選優先導入的業務系統' },
  { title: '上線', description: '設定權限流程與資料基礎' },
  { title: '維護', description: '年度更新與後續模組擴充' },
];

export default function ServicesSection() {
  const navigate = useNavigate();

  const handleContactScroll = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.section
      id="services"
      className={styles.servicesSection}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.techGrid} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.serviceLayout}>
          <motion.div
            className={styles.serviceIntro}
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.42, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className={styles.eyebrow}>Services</span>
            <div className={styles.titleRow}>
              <h1>少一點人工作業</h1>
              <button
                type="button"
                className={styles.roundButton}
                onClick={() => navigate('/products')}
                aria-label="查看產品價目表"
              >
                <ArrowUpRight size={28} />
              </button>
            </div>
            <p>PerfectAuto 先處理重複流程，再把資料、通知與報表接回企業系統。</p>
            <div className={styles.tagRow} aria-label="服務重點">
              <span>自動執行</span>
              <span>例外通知</span>
              <span>紀錄留存</span>
            </div>
            <div className={styles.actionRow}>
              <button type="button" className={styles.primaryButton} onClick={handleContactScroll}>
                <MessageSquareMore size={18} />
                <span>業務諮詢</span>
              </button>
              <button type="button" className={styles.secondaryButton} onClick={() => navigate('/shop')}>
                <Bot size={18} />
                <span>挑選系統</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            className={styles.serviceMenu}
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.42, delay: 0.08, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.25 }}
          >
            {serviceLinks.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.button
                  id={service.id}
                  key={service.title}
                  type="button"
                  className={styles.serviceItem}
                  onClick={() => navigate(index < 5 ? '/shop' : '/products')}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.34, delay: index * 0.045, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.25 }}
                >
                  <span className={styles.itemIcon}>
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <span className={styles.itemText}>
                    <strong>{service.title}</strong>
                    <span>{service.description}</span>
                  </span>
                  <ArrowUpRight className={styles.itemArrow} size={20} />
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          id="service-delivery"
          className={styles.deliveryBand}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className={styles.bandHeader}>
            <ShieldCheck size={23} />
            <div>
              <span className={styles.eyebrow}>Delivery</span>
              <h2>導入流程</h2>
            </div>
          </div>
          <div className={styles.stepGrid}>
            {deliverySteps.map((step, index) => (
              <motion.article
                key={step.title}
                className={styles.stepCard}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, delay: index * 0.06, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <span>0{index + 1}</span>
                <strong>{step.title}</strong>
                <p>{step.description}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
