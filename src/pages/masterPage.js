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
        if (!cart || typeof cart.getCurrentCart !== 'function') return;

        const currentCart = await cart.getCurrentCart();
        if (currentCart && typeof currentCart.subtotal !== 'undefined') {
            updateFreeshipIndicator(currentCart.subtotal);
        }

        if (typeof cart.onChange === 'function') {
            cart.onChange((newCart) => {
                if (newCart && typeof newCart.subtotal !== 'undefined') {
                    updateFreeshipIndicator(newCart.subtotal);
                }
            });
        }
    } catch (e) {
        // Dự phòng an toàn khi chưa kích hoạt Wix Stores
    }
}

function updateFreeshipIndicator(subtotal = 0) {
    try {
        const remaining = FREESHIP_THRESHOLD_VND - subtotal;
        const percent = Math.min(100, Math.round((subtotal / FREESHIP_THRESHOLD_VND) * 100));

        const progressBar = $w('#freeshipProgressBar');
        if (progressBar && typeof progressBar.value !== 'undefined') {
            progressBar.value = percent;
        }

        const noticeText = $w('#txtFreeshipNotice');
        if (noticeText && typeof noticeText.text !== 'undefined') {
            if (remaining <= 0) {
                noticeText.text = "🎉 Bạn đã được MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC!";
            } else {
                noticeText.text = `Mua thêm ${remaining.toLocaleString('vi-VN')}đ để được Freeship toàn quốc!`;
            }
        }
    } catch (e) {}
}
