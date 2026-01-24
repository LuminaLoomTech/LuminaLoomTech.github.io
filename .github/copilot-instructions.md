# Copilot 指南 - 作品集專案

## 專案概述
這是一個為公司「希織科技」(Kiori Tech) 開發的 **React 19 + TypeScript 作品集網站**。使用 Create React App 建構，採用 CRACO 進行配置管理，並支援多語言功能 (zh-TW、en-US)。

**部署位置**：GitHub Pages (`homepage: https://jackwong-kiori.github.io/companyweb`)

## 架構設計

### 元件結構
- **Header** (`src/components/header/`): 固定導覽列，包含標誌、導覽連結、語言切換器
- **Sidebar** (`src/components/sidebar/`): 行動版漢堡選單
- **頁面**: 首頁、關於、服務、聯絡 (使用 React Router 搭配 `HashRouter`)
- **版面配置模式**: Header (固定) + Sidebar (行動版) + 頁面內容 + Footer (固定)

### 樣式方法
- **混合 CSS 格式**: 元件使用 SCSS 模組 (`.module.scss`) + 頁面使用純 CSS (`.css`)
- **使用 SCSS 模組的元件**: Header、Sidebar、Banner 採用 `module.scss` 搭配 CSS Modules
- **CSS Modules 模式**: 以 `styles` 物件導入，使用 `styles.className` (見 Header.tsx 第 2 行、Sidebar.tsx 第 5 行)
- **全域 CSS**: App.css、index.css 用於根元素樣式
- **動畫**: CSS Keyframes 在 SCSS 中定義 (例如：Header.module.scss 中的 `@keyframes flow`)

### i18n 實現
- **套件**: i18next + react-i18next
- **配置**: `src/i18n/index.ts` 從 `src/i18n/locales/` 載入語言檔案 (zh-TW.json、en-US.json)
- **儲存**: 語言偏好儲存在 localStorage 中，鍵名為 `'language'`
- **預設值**: 回退至 zh-TW
- **使用方式**: 元件中使用 `const { i18n, t } = useTranslation()`，以 `t('key.path')` 進行翻譯
- **語言切換**: 更新 localStorage 並呼叫 `i18n.changeLanguage(lng)`

### 動畫系統 (Framer Motion)
- **工具**: `src/utils/animations/motionPresets.ts` 匯出可重用的動畫物件
- **主要函式**:
  - `fadeIn(direction, offset, duration, delay)` - 方向性淡入動畫
  - `fadeOut(direction, offset, duration, delay)` - 退出動畫
  - `fadeNormal`、`fadeLast`、`scaleIn` - 預設動畫
- **展開模式**: `<motion.div {...fadeIn('left', 50, 0.8, 0.2)} />`
- **退出過渡**: 最後元素使用 `fadeLast` 實現緩慢淡出 (2 秒持續時間)

### 路由
- 使用 `HashRouter` (而非 BrowserRouter) 以相容 GitHub Pages
- 路由在 App.tsx 的 `AppRoutes()` 元件中定義
- 選單項目作為設定陣列在 AppRoutes 中管理
- 活躍連結高亮在 Header 樣式中內建

## 開發工作流

### 可用命令
- `npm start` - 透過 CRACO 啟動開發伺服器 (埠 3000)
- `npm run build` - 透過 CRACO 進行生產構建
- `npm test` - 執行測試
- `npm run deploy` - 部署至 GitHub Pages (執行構建 + gh-pages)

### 路徑別名
- **別名**: `@/` → `src/` (在 tsconfig.json + craco.config.js 中配置)
- **導入使用**: `import { fadeIn } from '@/utils/animations/motionPresets'`

## 關鍵模式與慣例

### 元件結構
1. **函式元件**搭配 Hooks (useState、useTranslation)
2. **使用 TypeScript 介面定義 Props** (例如：`SidebarProps` 介面)
3. **CSS 模組導入方式**: `import styles from './Component.module.scss'`
4. **套用 CSS 類別**: `className={styles.className}` 或 `className={`${styles.class1} ${styles.class2}`}`

### SCSS 中的字串插值
- 來自 Header.module.scss 的範例：`[${axis}]: value` 模式用於動畫預設中的動態軸選擇

### 條件式類別處理
- 模式: `className={`${styles.base} ${condition ? styles.open : ''}`}`
- 範例: Sidebar 切換狀態 (開啟/關閉) 透過類別名稱變更實現

### 狀態管理
- **本地元件狀態**透過 useState (目前無 Redux/Context API)
- **全域持久化**: 語言偏好儲存在 localStorage
- **頁面層級狀態**: 首頁管理 `introActive` 狀態以控制橫幅位置

## 整合點

### 外部依賴
- **framer-motion** (v12.23.12): 動畫套件
- **i18next** + **react-i18next**: 國際化
- **react-router-dom** (v7.7.1): 搭配 HashRouter 的客戶端路由
- **@emailjs/browser**: 郵件發送 (在 package.json 中導入，可能用於聯絡表單)
- **nodemailer**: 伺服器端郵件 (在依賴中引用)
- **sass**: SCSS 預處理器
- **react-helmet**: 文件頭管理 (在 package.json 中導入)

### 聯絡表單
- 位置: `src/pages/contact/Contact.tsx`
- 使用 EmailJS + Nodemailer 進行表單提交
- 多步驟流程的一部分：使用者填寫表單 → 透過郵件服務提交

## 資產管理
- **圖片**: 存放在 `src/assets/images/`
- **圖片導入**: 直接導入模式 (例如：`import czLogo3 from './assets/images/CZ_LOGO3.png'`)
- **TypeScript 支援**: `src/@types/images.d.ts` 為靜態導入提供型別定義

## 重要檔案
- `src/App.tsx` - 主要路由設置、頁面路由、版面結構
- `src/i18n/index.ts` - i18n 配置
- `src/components/header/Header.module.scss` - Header 樣式 (包含動畫漸層文字)
- `src/utils/animations/motionPresets.ts` - 可重用的動畫定義
- `craco.config.js` - @ 路徑的 Webpack 別名
- `tsconfig.json` - 路徑映射和嚴格模式設定

## 部署備註
- Homepage URL 表示部署至 GitHub Pages
- 使用 `HashRouter` 而非 BrowserRouter (gh-pages 的必要條件)
- 預部署指令在部署前執行構建
- 構建成品存放在 `/build` 目錄
