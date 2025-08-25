# ![主畫面](public/icon128.png) Night Night 晚安公主殿下!

這是一款極簡 Chrome 暗黑模式切換擴充功能，支援一鍵切換任意網頁的暗黑/亮色主題，並以現代 app 風格滑軌開關呈現。

## 特色
- 一鍵切換暗黑/亮色模式，支援大多數網站
- 極簡滑軌開關 UI，動畫流暢，icon 動態切換
- 僅允許在 http/https/file 網頁切換，安全不報錯
- 支援自訂 icon，popup 視窗極致精巧

## 安裝與使用

### 1. 安裝依賴
```sh
npm install
```

### 2. 開發模式啟動
```sh
npm run dev
```

### 3. 打包生產版本
```sh
npm run build
```

### 4. 載入 Chrome 擴充功能
1. 進入 `chrome://extensions/`，開啟「開發人員模式」
2. 點擊「載入未封裝項目」，選擇 `dist` 或 `public` 資料夾
3. 點擊右上角擴充功能圖示，即可看到滑軌開關 popup

## 專案結構說明

- `public/manifest.json`：Chrome 擴充功能設定（名稱、版本、權限、icon 等）
- `public/content-script.js`：注入網頁的暗黑模式切換腳本
- `src/App.vue`：popup 主介面，滑軌開關與切換邏輯
- `src/main.js`：Vue 入口
- `src/assets/`：靜態資源
- `public/icon*.png`：各尺寸自訂 icon

## 主要檔案註解

### manifest.json
- `name`：擴充功能名稱
- `version`：版本號
- `action.default_popup`：popup 頁面
- `permissions`/`host_permissions`：腳本注入權限
- `icons`：自訂 icon

### content-script.js
- 注入網頁時，插入/移除全局暗黑 CSS，並用 MutationObserver 保證 SPA 也能正確切換

### App.vue
- 只顯示一個滑軌開關，icon 會根據狀態顯示太陽或月亮
- 只允許在 http/https/file 頁面注入腳本，chrome:// 等頁面會彈出提示
- CSS 控制滑軌、icon 動畫、顏色與位置，確保只有一個 icon 會顯示且滑動流暢

## 常見問題

- **Q: 為什麼在 chrome:// 頁面無法切換？**
  A: Chrome 安全限制，無法在這類頁面注入腳本，會彈出提示。
- **Q: 如何更換 icon？**
  A: 將 16/32/48/64/128px PNG 放到 public 資料夾，並在 manifest.json 設定對應路徑。
- **Q: 如何自訂 popup 尺寸？**
  A: 修改 App.vue 的 .app 寬高即可。

## 聯絡作者
如有建議或問題，歡迎 issue 或 pull request。
