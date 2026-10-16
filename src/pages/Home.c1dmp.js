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

    // --- 2. HỖ TRỢ CÁC PHẦN TỬ NATIVE TRÊN TRANG (NẾU CÓ) ---
    initNativeElements();
});

function initNativeElements() {
    // Điều hướng các nút CTA Native
    if ($w('#btnShopNow')) {
        $w('#btnShopNow').onClick(() => wixLocation.to("/cua-hang"));
    }
    if ($w('#btnB2B')) {
        $w('#btnB2B').onClick(() => wixLocation.to("/cong-xuat-khau-b2b"));
    }

    // Widget Tra cứu mã lô hàng (Native)
    if ($w('#btnTrackBatch') && $w('#inputBatchCode')) {
        $w('#btnTrackBatch').onClick(async () => {
            const code = $w('#inputBatchCode').value;
            const res = await getBatchInfo(code);
            if (res.success && $w('#boxBatchResult')) {
                if ($w('#txtFarmName')) $w('#txtFarmName').text = "Vùng trồng: " + res.data.farm;
                if ($w('#txtMoisture')) $w('#txtMoisture').text = "Độ ẩm: " + res.data.moisture;
                $w('#boxBatchResult').expand();
            } else if ($w('#boxBatchResult')) {
                if ($w('#txtFarmName')) $w('#txtFarmName').text = res.message;
                $w('#boxBatchResult').expand();
            }
        });
    }

    // Widget B2B Calculator (Native)
    if ($w('#sliderB2BQty')) {
        $w('#sliderB2BQty').onChange(async () => {
            const qty = $w('#sliderB2BQty').value;
            const quote = await calculateB2BQuote(qty);
            if ($w('#txtB2BTotalVal')) {
                $w('#txtB2BTotalVal').text = `Tổng: $${quote.totalFobCifUsd.toLocaleString()} USD (Cọc 30% T/T: $${quote.advanceDepositUsd.toLocaleString()} USD)`;
            }
        });
    }
}
