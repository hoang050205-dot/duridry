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

        if (msg.type === "OPEN_CART_DRAWER" || msg.type === "OPEN_CART") {
            console.log("🛒 Master Router phát tín hiệu mở Giỏ Hàng tới các component...");
            broadcastToHtmlComponents({ type: 'OPEN_CART_DRAWER' });
            return;
        }

        if (msg.type === "FILTER_CATEGORY" && msg.category) {
            console.log("🎯 Master Router phát tín hiệu lọc danh mục:", msg.category);
            broadcastToHtmlComponents({ type: 'FILTER_CATEGORY', category: msg.category });
            return;
        }

        let targetUrl = msg.url;
        // Bắt sự kiện nhảy sang Wix Stores (Trang All Products / Trang danh mục)
        if (msg.type === "OPEN_WIX_STORE" || msg.type === "NAVIGATE_SHOP_PAGE" || msg.type === "OPEN_SHOP" || (msg.type === "WIX_NAVIGATE" && msg.url && (msg.url.includes("shop") || msg.url.includes("cua-hang") || msg.url.includes("category") || msg.url.includes("all-product")))) {
            const cat = msg.category;
            const sku = msg.sku;
            let params = [];
            if (cat && cat !== 'all') params.push(`cat=${cat}`);
            if (sku) params.push(`sku=${sku}`);

            let queryStr = params.length > 0 ? '?' + params.join('&') : '';
            if (!queryStr && msg.url && msg.url.includes('?')) {
                queryStr = msg.url.substring(msg.url.indexOf('?'));
            }

            // Đích đến chính xác 100% của trang All Products trên Wix Stores
            targetUrl = '/category/all-products' + queryStr;
            console.log("🛍️ Master Router: Nhảy thẳng sang Wix Stores All Products:", targetUrl);
            navigateSafely(targetUrl);
            return;
        }

        if (targetUrl) {
            console.log("🚀 Master Router navigating to:", targetUrl);
            navigateSafely(targetUrl);
        }
    }

    // Hook lắng nghe tất cả các ID nhúng HTML Component có thể tồn tại
    const componentIds = [
        '#html1', '#html2', '#html3', '#html4', '#html5', '#html6', '#html7', '#html8',
        '#htmlHeader', '#headerHtml', '#htmlHead', '#htmlFooter', '#footerHtml',
        '#htmlBody', '#htmlShop', '#htmlStore', '#htmlServices', '#htmlAbout', '#htmlContact'
    ];
    componentIds.forEach(id => {
        try {
            const comp = $w(id);
            if (comp && typeof comp.onMessage === 'function') {
                comp.onMessage(handleMessage);
                console.log("✅ Velo Master Router đã kết nối onMessage thành công với:", id);
            }
        } catch (e) {}
    });
}

export function broadcastToHtmlComponents(data) {
    const componentIds = [
        '#html1', '#html2', '#html3', '#html4', '#html5', '#html6', '#html7', '#html8',
        '#htmlHeader', '#headerHtml', '#htmlHead', '#htmlFooter', '#footerHtml',
        '#htmlBody', '#htmlShop', '#htmlStore', '#htmlServices', '#htmlAbout', '#htmlContact'
    ];
    componentIds.forEach(id => {
        try {
            const comp = $w(id);
            if (comp && typeof comp.postMessage === 'function') {
                comp.postMessage(data);
            }
        } catch (e) {}
    });
}

export function navigateSafely(url) {
    if (!url) return;

    // Nếu đích đến là Cửa Hàng / All Products trong Wix Stores
    if (url.includes("all-products") || url.includes("all-product") || url.includes("shop") || url.includes("cua-hang") || url.includes("category")) {
        const queryIdx = url.indexOf('?');
        const query = queryIdx !== -1 ? url.substring(queryIdx) : '';
        console.log("🛍️ Điều hướng trực tiếp tới trang All Products:", "/category/all-products" + query);
        try {
            wixLocation.to("/category/all-products" + query);
        } catch (err) {
            console.warn("Direct /category/all-products failed, trying fallback:", err);
            try {
                wixLocation.to("/all-products" + query);
            } catch (e2) {
                try { wixLocation.to("/shop" + query); } catch (e3) {
                    try { wixLocation.to("/cua-hang" + query); } catch (e4) {}
                }
            }
        }
        return;
    }

    try {
        wixLocation.to(url);
    } catch (err) {
        console.warn("Direct wixLocation.to failed for:", url, err);
        if (url.includes("services")) {
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
