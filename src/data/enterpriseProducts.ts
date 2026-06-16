import {
  BadgeCheck,
  Blocks,
  BriefcaseBusiness,
  Building2,
  Calculator,
  ChartNoAxesCombined,
  ClipboardList,
  FileStack,
  Landmark,
  LayoutDashboard,
  PackageCheck,
  ReceiptText,
  ShieldCheck,
  ShoppingCart,
  Target,
  Users,
  Workflow,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ProductDomain = {
  title: string;
  description: string;
  modules: string[];
  icon: LucideIcon;
};

export type PricingPlan = {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  audience: string;
  includes: string[];
  delivery: string;
  cta: string;
  featured?: boolean;
  purchaseEnabled: boolean;
};

export type PlatformCapability = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type BusinessSystem = {
  id: string;
  name: string;
  category: string;
  description: string;
  startingPrice: string;
  recommendedFor: string;
  icon: LucideIcon;
};

export const productDomains: ProductDomain[] = [
  {
    title: 'PerfectAuto 自動化',
    description: '讓重複流程定時執行，例外才通知人處理。',
    modules: ['排程', '通知', '紀錄', '報表'],
    icon: Workflow,
  },
  {
    title: '營運與專案',
    description: '專案、勞報、契約與部門工作台。',
    modules: ['專案', '勞報', '契約', '部門'],
    icon: BriefcaseBusiness,
  },
  {
    title: '銷售與客戶',
    description: '客戶、報價、訂單、出貨與應收。',
    modules: ['客戶', '報價', '訂單', '應收'],
    icon: ShoppingCart,
  },
  {
    title: '採購與供應鏈',
    description: '請購、採購、驗收、供應商與庫存。',
    modules: ['請購', '採購', '驗收', '庫存'],
    icon: PackageCheck,
  },
  {
    title: '財會與資產',
    description: '傳票、總帳、出納、預算與資產。',
    modules: ['傳票', '總帳', '出納', '資產'],
    icon: Landmark,
  },
  {
    title: '人資與組織',
    description: '員工、部門、考勤、請假與薪資資料。',
    modules: ['員工', '部門', '考勤', '薪資'],
    icon: Users,
  },
  {
    title: '行政與協作',
    description: '公告、公文、會議、通訊與郵件整合。',
    modules: ['公告', '公文', '會議', '郵件'],
    icon: Building2,
  },
  {
    title: '平台共用能力',
    description: '共用工作流、報表、檔案、主檔與權限。',
    modules: ['審批', '報表', '檔案', '權限'],
    icon: Blocks,
  },
];

export const platformCapabilities: PlatformCapability[] = [
  {
    title: '流程排程',
    description: '固定時間自動執行。',
    icon: ClipboardList,
  },
  {
    title: '例外通知',
    description: '只有異常才打擾人。',
    icon: Workflow,
  },
  {
    title: '紀錄留存',
    description: '每次執行都可追蹤。',
    icon: ShieldCheck,
  },
  {
    title: '報表輸出',
    description: '結果整理成管理視角。',
    icon: FileStack,
  },
];

export const businessSystems: BusinessSystem[] = [
  {
    id: 'systemui',
    name: 'SystemUI 企業整合平台',
    category: '整合平台',
    description: '單一登入、權限、待辦、通知、公司設定與跨模組入口。',
    startingPrice: '多模組整合建議',
    recommendedFor: '採購兩套以上模組的公司',
    icon: LayoutDashboard,
  },
  {
    id: 'project-management',
    name: '專案管理系統',
    category: '營運與專案',
    description: '專案總覽、任務分配、進度追蹤、個人待辦與分析報表。',
    startingPrice: '單模組報價',
    recommendedFor: '專案型團隊、服務業、開發團隊',
    icon: BriefcaseBusiness,
  },
  {
    id: 'labor-payment',
    name: '勞務報酬單系統',
    category: '營運與專案',
    description: '勞報建立、送審、簽回、付款結案與年度申報資料整理。',
    startingPrice: '單模組報價',
    recommendedFor: '外包、接案、顧問與專案獎金流程',
    icon: ReceiptText,
  },
  {
    id: 'sales-management',
    name: '銷售管理系統',
    category: '銷售與客戶',
    description: '客戶、報價、銷售訂單、出貨、發票與應收流程。',
    startingPrice: '單模組報價',
    recommendedFor: '服務業、貿易業、B2B 銷售團隊',
    icon: ShoppingCart,
  },
  {
    id: 'procurement',
    name: '採購系統',
    category: '採購與供應鏈',
    description: '請購、採購、收貨驗收、供應商與審批流程管理。',
    startingPrice: '單模組報價',
    recommendedFor: '需要控管採購與驗收流程的公司',
    icon: PackageCheck,
  },
  {
    id: 'accounting',
    name: '會計系統',
    category: '財會與資產',
    description: '傳票、總帳、結帳中心、應收應付、銀行調節與財務報表。',
    startingPrice: '核心模組報價',
    recommendedFor: '需要完整財會基礎與報表的企業',
    icon: Calculator,
  },
  {
    id: 'human-resources',
    name: '人力資源管理系統',
    category: '人資與組織',
    description: '組織、員工、職位、考勤、請假、加班、招聘與薪資資料。',
    startingPrice: '核心模組報價',
    recommendedFor: '需要建立員工與組織主檔的公司',
    icon: Users,
  },
  {
    id: 'workflow',
    name: '工作流與審批中心',
    category: '平台能力',
    description: '費用、採購、請假、勞報等跨模組審批與通知設定。',
    startingPrice: '整合加購',
    recommendedFor: '需要簽核、追蹤與跨部門流程的公司',
    icon: Workflow,
  },
  {
    id: 'reporting-center',
    name: '跨系統報表中心',
    category: '平台能力',
    description: '彙整各模組數據，建立部門視角、管理視角與匯出查詢。',
    startingPrice: '整合加購',
    recommendedFor: '管理層需要即時掌握營運狀態',
    icon: ChartNoAxesCombined,
  },
  {
    id: 'strategy-management',
    name: '策略管理系統',
    category: '營運與專案',
    description: '將策略目標拆解成可追蹤的執行項目與專案目標。',
    startingPrice: '單模組報價',
    recommendedFor: '需要 OKR、策略追蹤與主管工作台',
    icon: Target,
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: 'single-module',
    name: '單模組導入',
    price: '依模組報價',
    period: '年費制',
    description: '先導入一個最需要改善的流程，例如勞報、專案、採購或會計。',
    audience: '已有明確單一痛點的團隊',
    includes: ['1 個核心流程', '上線諮詢與維護'],
    delivery: '適合 2-4 週內啟動試點',
    cta: '洽詢單模組',
    purchaseEnabled: true,
  },
  {
    id: 'growth',
    name: '成長型入門包',
    price: 'NT$90,000 起',
    period: '每年',
    description: '自動化與公司內部系統的入門整合方案，適合建立第一套可維護的營運平台。',
    audience: '10-50 人中小企業',
    includes: ['1-2 個自動化流程', '年度維護與版本更新'],
    delivery: '適合 4-8 週導入',
    cta: '購買入門包',
    featured: true,
    purchaseEnabled: true,
  },
  {
    id: 'operations',
    name: '營運整合包',
    price: '客製報價',
    period: '依需求評估',
    description: '串接銷售、採購、財會、人資與報表，建立跨部門協作流程。',
    audience: '需要多部門協作的企業',
    includes: ['跨部門流程整合', '報表中心與資料整合'],
    delivery: '依模組與串接範圍規劃',
    cta: '取得整合報價',
    purchaseEnabled: true,
  },
  {
    id: 'enterprise',
    name: '企業平台包',
    price: '客製報價',
    period: '年度合約',
    description: '面向長期平台化、進階權限、API 串接、資料移轉與客製報表的企業。',
    audience: '成長型與多部門企業',
    includes: ['API/既有系統串接', '專屬導入與維護窗口'],
    delivery: '依企業環境專案規劃',
    cta: '預約平台規劃',
    purchaseEnabled: true,
  },
];

export const implementationSteps = [
  '挑一個最耗人的流程',
  'Demo 與導入範圍確認',
  '上線、監控、持續優化',
];

export const trustSignals = [
  { label: '產品', value: 'PerfectAuto' },
  { label: '入門年費', value: '9 萬起' },
  { label: '導入方式', value: '先試點' },
  { label: '交付重點', value: '自動化' },
];

export const checkoutAssurances = [
  {
    title: '刷卡付款',
    description: '正式串接時導向第三方金流付款頁，本網站不保存卡號。',
    icon: BadgeCheck,
  },
  {
    title: '銀行匯款',
    description: '送出訂單後由專人確認方案與開立匯款資訊。',
    icon: ReceiptText,
  },
  {
    title: '先確認再開通',
    description: '企業系統需確認模組、使用人數與導入範圍後再正式啟用。',
    icon: ShieldCheck,
  },
];
