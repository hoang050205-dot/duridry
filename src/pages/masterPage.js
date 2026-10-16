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
    console.log("🚀 Setting up DuriDry Global Navigation Listener...");

    function handleMessage(event) {
        const msg = event.data;
        if (!msg) return;

        let targetUrl = msg.url;
        if (msg.type === "NAVIGATE_SHOP_PAGE" || msg.type === "OPEN_SHOP") {
            targetUrl = "/cua-hang";
        }

        if (targetUrl) {
            console.log("🚀 Master Router navigating to:", targetUrl);
            navigateSafely(targetUrl);
        }
    }

    // 1. Hook to all HtmlComponents via general selector
    try {
        $w('HtmlComponent').onMessage(handleMessage);
    } catch (e) {}

    // 2. Hook to specific common IDs safely
    const componentIds = [
        '#html1', '#html2', '#html3', '#html4', '#html5',
        '#htmlHeader', '#headerHtml', '#htmlFooter', '#footerHtml',
        '#htmlShop', '#htmlServices', '#htmlAbout', '#htmlContact'
    ];
    componentIds.forEach(id => {
        try {
            const comp = $w(id);
            if (comp && comp.length > 0 && typeof comp.onMessage === 'function') {
                comp.onMessage(handleMessage);
            }
        } catch (e) {}
    });
}

export function navigateSafely(url) {
    if (!url) return;
    try {
        wixLocation.to(url);
    } catch (err) {
        console.warn("Direct wixLocation.to failed for:", url, err);
        if (url.includes("cua-hang")) {
            try { wixLocation.to("/shop"); } catch (e2) {
                try { wixLocation.to("/store"); } catch (e3) {
                    wixLocation.to("/trang-danh-muc");
                }
            }
        } else if (url.includes("services")) {
            try { wixLocation.to("/dich-vu-b2b"); } catch (e) {}
        } else if (url.includes("about")) {
            try { wixLocation.to("/ve-duridry"); } catch (e) {}
        } else if (url.includes("contact")) {
            try { wixLocation.to("/lien-he"); } catch (e) {}
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
