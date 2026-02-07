# LCP 優化執行計劃

## ✅ 已完成準備工作
- [x] 分析 LCP 問題根源
- [x] 建立備份記錄文件 ([LCP優化備份記錄_20260206.md](LCP優化備份記錄_20260206.md))
- [x] 建立實體備份檔案 (*.backup_20260206)
- [x] 建立一鍵回復腳本 ([回復原始檔案.ps1](回復原始檔案.ps1))

## 📋 待執行的優化步驟

### 🔷 階段一：圖片優化 (預估改善: 2-3秒)
**目標**: 將 BANNER 圖片從 556KB 壓縮至 100-150KB

- [ ] 使用 compress-images-v2.js 壓縮圖片
  - 生成高品質 WebP (品質 75-80)
  - 目標檔案大小: < 150KB
  - 保持視覺品質

- [ ] 將優化後的圖片複製到 public/ 資料夾
  - 確保預載入標籤可以找到圖片
  - 同時保留 src/assets/images/ 的版本

**預期效果**: LCP 從 7.3秒 → 約 5秒

---

### 🔷 階段二：HTML 預載入優化 (預估改善: 0.5-1秒)
**目標**: 確保瀏覽器優先載入 LCP 圖片

修改 [public/index.html](public/index.html):
```html
<!-- 當前 (第 29-30 行) -->
<link rel="preload" as="image" href="%PUBLIC_URL%/BANNER.webp" type="image/webp" />
<link rel="preload" as="image" href="%PUBLIC_URL%/BANNER-optimized.png" type="image/png" />

<!-- 優化後 -->
<link rel="preload" as="image" href="%PUBLIC_URL%/BANNER-optimized.webp" 
      type="image/webp" fetchpriority="high" />
```

**變更內容**:
- 更新檔案名稱至優化後的版本
- 添加 `fetchpriority="high"` 屬性
- 移除不必要的 PNG 回退 (現代瀏覽器都支援 WebP)

**預期效果**: LCP 從 5秒 → 約 4秒

---

### 🔷 階段三：結構優化 - 改用 `<img>` 標籤 (預估改善: 1-1.5秒)
**目標**: 將背景從 CSS 改為 HTML `<img>`，提高載入優先級

#### 修改 1: Banner.tsx
**位置**: [src/components/banner/Banner.tsx](src/components/banner/Banner.tsx) 第 65-72 行

```tsx
{/* 當前代碼 */}
{backgroundImage && (
  <div
    className={styles.bannerBackground}
    style={{ backgroundImage: `url(${backgroundImage})` }}
  />
)}

{/* 優化後代碼 */}
{backgroundImage && (
  <img
    src={backgroundImage}
    alt="Banner Background"
    className={styles.bannerBackground}
    loading="eager"
    fetchPriority="high"
    decoding="sync"
  />
)}
```

#### 修改 2: Banner.module.css
**位置**: [src/components/banner/Banner.module.css](src/components/banner/Banner.module.css) 第 16-31 行

```css
/* 當前樣式 */
.bannerBackground {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 100vw;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 1;
    pointer-events: none;
    opacity: 0;
    animation: fadeInBackground 0.3s ease-in-out forwards;
}

/* 優化後樣式 */
.bannerBackground {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 100vw;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 1;
    pointer-events: none;
    opacity: 0;
    animation: fadeInBackground 0.3s ease-in-out forwards;
}
```

**關鍵變更**:
- `background-size: cover` → `object-fit: cover`
- `background-position: center` → `object-position: center`
- 移除 `background-repeat`

**預期效果**: LCP 從 4秒 → 約 2.5-3秒

---

### 🔷 階段四：靜態導入優化 (預估改善: 0.3-0.5秒)
**目標**: 消除動態 require()，讓 Webpack 在構建時就處理圖片

#### 修改: HomeSection.tsx
**位置**: [src/pages/sections/home/HomeSection.tsx](src/pages/sections/home/HomeSection.tsx) 第 49-61 行

```tsx
{/* 當前代碼 - 動態載入 */}
const getBackgroundImage = () => {
  if (i18n.exists('home.bannerBackground')) {
    const imageName = t('home.bannerBackground');
    try {
      return require(`../../../assets/images/${imageName}`);
    } catch (error) {
      console.warn(`背景圖片載入失敗: ${imageName}`);
      return undefined;
    }
  }
  return undefined;
};
const backgroundImage = getBackgroundImage();

{/* 優化後代碼 - 靜態導入 */}
import bannerBgImage from '../../../assets/images/BANNER-optimized.webp';
// ... 在元件中直接使用
const backgroundImage = bannerBgImage;
```

**變更原因**:
- 靜態導入讓 Webpack 在構建時就處理圖片
- 瀏覽器可以更早發現和下載圖片資源
- 減少運行時的動態計算

**預期效果**: LCP 從 2.5-3秒 → 約 2秒或以下 ✅

---

## 🎯 預期最終效果

| 階段 | 優化內容 | 預估 LCP |
|------|----------|----------|
| **原始** | 無優化 | 7.30秒 🔴 |
| **階段一** | 圖片壓縮 | ~5秒 🟠 |
| **階段二** | HTML 預載入 | ~4秒 🟠 |
| **階段三** | 使用 `<img>` 標籤 | ~2.5-3秒 🟡 |
| **階段四** | 靜態導入 | **~2秒** 🟢 |

**目標達成**: LCP < 2.5秒 ✅

---

## ⚠️ 風險評估與回復計畫

### 低風險變更
- ✅ 階段一 (圖片壓縮): 只更換圖片檔案，不影響代碼
- ✅ 階段二 (HTML 預載入): 只修改一行 HTML，影響範圍小

### 中風險變更
- ⚠️ 階段三 (改用 `<img>`): 改變 DOM 結構，需要測試視覺效果
- ⚠️ 階段四 (靜態導入): 改變模組載入方式，需要測試多語言功能

### 回復方式
1. **立即回復**: 執行 `.\回復原始檔案.ps1`
2. **手動回復**: 從 `*.backup_20260206` 檔案複製
3. **Git 回復**: `git checkout <檔案路徑>`

---

## 📝 執行步驟

### 建議的執行順序
1. 先執行階段一和二 (低風險，快速見效)
2. 測試網站功能正常
3. 再執行階段三和四 (需要仔細測試)

### 每個階段後的檢查清單
- [ ] 網站可正常開啟
- [ ] Banner 輪播功能正常
- [ ] 圖片顯示正確
- [ ] 多語言切換正常
- [ ] 手機版顯示正常
- [ ] 測量 LCP 數值

---

## 🚀 準備開始

**所有備份已就緒！可以隨時開始優化或回復。**

請選擇：
1. 一次執行全部優化 (最快，但需完整測試)
2. 逐步執行，每階段確認後再繼續 (穩健)
3. 先執行低風險變更 (階段一、二)
