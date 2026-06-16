import { FormEvent, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  BadgeCheck,
  Building2,
  CheckCircle2,
  CreditCard,
  Landmark,
  LockKeyhole,
  ReceiptText,
  Send,
  WalletCards,
} from 'lucide-react';
import styles from './ShopPage.module.css';
import { businessSystems, checkoutAssurances, pricingPlans } from '../../data/enterpriseProducts';

type PaymentMethod = 'card' | 'transfer';

const userRanges = ['1-10 人', '11-50 人', '51-100 人', '101 人以上'];
const timelineOptions = ['立即導入', '1 個月內', '1-3 個月', '先詢問規劃'];

export default function ShopPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const initialPlan = query.get('plan') || 'growth';
  const [selectedPlanId, setSelectedPlanId] = useState(
    pricingPlans.some((plan) => plan.id === initialPlan) ? initialPlan : 'growth',
  );
  const [selectedSystemIds, setSelectedSystemIds] = useState<string[]>(['project-management', 'workflow']);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [submitted, setSubmitted] = useState(false);

  const selectedPlan = useMemo(
    () => pricingPlans.find((plan) => plan.id === selectedPlanId) || pricingPlans[1],
    [selectedPlanId],
  );

  const selectedSystems = useMemo(
    () => businessSystems.filter((system) => selectedSystemIds.includes(system.id)),
    [selectedSystemIds],
  );

  const toggleSystem = (systemId: string) => {
    setSelectedSystemIds((current) => {
      if (current.includes(systemId)) {
        return current.filter((id) => id !== systemId);
      }

      return [...current, systemId];
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className={styles.shopPage}>
      <section id="shop-overview" className={styles.hero}>
        <div className={styles.heroInner}>
          <button type="button" className={styles.backButton} onClick={() => navigate('/products')}>
            <ArrowLeft size={16} />
            回產品頁
          </button>
          <span className={styles.eyebrow}>Purchase Portal</span>
          <h1>購買方案</h1>
          <p>
            選擇適合的產品方案與付款方式。刷卡流程以導向第三方金流頁為前提設計，銀行匯款則由專人確認訂單後提供匯款資訊。
          </p>
        </div>
      </section>

      <section className={styles.assuranceBand}>
        {checkoutAssurances.map((item) => {
          const Icon = item.icon;

          return (
            <article key={item.title} className={styles.assuranceItem}>
              <Icon size={22} strokeWidth={1.8} />
              <div>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </div>
            </article>
          );
        })}
      </section>

      <section className={styles.shopLayout}>
        <div className={styles.catalogColumn}>
          <div id="shop-plans" className={styles.sectionHeader}>
            <span className={styles.eyebrow}>Products</span>
            <h2>選擇方案</h2>
            <p>企業系統會依模組與導入範圍確認後開通；此頁先作為方案購買、付款與需求收集入口。</p>
          </div>

          <div className={styles.planGrid}>
            {pricingPlans.map((plan) => {
              const active = plan.id === selectedPlanId;

              return (
                <button
                  key={plan.id}
                  type="button"
                  className={`${styles.planCard} ${active ? styles.planCardActive : ''}`}
                  onClick={() => setSelectedPlanId(plan.id)}
                  aria-pressed={active}
                >
                  {plan.featured && <span className={styles.badge}>推薦</span>}
                  <div className={styles.planTitleRow}>
                    <h3>{plan.name}</h3>
                    {active && <CheckCircle2 size={20} />}
                  </div>
                  <p>{plan.description}</p>
                  <strong>{plan.price}</strong>
                  <span>{plan.period}</span>
                </button>
              );
            })}
          </div>

          <div id="shop-systems" className={styles.methodPanel}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Business Systems</span>
              <h2>挑選系統</h2>
              <p>可以先選一個單模組，也可以勾選多個模組組成整合方案。正式報價會依模組數、使用人數與導入範圍確認。</p>
            </div>

            <div className={styles.systemGrid}>
              {businessSystems.map((system) => {
                const Icon = system.icon;
                const active = selectedSystemIds.includes(system.id);

                return (
                  <button
                    key={system.id}
                    type="button"
                    className={`${styles.systemCard} ${active ? styles.systemCardActive : ''}`}
                    onClick={() => toggleSystem(system.id)}
                    aria-pressed={active}
                  >
                    <div className={styles.systemTop}>
                      <div className={styles.systemIcon}>
                        <Icon size={20} strokeWidth={1.8} />
                      </div>
                      {active && <CheckCircle2 size={19} />}
                    </div>
                    <span className={styles.systemCategory}>{system.category}</span>
                    <h3>{system.name}</h3>
                    <p>{system.description}</p>
                    <div className={styles.systemMeta}>
                      <strong>{system.startingPrice}</strong>
                      <span>{system.recommendedFor}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div id="shop-payment" className={styles.methodPanel}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Payment</span>
              <h2>付款方式</h2>
            </div>

            <div className={styles.paymentOptions}>
              <button
                type="button"
                className={`${styles.paymentOption} ${paymentMethod === 'card' ? styles.paymentOptionActive : ''}`}
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard size={22} />
                <div>
                  <strong>信用卡 / 金融卡</strong>
                  <span>正式導入時串接第三方金流，不在本站保存卡號。</span>
                </div>
              </button>

              <button
                type="button"
                className={`${styles.paymentOption} ${paymentMethod === 'transfer' ? styles.paymentOptionActive : ''}`}
                onClick={() => setPaymentMethod('transfer')}
              >
                <Landmark size={22} />
                <div>
                  <strong>銀行匯款</strong>
                  <span>送出訂單後確認公司資料、方案與發票資訊，再提供匯款資料。</span>
                </div>
              </button>
            </div>

            <div className={styles.paymentNotice}>
              {paymentMethod === 'card' ? (
                <>
                  <LockKeyhole size={18} />
                  <p>刷卡付款建議串接綠界、藍新、Stripe 或其他第三方金流。正式付款頁不應由官網自行收集卡號。</p>
                </>
              ) : (
                <>
                  <ReceiptText size={18} />
                  <p>匯款訂單會先進入人工確認流程，可用於客製報價、開立發票與確認年度合約內容。</p>
                </>
              )}
            </div>
          </div>
        </div>

        <aside id="shop-checkout" className={styles.checkoutColumn}>
          <form className={styles.checkoutCard} onSubmit={handleSubmit}>
            <div className={styles.checkoutHeader}>
              <WalletCards size={24} />
              <div>
                <span>訂單摘要</span>
                <h2>{selectedPlan.name}</h2>
              </div>
            </div>

            <div className={styles.summaryBox}>
              <div>
                <span>方案費用</span>
                <strong>{selectedPlan.price}</strong>
              </div>
              <div>
                <span>付款週期</span>
                <strong>{selectedPlan.period}</strong>
              </div>
              <p>{selectedPlan.delivery}</p>
            </div>

            <div className={styles.selectedSystemsBox}>
              <div className={styles.selectedSystemsHeader}>
                <span>已選業務系統</span>
                <strong>{selectedSystems.length} 項</strong>
              </div>
              {selectedSystems.length > 0 ? (
                <div className={styles.selectedSystemList}>
                  {selectedSystems.map((system) => (
                    <span key={system.id}>{system.name}</span>
                  ))}
                </div>
              ) : (
                <p>尚未選擇業務系統。請至少選擇一個模組，方便我們確認導入範圍。</p>
              )}
            </div>

            <div className={styles.formGrid}>
              <label>
                公司名稱 *
                <input name="company" required placeholder="請輸入公司名稱" />
              </label>
              <label>
                統一編號
                <input name="taxId" placeholder="選填" />
              </label>
              <label>
                聯絡人 *
                <input name="contact" required placeholder="請輸入姓名" />
              </label>
              <label>
                Email *
                <input name="email" type="email" required placeholder="name@example.com" />
              </label>
              <label>
                電話 / LINE
                <input name="phone" placeholder="選填" />
              </label>
              <label>
                公司人數
                <select name="users" defaultValue="">
                  <option value="" disabled>
                    請選擇
                  </option>
                  {userRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                預計導入時間
                <select name="timeline" defaultValue="">
                  <option value="" disabled>
                    請選擇
                  </option>
                  {timelineOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.fullField}>
                想解決的流程
                <textarea name="message" rows={4} placeholder="例如：採購簽核、勞報付款、專案進度、會計報表..." />
              </label>
            </div>

            {selectedSystems.map((system) => (
              <input key={system.id} type="hidden" name="selectedSystems" value={system.name} />
            ))}

            <div className={styles.checkoutFooter}>
              <div className={styles.paymentSummary}>
                {paymentMethod === 'card' ? <CreditCard size={18} /> : <Building2 size={18} />}
                <span>{paymentMethod === 'card' ? '刷卡付款流程' : '銀行匯款流程'}</span>
              </div>
              <button type="submit" className={styles.submitButton}>
                <Send size={17} />
                {paymentMethod === 'card' ? '建立付款訂單' : '送出匯款訂單'}
              </button>
            </div>

            {submitted && (
              <div className={styles.successBox} role="status">
                <BadgeCheck size={20} />
                <p>
                  已建立前台訂購流程示意。正式上線時，這裡會串接後端訂單、Email 通知與金流付款連結。
                </p>
              </div>
            )}
          </form>
        </aside>
      </section>
    </main>
  );
}
