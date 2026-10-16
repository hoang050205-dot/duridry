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

    // --- 1. TỰ ĐỘNG CUỘN ĐẾN CỬA HÀNG NẾU CÓ THAM SỐ ?tab=shop HOẶC #products ---
    handleStoreNavigation();

    // --- 2. KẾT NỐI KHUNG NHÚNG GIAO DIỆN (#html1) AN TOÀN ---
    try {
        const htmlApp = $w('#html1');
        if (htmlApp && typeof htmlApp.onMessage === 'function') {
            console.log("✅ Đã kết nối với Khung Nhúng Giao Diện DuriDry (#html1)");

            htmlApp.onMessage(async (event) => {
                const msg = event.data;
                if (!msg) return;

                // Điều hướng cuộn trang khi khách bấm tab Cửa Hàng
                if (msg.type === "NAVIGATE_SHOP" || msg.action === "scroll_to_shop") {
                    console.log("🛒 Nhận lệnh cuộn trang tới phần Cửa Hàng");
                    if (typeof htmlApp.scrollTo === 'function') {
                        htmlApp.scrollTo();
                    }
                } else if (msg.action === "add_to_cart") {
                    console.log("🛒 Khách chọn mua sản phẩm:", msg.sku);
                } else if (msg.action === "b2b_inquiry") {
                    console.log("📦 Tiếp nhận yêu cầu báo giá B2B:", msg);
                    const res = await submitB2BInquiry(msg);
                    console.log("Kết quả lưu CMS B2B:", res);
                }
            });
        } else {
            console.log("ℹ️ Khung nhúng #html1 đang chạy độc lập.");
        }
    } catch (err) {
        console.warn("Lưu ý về HtmlComponent:", err);
    }

    // --- 3. HỖ TRỢ CÁC PHẦN TỬ NATIVE TRÊN TRANG (AN TOÀN CHỐNG LỖI) ---
    initNativeElementsSafe();
});

function handleStoreNavigation() {
    try {
        // Nếu URL là #products hoặc query ?tab=shop hoặc ?section=shop
        const query = wixLocation.query;
        if (query && (query.tab === 'shop' || query.section === 'shop')) {
            const htmlApp = $w('#html1');
            if (htmlApp && typeof htmlApp.scrollTo === 'function') {
                setTimeout(() => htmlApp.scrollTo(), 500);
            }
        }
    } catch (e) {}
}

function initNativeElementsSafe() {
    try {
        const btnShop = $w('#btnShopNow');
        if (btnShop && typeof btnShop.onClick === 'function') {
            btnShop.onClick(() => {
                const htmlApp = $w('#html1');
                if (htmlApp && typeof htmlApp.scrollTo === 'function') {
                    htmlApp.scrollTo();
                }
            });
        }

        const btnB2B = $w('#btnB2B');
        if (btnB2B && typeof btnB2B.onClick === 'function') {
            btnB2B.onClick(() => wixLocation.to("/services"));
        }
    } catch (e) {
        console.warn("Bỏ qua gán sự kiện native elements:", e);
    }
}
