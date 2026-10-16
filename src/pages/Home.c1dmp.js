// =========================================================================
// DuriDry Home Page Controller (Velo Code)
// File: src/pages/Home.c1dmp.js
// Nền tảng: Wix Studio & Velo | Tác giả: DuriDry Co., Ltd
// =========================================================================
import wixWindow from 'wix-window';
import wixLocation from 'wix-location';
import { getBatchInfo, calculateB2BQuote, submitB2BInquiry } from 'backend/duridry_backend';
import { BRAND_INFO, PRODUCTS } from 'public/duridry_data';

$w.onReady(function () {
    console.log("🌿 DuriDry Eco-Premium Home Page Loaded via GitHub Velo!");

    // Kết nối khung nhúng giao diện (#html1)
    try {
        const htmlApp = $w('#html1');
        if (htmlApp && typeof htmlApp.onMessage === 'function') {
            console.log("✅ Đã kết nối với Khung Nhúng Giao Diện DuriDry (#html1)");

            htmlApp.onMessage(async (event) => {
                const msg = event.data;
                if (!msg) return;

                // CHUYỂN TRANG SANG WIX STORES (Trang danh mục.ivo1p.js)
                if (msg.type === "OPEN_WIX_STORE" || msg.type === "NAVIGATE_SHOP_PAGE" || msg.type === "OPEN_SHOP" || (msg.type === "WIX_NAVIGATE" && msg.url && (msg.url.includes("shop") || msg.url.includes("cua-hang") || msg.url.includes("category")))) {
                    const cat = msg.category;
                    const sku = msg.sku;
                    let params = [];
                    if (cat && cat !== 'all') params.push(`cat=${cat}`);
                    if (sku) params.push(`sku=${sku}`);
                    let queryStr = params.length > 0 ? '?' + params.join('&') : '';
                    if (!queryStr && msg.url && msg.url.includes('?')) {
                        queryStr = msg.url.substring(msg.url.indexOf('?'));
                    }
                    const targetUrl = '/shop' + queryStr;
                    console.log("🛒 Home Page: Chuyển thẳng sang Wix Stores (Trang danh mục.ivo1p.js):", targetUrl);
                    try {
                        wixLocation.to(targetUrl);
                    } catch (e) {
                        try { wixLocation.to("/category/all-products" + queryStr); } catch (err) { wixLocation.to("/cua-hang" + queryStr); }
                    }
                    return;
                } else if (msg.type === "WIX_NAVIGATE" && msg.url) {
                    console.log("🚀 Điều hướng sang trang:", msg.url);
                    try {
                        wixLocation.to(msg.url);
                    } catch (err) {
                        if (msg.url.includes("services")) {
                            try { wixLocation.to("/dich-vu-b2b"); } catch (e) {}
                        } else if (msg.url.includes("about")) {
                            try { wixLocation.to("/ve-duridry"); } catch (e) {}
                        } else if (msg.url.includes("contact")) {
                            try { wixLocation.to("/lien-he"); } catch (e) {}
                        }
                    }
                } else if (msg.action === "add_to_cart") {
                    console.log("🛒 Khách chọn mua sản phẩm:", msg.sku);
                } else if (msg.action === "b2b_inquiry") {
                    console.log("📦 Tiếp nhận yêu cầu báo giá B2B:", msg);
                    const res = await submitB2BInquiry(msg);
                    console.log("Kết quả lưu CMS B2B:", res);
                }
            });
        }
    } catch (err) {
        console.warn("Lưu ý về HtmlComponent:", err);
    }

    initNativeElementsSafe();
});

function initNativeElementsSafe() {
    try {
        const btnShop = $w('#btnShopNow');
        if (btnShop && typeof btnShop.onClick === 'function') {
            btnShop.onClick(() => {
                try {
                    wixLocation.to("/shop");
                } catch (e) {
                    try { wixLocation.to("/category/all-products"); } catch (err) { wixLocation.to("/cua-hang"); }
                }
            });
        }
        const btnB2B = $w('#btnB2B');
        if (btnB2B && typeof btnB2B.onClick === 'function') {
            btnB2B.onClick(() => wixLocation.to("/services"));
        }
    } catch (e) {}
}
