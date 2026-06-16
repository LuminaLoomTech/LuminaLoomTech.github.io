import styles from './AboutSection.module.css';
import { motion } from 'framer-motion';
import {
  BadgeCheck,
  BriefcaseBusiness,
  Code2,
  Gamepad2,
  HeartHandshake,
  LayoutDashboard,
  Scale,
  Sparkles,
  UsersRound,
} from 'lucide-react';

const missionCards = [
  {
    title: '解決缺工',
    description: '把重複的公司事務交給系統，用自動化對抗少子化衝擊。',
    icon: UsersRound,
  },
  {
    title: '降低成本',
    description: '消除人工作業與錯誤修正，讓企業營運更輕量、更高效。',
    icon: LayoutDashboard,
  },
  {
    title: '讓工作更好',
    description: '讓人離開低價值重複作業，把時間留給判斷與創造。',
    icon: HeartHandshake,
  },
];

const businessUnits = [
  {
    title: '軟體設計事業',
    subtitle: '企業系統 / 自動化 / AI 輔助',
    description: '以 PerfectAuto 與 SystemUI，把流程、資料與權限織成可維護的企業系統。',
    focus: ['PerfectAuto', 'SystemUI', 'AI 輔助'],
    icon: BriefcaseBusiness,
  },
  {
    title: '遊戲設計事業',
    subtitle: '獨立遊戲 / 世界觀 / 開發工具',
    description: '用角色、玩法與世界觀，累積能走向國際市場的原創作品。',
    focus: ['獨立遊戲', '世界觀', '角色敘事'],
    icon: Gamepad2,
  },
];

const departments = [
  {
    name: '商業行政管理部',
    description: '營運、商務協調與跨部門資源調度。',
    icon: Scale,
  },
  {
    name: '軟體設計部',
    description: '自動化架構、SystemUI 平台與產品迭代。',
    icon: Code2,
  },
  {
    name: '遊戲設計部',
    description: '玩法、角色、世界觀與作品內容規劃。',
    icon: Gamepad2,
  },
];

export default function AboutSection() {
  return (
    <motion.section
      id="about"
      className={styles.aboutSection}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className={styles.container}>
        <header className={styles.heroGrid}>
          <motion.div
            className={styles.heroCopy}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className={styles.eyebrow}>About Us</span>
            <h1>
              <span>以數位織線</span>
              <span>交織企業效率與遊戲創意</span>
            </h1>
            <p>希織科技一手打造企業自動化產品  一手累積原創遊戲作品。</p>
          </motion.div>

          <motion.aside
            className={styles.loomPanel}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className={styles.loomGraph} aria-label="希織科技雙軸事業圖">
              <div className={`${styles.loomNode} ${styles.softwareNode}`}>
                <div className={styles.dashboardMini}>
                  <div className={styles.dashboardTop}>
                    <span />
                    <strong>PerfectAuto</strong>
                  </div>
                  <div className={styles.dashboardGrid}>
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </div>
              <div className={styles.coreNode}>
                <div className={styles.shuttleCore} aria-hidden="true">
                  <span />
                  <span />
                </div>
                <strong>Loom</strong>
              </div>
              <div className={`${styles.loomNode} ${styles.gameNode}`}>
                <div className={styles.gameSigil}>
                  <Gamepad2 size={28} />
                  <span>Original World</span>
                </div>
              </div>
              <span className={styles.softwareThread} />
              <span className={styles.gameThread} />
            </div>
            <div className={styles.loomCaption}>
              <span>Software</span>
              <strong>長期產品正在成形</strong>
              <span>Game Studio</span>
            </div>
          </motion.aside>

          <div className={styles.introDock} aria-label="希織科技互動式介紹">
            {businessUnits.map((unit) => {
              const Icon = unit.icon;

              return (
                <article key={unit.title} className={styles.introCard}>
                  <Icon size={22} strokeWidth={1.8} />
                  <strong>{unit.title}</strong>
                  <p>{unit.description}</p>
                </article>
              );
            })}
            <article className={styles.introCard}>
              <Sparkles size={22} strokeWidth={1.8} />
              <strong>數位織線</strong>
              <p>把效率與創意串成長期產品，而不是一次性的專案堆疊。</p>
            </article>
          </div>
        </header>

        <section id="about-mission" className={styles.missionSection}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className={styles.eyebrow}>Mission</span>
            <h2>為缺工時代設計系統</h2>
          </motion.div>

          <div className={styles.missionGrid}>
            {missionCards.map((item) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  className={styles.infoCard}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className={styles.cardIcon}>
                    <Icon size={23} strokeWidth={1.8} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section id="about-business" className={styles.unitSection}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className={styles.eyebrow}>Business</span>
            <h2>雙軸事業</h2>
          </motion.div>

          <div className={styles.unitGrid}>
            {businessUnits.map((unit) => {
              const Icon = unit.icon;

              return (
                <motion.article
                  key={unit.title}
                  className={styles.unitCard}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className={styles.unitTop}>
                    <Icon size={26} strokeWidth={1.8} />
                    <span>{unit.subtitle}</span>
                  </div>
                  <h3>{unit.title}</h3>
                  <p>{unit.description}</p>
                  <div className={styles.focusList}>
                    {unit.focus.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section id="about-team" className={styles.organizationSection}>
          <motion.div
            className={styles.orgIntro}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className={styles.eyebrow}>Team</span>
            <h2>三個部門</h2>
            <p>滑過卡片，看各部門如何把線織在一起。</p>
          </motion.div>

          <div className={styles.departmentGrid}>
            {departments.map((department) => {
              const Icon = department.icon;

              return (
                <motion.article
                key={department.name}
                className={styles.departmentCard}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Icon size={28} strokeWidth={1.8} />
                <h3>{department.name}</h3>
                <p>{department.description}</p>
              </motion.article>
              );
            })}
          </div>
        </section>

        <motion.section
          className={styles.promiseBand}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <div>
            <Sparkles size={25} />
            <h2>長期產品</h2>
            <p>對企業，降低營運負擔。對玩家，創造能被記住的世界。</p>
          </div>
          <div className={styles.promiseBadge}>
            <BadgeCheck size={20} />
            <span>開發中 / 持續成長</span>
          </div>
        </motion.section>
      </div>
    </motion.section>
  );
}
