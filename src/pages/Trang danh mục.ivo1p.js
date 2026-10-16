// =========================================================================
// DuriDry Shop Page Controller (Trang Cửa Hàng / Danh Mục)
// File: src/pages/Trang danh mục.ivo1p.js
// =========================================================================
import wixLocation from 'wix-location';

$w.onReady(function () {
    console.log("🛒 DuriDry Shop Page Active!");

    try {
        const htmlShop = $w('#html1') || $w('#htmlShop');
        if (htmlShop && typeof htmlShop.onMessage === 'function') {
            htmlShop.onMessage((event) => {
                const msg = event.data;
                if (msg && msg.type === "WIX_NAVIGATE" && msg.url) {
                    wixLocation.to(msg.url);
                }
            });
        }
    } catch (e) {}
});
