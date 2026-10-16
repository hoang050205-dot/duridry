// =========================================================================
// DuriDry Contact Page Controller (Velo Code)
// Nền tảng: Wix Studio & Velo | Tác giả: DuriDry Co., Ltd
// =========================================================================
import wixLocation from 'wix-location';

$w.onReady(function () {
    console.log("🌿 DuriDry Contact Page Active!");

    try {
        const htmlComp = $w('#html1') || $w('#htmlContact');
        if (htmlComp && typeof htmlComp.onMessage === 'function') {
            htmlComp.onMessage((event) => {
                const msg = event.data;
                if (msg && msg.type === "WIX_NAVIGATE" && msg.url) {
                    console.log("🚀 Điều hướng sang trang:", msg.url);
                    wixLocation.to(msg.url);
                }
            });
        }
    } catch (e) {}
});
