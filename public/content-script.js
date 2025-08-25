(() => {
    const DARK_STYLE_ID = '__my_dark_mode_style__';
    const darkStyle = `
        html, body {
            background: #181818 !important;
            color: #f1f1f1 !important;
        }
        *:not(img):not(svg):not([style*="background: none"]),
        .sidebar, .side-menu, nav, header, footer, aside {
            background: #232323 !important;
            color: #f1f1f1 !important;
            border-color: #333 !important;
        }
        a { color: #8ab4f8 !important; }
        input, textarea, select, button {
            background: #222 !important;
            color: #f1f1f1 !important;
            border-color: #444 !important;
        }
        ::selection {
            background: #444 !important;
            color: #fff !important;
        }
    `;
    function enableDark() {
        if (!document.getElementById(DARK_STYLE_ID)) {
            const style = document.createElement('style');
            style.id = DARK_STYLE_ID;
            style.textContent = darkStyle;
            document.head.appendChild(style);
        }
    }
    function disableDark() {
        const style = document.getElementById(DARK_STYLE_ID);
        if (style) style.remove();
    }
    // 切換暗黑/亮色模式
    if (document.getElementById(DARK_STYLE_ID)) {
        disableDark();
    } else {
        enableDark();
    }
    // 監控 DOM 變化，確保新內容也套用暗黑樣式
    if (!window.__DARK_MODE_OBSERVER__) {
        const observer = new MutationObserver(() => {
            if (document.getElementById(DARK_STYLE_ID)) {
                enableDark();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        window.__DARK_MODE_OBSERVER__ = observer;
    }
})();
