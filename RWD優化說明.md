# RWD 響應式設計優化說明

## 📱 斷點設計

本專案採用以下斷點策略，確保在所有設備上都有良好的使用體驗：

### 斷點定義
- **超大螢幕**: > 1440px (桌面大螢幕、4K 顯示器)
- **標準桌面**: 1024px - 1440px (筆記型電腦、桌面顯示器)
- **平板**: 768px - 1024px (iPad、平板橫向)
- **手機**: 480px - 768px (大部分智慧型手機)
- **極小螢幕**: 375px - 480px (小型手機)
- **超小螢幕**: < 375px (舊款小型手機)

## 🎨 優化項目

### 1. Header (導覽列)
**檔案**: `src/components/header/Header.module.scss`

#### 改動內容：
- ✅ 新增超大螢幕 (> 1440px) 優化
  - Logo 和文字間距增加
  - 導覽項目間距擴大至 40px
  - Slogan 字體加大
  
- ✅ 手機版 (< 768px)
  - 隱藏導覽列和 Slogan
  - 縮小 Logo 尺寸
  - 語言選擇器優化
  
- ✅ 超小螢幕 (< 375px)
  - Logo 高度降至 24px
  - 公司名稱字體 12px
  - 語言選擇器寬度 60px

---

### 2. Sidebar (側邊選單)
**檔案**: `src/components/sidebar/Sidebar.module.scss`

#### 改動內容：
- ✅ 超大螢幕 (> 1440px): 寬度 280px
- ✅ 平板 (< 1024px): 寬度 220px
- ✅ 手機 (< 768px): 寬度 200px
- ✅ 極小螢幕 (< 480px): 寬度 180px
- ✅ 超小螢幕 (< 375px): 寬度 160px
  - 漢堡按鈕縮小至 32px
  - 選單項目字體 12px
  - 內距和行高優化

---

### 3. Home 首頁
**檔案**: `src/pages/home/Home.module.css`

#### 改動內容：
- ✅ 跑馬燈區塊 (marqueeSection)
  - 超大螢幕: 100px 高度，字體 2.4rem
  - 手機: 60px 高度，字體 1.3rem
  - 超小螢幕: 45px 高度，字體 0.95rem
  
- ✅ 標題和內容
  - 各斷點下的字體大小漸進調整
  - Welcome 區塊高度自適應
  - 內距和間距優化

---

### 4. Banner 輪播橫幅
**檔案**: `src/components/banner/Banner.module.css`

#### 改動內容：
- ✅ 圖片容器高度
  - 超大螢幕: 700px
  - 平板: 450px
  - 手機: 350px
  - 超小螢幕: 240px
  
- ✅ 控制按鈕
  - 尺寸隨螢幕大小調整 (50px → 26px)
  - 位置間距優化
  
- ✅ 橫幅文字
  - 字體大小: 2.6rem → 0.9rem
  - 內距和圓角自適應

---

### 5. About 關於頁面
**檔案**: `src/pages/about/About.module.css`

#### 改動內容：
- ✅ 容器 padding 調整
  - 超大螢幕: 80px 30px, 最大寬度 1400px
  - 手機: 40px 16px
  - 超小螢幕: 25px 10px
  
- ✅ 統計卡片 (quickStats)
  - 超小螢幕改為單欄顯示
  - 字體和間距優化
  
- ✅ 網格佈局
  - 超大螢幕: minmax(300px, 1fr)
  - 手機以下: 單欄佈局

---

### 6. Services 服務頁面
**檔案**: `src/pages/services/Services.module.css`

#### 改動內容：
- ✅ 服務卡片網格
  - 超大螢幕: minmax(320px, 1fr), 間距 36px
  - 平板: minmax(240px, 1fr), 間距 24px
  - 手機: 單欄, 間距 20px
  - 超小螢幕: 間距 14px
  
- ✅ 標題層級
  - H1: 44px → 24px
  - 卡片標題: 22px → 15px
  
- ✅ 圖示尺寸
  - iconImg: 70px → 50px

---

### 7. Contact 聯絡頁面
**檔案**: `src/pages/contact/Contact.module.css`

#### 改動內容：
- ✅ 表單區塊 (spacer)
  - 超大螢幕: 1600px 最大寬度, 50px padding
  - 手機: 改為單欄垂直排列
  - 超小螢幕: 16px 12px padding
  
