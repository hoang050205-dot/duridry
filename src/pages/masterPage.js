// =========================================================================
// DuriDry Global Master Page Controller
// File: src/pages/masterPage.js
// Chạy trên toàn bộ các trang (Header, Navigation Router, Mini-Cart)
// =========================================================================
import wixLocation from 'wix-location';
import { cart } from 'wix-stores-frontend';

const FREESHIP_THRESHOLD_VND = 300000;

$w.onReady(function () {
    console.log("🌿 DuriDry Global Master Page Active!");
    setupGlobalNavigation();
    setupFreeshipTracker();
});

function setupGlobalNavigation() {
    // Lắng nghe lệnh chuyển trang từ bất kỳ Khung Nhúng HTML nào trên toàn site
    try {
        const htmlComps = [$w('#html1'), $w('#htmlServices'), $w('#htmlAbout'), $w('#htmlContact')];
        htmlComps.forEach(comp => {
            if (comp && typeof comp.onMessage === 'function') {
                comp.onMessage((event) => {
                    const msg = event.data;
                    if (!msg) return;

                    // Chuyển trang sang Cửa Hàng
                    if (msg.type === "NAVIGATE_SHOP_PAGE") {
                        console.log("🛒 Master Router: Chuyển trang sang Cửa Hàng");
                        navigateToStore(msg.category);
                    } else if (msg.type === "WIX_NAVIGATE" && msg.url) {
                        console.log("🚀 Master Router: Chuyển trang sang:", msg.url);
                        wixLocation.to(msg.url);
                    }
                });
            }
        });
    } catch (e) {}
}

export function navigateToStore(category) {
    try {
        // Thử chuyển trang theo slug chuẩn của Wix
        wixLocation.to("/cua-hang");
    } catch (err) {
        try {
            wixLocation.to("/shop");
        } catch (e) {
            wixLocation.to("/store");
        }
    }
}

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
    } catch (e) {}
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
