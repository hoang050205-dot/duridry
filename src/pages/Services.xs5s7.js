// =========================================================================
// DuriDry Services Page Controller (Velo Code)
// File: src/pages/Services.xs5s7.js
// Nền tảng: Wix Studio & Velo | Tác giả: DuriDry Co., Ltd
// =========================================================================
import wixLocation from 'wix-location';

$w.onReady(function () {
    console.log("🌿 DuriDry Services Page Active!");

    // Kết nối an toàn với khung nhúng dịch vụ (#htmlServices hoặc #html1)
    try {
        const htmlServices = $w('#htmlServices') || $w('#html1');
        if (htmlServices && typeof htmlServices.onMessage === 'function') {
            htmlServices.onMessage((event) => {
                const msg = event.data;
                console.log("📩 Tin nhắn từ trang Dịch Vụ:", msg);
            });
        }
    } catch (e) {
        console.warn("Khung nhúng chạy độc lập:", e);
    }
});