- ✅ 表單元素
  - 輸入框字體: 17px → 12px
  - 按鈕高度自適應
  - textarea 最小高度: 100px → 90px

---

### 8. Footer 頁尾
**檔案**: `src/components/footer/Footer.css`

#### 改動內容：
- ✅ 網格佈局
  - 超大螢幕: minmax(280px, 1fr), 最大寬度 1400px
  - 手機: 單欄置中
  - 超小螢幕: 極致壓縮
  
- ✅ 社交連結
  - 手機版: 置中顯示, flex-wrap
  - 按鈕內距: 10px 14px → 4px 6px
  
- ✅ 版權資訊
  - 字體: 標準 → 9px (超小螢幕)

---

### 9. App 主容器
**檔案**: `src/App.css`

#### 改動內容：
- ✅ Sidebar 推擠效果
  - 超大螢幕: margin-left 280px
  - 平板: 220px
  - 手機: 200px
  - 超小螢幕: 160px
  
- ✅ Header 高度補償
  - 標準: padding-top 60px
  - 手機: 55px
  - 極小螢幕: 50px
  - 超小螢幕: 48px

---

## 🎯 設計原則

### 1. 漸進式縮小
從超大螢幕到超小螢幕，所有元素都按比例漸進縮小，確保視覺協調性。

### 2. 觸控友善
- 按鈕最小尺寸保持在 32px 以上
- 表單元素間距足夠，避免誤觸
- 連結和互動元素有足夠的點擊區域

### 3. 內容優先
- 小螢幕上隱藏次要資訊 (如 Slogan)
- 保留核心功能和導覽
- 單欄佈局確保內容可讀性

### 4. 效能考量
- 僅在需要時載入特定尺寸的樣式
- 使用 CSS 而非 JavaScript 進行響應式調整
- 媒體查詢從大到小排列，利用 CSS 層疊特性

---

## 📊 測試建議

建議在以下設備/尺寸進行測試：

### 桌面
- ✅ 1920x1080 (標準 Full HD)
- ✅ 2560x1440 (2K 顯示器)
- ✅ 3840x2160 (4K 顯示器)

### 平板
- ✅ iPad (768x1024)
- ✅ iPad Pro (1024x1366)

### 手機
- ✅ iPhone SE (375x667) - 最小主流尺寸
- ✅ iPhone 12/13 (390x844)
- ✅ iPhone 14 Pro Max (430x932)
- ✅ Samsung Galaxy S21 (360x800)

---

## 🔧 開發者提示

### 新增元件時的 RWD 檢查清單：
- [ ] 定義超大螢幕樣式 (> 1440px)
- [ ] 定義平板樣式 (< 1024px)
- [ ] 定義手機樣式 (< 768px)
- [ ] 定義極小螢幕樣式 (< 480px)
- [ ] 定義超小螢幕樣式 (< 375px)
- [ ] 測試橫向/直向切換
- [ ] 確認觸控區域大小
- [ ] 檢查文字可讀性
- [ ] 驗證圖片和媒體元素縮放

### CSS 組織建議：
```css
/* 基礎樣式 (桌面優先) */
.element { ... }

/* RWD 區塊 */
/* ========== RWD 響應式設計 ========== */

/* 超大螢幕 */
@media (min-width: 1441px) { ... }

/* 平板 */
@media (max-width: 1024px) { ... }

/* 手機 */
@media (max-width: 768px) { ... }

/* 極小螢幕 */
@media (max-width: 480px) { ... }

/* 超小螢幕 */
@media (max-width: 375px) { ... }
```

---

## 📈 後續優化建議

1. **圖片優化**: 考慮使用 `<picture>` 和 `srcset` 載入不同尺寸的圖片
2. **字體縮放**: 可考慮使用 `clamp()` 函數實現流暢的字體縮放
3. **容器查詢**: 未來可採用 CSS Container Queries 取代部分媒體查詢
4. **暗色模式**: 可擴展 RWD 設計，加入 `prefers-color-scheme` 支援

---

## ✅ 完成狀態

- ✅ Header.module.scss
- ✅ Sidebar.module.scss
- ✅ Home.module.css
- ✅ Banner.module.css
- ✅ About.module.css
- ✅ Services.module.css
- ✅ Contact.module.css
- ✅ Footer.css
- ✅ App.css

**所有頁面和元件已完成 RWD 優化！** 🎉
