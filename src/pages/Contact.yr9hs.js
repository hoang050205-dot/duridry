// =========================================================================
// DuriDry Contact Page Controller (Velo Code)
// File: src/pages/Contact.yr9hs.js
// Nền tảng: Wix Studio & Velo | Tác giả: DuriDry Co., Ltd
// =========================================================================
import wixLocation from 'wix-location';

$w.onReady(function () {
    console.log("🌿 DuriDry Contact Page Active!");

    // Kết nối an toàn với khung nhúng liên hệ (#htmlContact hoặc #html1)
    try {
        const htmlContact = $w('#htmlContact') || $w('#html1');
        if (htmlContact && typeof htmlContact.onMessage === 'function') {
            htmlContact.onMessage((event) => {
                const msg = event.data;
                console.log("📩 Tin nhắn từ trang Liên Hệ:", msg);
            });
        }
    } catch (e) {
        console.warn("Khung nhúng chạy độc lập:", e);
    }
});
