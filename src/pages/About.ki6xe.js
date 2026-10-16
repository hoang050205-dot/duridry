// =========================================================================
// DuriDry About Page Controller (Velo Code)
// File: src/pages/About.ki6xe.js
// Nền tảng: Wix Studio & Velo | Tác giả: DuriDry Co., Ltd
// =========================================================================
import wixLocation from 'wix-location';

$w.onReady(function () {
    console.log("🌿 DuriDry About Page Active!");

    // Kết nối an toàn với khung nhúng giới thiệu (#htmlAbout hoặc #html1)
    try {
        const htmlAbout = $w('#htmlAbout') || $w('#html1');
        if (htmlAbout && typeof htmlAbout.onMessage === 'function') {
            htmlAbout.onMessage((event) => {
                const msg = event.data;
                console.log("📩 Tin nhắn từ trang Giới Thiệu:", msg);
            });
        }
    } catch (e) {
        console.warn("Khung nhúng chạy độc lập:", e);
    }
});
