/**
 * DuriDry Shared Data & Constants
 * File: src/public/duridry_data.js
 * Source: Group 1_DuriDry.pdf (ĐH Kinh Tế Quốc Dân)
 */

export const BRAND_INFO = {
    name: "DuriDry Co., Ltd",
    slogan: "Crisp Durian Flavor, A Taste You Can't Hide",
    hsCode: "0813.40.20",
    sourcingPartner: "LCD Fruit Vietnam (Tiền Giang)",
    cleanroomFacility: "SEC Warehouse Gò Vấp, TP.HCM",
    packagingPartner: "Vinpack (Túi nhôm màng ghép 3 lớp chống ẩm 3 năm)",
    logisticsPartner: "Super Fast Express & Logistics",
    exportChannels: ["Hema Xiansheng (Alibaba China)", "AEON Mall", "WinMart Vietnam"]
};

export const PRODUCTS = [
    {
        sku: "DDD-RI6-100",
        name: "Sầu Riêng Ri6 Sấy Thăng Hoa DuriDry – Vị Truyền Thống",
        category: "Dòng Nội Địa (Ri6)",
        weight: "100g",
        priceVnd: 115000,
        priceUsd: 4.50,
        priceCny: 32.50,
        badge: "Best Seller",
        tasteMeter: { crispiness: 5, richness: 5, aroma: 5 },
        description: "100% sầu riêng Ri6 tuyển chọn từ Tiền Giang. Vị béo đậm, thơm nồng quyến rũ, giữ trọn 98% dinh dưỡng.",
        img: "https://images.unsplash.com/photo-1587334274328-64186a80aeee?auto=format&fit=crop&w=800&q=80"
    },
    {
        sku: "DDD-RI6-3X35",
        name: "Combo 3 Gói Mini Sầu Riêng Ri6 DuriDry – Bỏ Túi Tiện Lợi",
        category: "Dòng Nội Địa (Ri6)",
        weight: "3 x 35g (105g)",
        priceVnd: 125000,
        priceUsd: 4.80,
        priceCny: 35.00,
        badge: "Tiện Lợi",
        tasteMeter: { crispiness: 5, richness: 5, aroma: 5 },
        description: "Chia nhỏ 3 gói mini không lo ỉu sau khi mở. Cực kỳ tiện lợi cho giới trẻ văn phòng và học sinh sinh viên.",
        img: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=800&q=80"
    },
    {
        sku: "DDD-MT-100",
        name: "Sầu Riêng Monthong Sấy Thăng Hoa DuriDry – Vị Thanh Tao",
        category: "Dòng Xuất Khẩu (Monthong)",
        weight: "100g",
        priceVnd: 135000,
        priceUsd: 5.20,
        priceCny: 38.00,
        badge: "Chuẩn Xuất Khẩu",
        tasteMeter: { crispiness: 5, richness: 4, aroma: 4 },
        description: "Cơm dày giòn chắc, vị ngọt thanh mát. Đóng gói tiêu chuẩn xuất khẩu song ngữ Anh - Trung, đạt chuẩn Phytosanitary.",
        img: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80"
    },
    {
        sku: "DDD-MT-500",
        name: "Sầu Riêng Monthong Sấy Thăng Hoa – Túi Gia Đình & Xuất Khẩu",
        category: "Dòng Xuất Khẩu (Monthong)",
        weight: "Túi Zip 500g",
        priceVnd: 295000,
        priceUsd: 11.50,
        priceCny: 83.00,
        badge: "Tiết Kiệm 35%",
        tasteMeter: { crispiness: 5, richness: 4, aroma: 4 },
        description: "Sản phẩm chủ lực theo kế hoạch tài chính ($11.50/gói 0.5kg). Khóa zip tiện lợi, có nhãn phụ tiếng Trung cho siêu thị Hema.",
        img: "https://images.unsplash.com/photo-1587334274328-64186a80aeee?auto=format&fit=crop&w=800&q=80"
    },
    {
        sku: "DDD-GIFT-200",
        name: "Hộp Quà Song Vị Hoàng Kim (1 Gói Ri6 + 1 Gói Monthong)",
        category: "Bộ Quà Tặng (Gift Sets)",
        weight: "Hộp 200g (2x100g)",
        priceVnd: 260000,
        priceUsd: 10.00,
        priceCny: 72.00,
        badge: "Quà Biếu VIP",
        tasteMeter: { crispiness: 5, richness: 5, aroma: 5 },
        description: "Hộp cứng ép kim kèm túi giấy mỹ thuật và thiệp thư pháp. Lựa chọn biếu tặng Lễ Tết và đối tác ngoại giao.",
        img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
    }
];

export const BATCH_DATABASE = {
    "DDD-2026-TG01": {
        variety: "Sầu Riêng Monthong (Dòng Xuất Khẩu)",
        farm: "Nông trại LCD Fruit Việt Nam (Cai Lậy, Tiền Giang)",
        areaCode: "VN-TG-0813 (Mã số vùng trồng theo chuẩn GACC Trung Quốc)",
        dryDate: "12/09/2026 (Sấy Thăng Hoa Âm Sâu -40°C)",
        moisture: "2.8% (Đạt chuẩn quốc tế < 3%)",
        facility: "SEC Warehouse Gò Vấp (Phòng sạch kiểm soát độ ẩm <15%)",
        phytoCert: "Cấp bởi Cục Bảo vệ Thực vật VN (#VN-PHYTO-2026-0813)",
        packaging: "Túi nhôm Vinpack màng ghép 3 lớp chống ẩm 3 năm"
    },
    "DDD-2026-TG02": {
        variety: "Sầu Riêng Ri6 (Dòng Nội Địa Đặc Sản)",
        farm: "Vùng trồng mẫu Cái Bè, Tiền Giang (VietGAP)",
        areaCode: "VN-TG-0609",
        dryDate: "15/09/2026",
        moisture: "2.6%",
        facility: "SEC Warehouse Gò Vấp, TP.HCM",
        phytoCert: "Đạt chuẩn an toàn thực phẩm ISO 22000 & HACCP",
        packaging: "Túi nhôm Vinpack"
    }
};
