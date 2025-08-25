<template>
  <div class="app">
    <!-- 極簡滑軌開關，icon 會根據狀態顯示太陽或月亮 -->
    <label class="switch">
      <!-- 切換暗黑模式，僅允許在 http(s) 或 file 協議頁面注入腳本 -->
      <input type="checkbox" @change="toggleDarkMode" aria-label="切換暗黑模式" />
      <span class="slider">
        <!-- 只顯示一個 icon，未切換時顯示太陽，切換後顯示月亮 -->
        <span class="icon sun">☀️</span>
        <span class="icon moon">🌙</span>
      </span>
    </label>
  </div>
</template>

<script setup>
// 切換暗黑模式，僅允許在 http(s) 或 file 協議的頁面注入腳本
function toggleDarkMode() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    // 只允許在 http(s) 或 file 協議頁面注入腳本
    if (tab && tab.url && /^(https?:|file:)/.test(tab.url)) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content-script.js']
      });
    } else {
      // 若在受保護頁面則彈出提示
      alert('無法在此頁面切換暗黑模式。請在一般網頁上使用。');
    }
  });
}
</script>

<style scoped>
.app {
  /* 設定 popup 視窗尺寸與置中顯示 */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 40px;
  background: transparent;
}
.switch {
  /* 滑軌外框 */
  position: relative;
  display: inline-block;
  width: 56px;
  height: 24px;
}
.switch input {
  /* 隱藏原生 checkbox */
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
  left: -9999px;
}
.switch input:focus {
  outline: none;
  box-shadow: none;
}
.slider {
  /* 滑軌本體，含動畫與漸層 */
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, #ffe082 0%, #ffd600 50%, #333 100%);
  transition: background 0.4s;
  border-radius: 24px;
}
.slider:before {
  /* 不顯示原本的滑塊 */
  display: none;
}
.icon {
  /* icon 動畫、顏色與位置 */
  position: absolute;
  top: 3px;
  font-size: 18px;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.4s, opacity 0.3s, color 0.3s;
  z-index: 2;
  background: none;
  border-radius: 0;
  box-shadow: none;
  pointer-events: none;
}
.sun {
  /* 太陽 icon，預設顯示於左側 */
  color: #ffd600;
  left: 3px;
  opacity: 1;
}
.moon {
  /* 月亮 icon，預設隱藏於右側 */
  color: #333;
  left: 35px;
  opacity: 0;
}
input:checked + .slider {
  /* 切換後滑軌顏色變深 */
  background: linear-gradient(90deg, #333 0%, #444 60%, #ffd600 100%);
}
input:checked + .slider .sun {
  /* 切換後隱藏太陽 */
  opacity: 0;
}
input:checked + .slider .moon {
  /* 切換後顯示月亮並滑到右側 */
  opacity: 1;
  color: #ffd600;
  left: 35px;
}
</style>
