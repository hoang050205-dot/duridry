// =========================================================================
// DuriDry Global Master Page Controller
// File: src/pages/masterPage.js
// Chạy trên toàn bộ các trang (Header, Announcement Bar, Footer, Mini-Cart)
// =========================================================================
import { cart } from 'wix-stores-frontend';

const FREESHIP_THRESHOLD_VND = 300000; // Miễn phí vận chuyển từ 300.000đ

$w.onReady(function () {
    console.log("🌿 DuriDry Global Master Page Active!");
    setupFreeshipTracker();
});

async function setupFreeshipTracker() {
    try {
        const currentCart = await cart.getCurrentCart();
        if (currentCart) {
            updateFreeshipIndicator(currentCart.subtotal);
        }

        cart.onChange((newCart) => {
            if (newCart) {
                updateFreeshipIndicator(newCart.subtotal);
            }
        });
    } catch (e) {
        // Dự phòng khi chưa cài đặt ứng dụng Wix Stores
    }
}

function updateFreeshipIndicator(subtotal = 0) {
    const remaining = FREESHIP_THRESHOLD_VND - subtotal;
    const percent = Math.min(100, Math.round((subtotal / FREESHIP_THRESHOLD_VND) * 100));

    if ($w('#freeshipProgressBar')) {
        $w('#freeshipProgressBar').value = percent;
    }

    if ($w('#txtFreeshipNotice')) {
        if (remaining <= 0) {
            $w('#txtFreeshipNotice').text = "🎉 Bạn đã được MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC!";
        } else {
            $w('#txtFreeshipNotice').text = `Mua thêm ${remaining.toLocaleString('vi-VN')}đ để được Freeship toàn quốc!`;
        }
    }
}
