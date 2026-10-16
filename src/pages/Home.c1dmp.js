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

    // --- 1. KẾT NỐI KHUNG NHÚNG GIAO DIỆN (#html1) AN TOÀN ---
    try {
        const htmlApp = $w('#html1');
        if (htmlApp && typeof htmlApp.onMessage === 'function') {
            console.log("✅ Đã kết nối với Khung Nhúng Giao Diện DuriDry (#html1)");

            htmlApp.onMessage(async (event) => {
                const msg = event.data;
                if (!msg) return;

                if (msg.action === "add_to_cart") {
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

    // --- 2. HỖ TRỢ CÁC PHẦN TỬ NATIVE TRÊN TRANG (AN TOÀN CHỐNG LỖI) ---
    initNativeElementsSafe();
});

function initNativeElementsSafe() {
    try {
        const btnShop = $w('#btnShopNow');
        if (btnShop && typeof btnShop.onClick === 'function') {
            btnShop.onClick(() => wixLocation.to("/cua-hang"));
        }

        const btnB2B = $w('#btnB2B');
        if (btnB2B && typeof btnB2B.onClick === 'function') {
            btnB2B.onClick(() => wixLocation.to("/cong-xuat-khau-b2b"));
        }

        const btnTrack = $w('#btnTrackBatch');
        const inputBatch = $w('#inputBatchCode');
        if (btnTrack && typeof btnTrack.onClick === 'function' && inputBatch) {
            btnTrack.onClick(async () => {
                const code = inputBatch.value;
                const res = await getBatchInfo(code);
                const boxResult = $w('#boxBatchResult');
                if (boxResult && typeof boxResult.expand === 'function') {
                    const txtFarm = $w('#txtFarmName');
                    if (txtFarm && res.success) {
                        txtFarm.text = "Vùng trồng: " + res.data.farm;
                    } else if (txtFarm) {
                        txtFarm.text = res.message;
                    }
                    boxResult.expand();
                }
            });
        }

        const sliderQty = $w('#sliderB2BQty');
        if (sliderQty && typeof sliderQty.onChange === 'function') {
            sliderQty.onChange(async () => {
                const qty = sliderQty.value;
                const quote = await calculateB2BQuote(qty);
                const txtTotal = $w('#txtB2BTotalVal');
                if (txtTotal) {
                    txtTotal.text = `Tổng: $${quote.totalFobCifUsd.toLocaleString()} USD (Cọc 30% T/T: $${quote.advanceDepositUsd.toLocaleString()} USD)`;
                }
            });
        }
    } catch (e) {
        console.warn("Bỏ qua gán sự kiện native elements:", e);
    }
}
