// =========================================================================
// DuriDry Shop Page Controller (Trang Cửa Hàng / Danh Mục)
// File: src/pages/Trang danh mục.ivo1p.js
// =========================================================================
import wixLocation from 'wix-location';

$w.onReady(function () {
    console.log("🛒 DuriDry Shop Page Active!");

    function handleNav(event) {
        const msg = event.data;
        if (msg && msg.type === "WIX_NAVIGATE" && msg.url) {
            console.log("🛒 Shop Page navigating to:", msg.url);
            try {
                wixLocation.to(msg.url);
            } catch (err) {
                console.warn("Navigation failed:", err);
            }
        }
    }

    try {
        $w('HtmlComponent').onMessage(handleNav);
    } catch (e) {}

    ['#html1', '#html2', '#htmlShop', '#htmlStore'].forEach(id => {
        try {
            const comp = $w(id);
            if (comp && comp.length > 0 && typeof comp.onMessage === 'function') {
                comp.onMessage(handleNav);
            }
        } catch (e) {}
    });

});
