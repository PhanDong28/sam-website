import { prisma } from "@/lib/prisma";

const GOLD = "#c9a84c";

export default async function AdminDashboard() {
  const [productCount, categoryCount, postCount, unreadContactCount] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.post.count(),
    prisma.contact.count({ where: { isRead: false } }),
  ]);

  const cards = [
    { label: "SẢN PHẨM", value: productCount, sub: "Tổng sản phẩm" },
    { label: "DANH MỤC", value: categoryCount, sub: "Phân loại" },
    { label: "TIN TỨC", value: postCount, sub: "Bài đăng" },
    { label: "LIÊN HỆ", value: unreadContactCount, sub: "Chờ xử lý" },
  ];

  return (
    <div className="p-12">
      {/* Header */}
      <div className="mb-12 fade-in-up">
        <div className="flex items-center gap-3 mb-3">
          <div style={{ width: 32, height: 1, background: GOLD }} />
          <span style={{ color: GOLD, fontSize: 11, letterSpacing: "0.25em" }}>TỔNG QUAN</span>
        </div>
        <h2 style={{ fontSize: 30, fontWeight: 400, color: "#1a1000", letterSpacing: "0.02em", fontFamily: "var(--font-serif), Georgia, serif" }}>
          Dashboard
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {cards.map((card, i) => (
          <div key={card.label} className="relative overflow-hidden fade-in-up lift-hover" style={{
            background: "#fff",
            border: "1px solid #e8d9b0",
            borderRadius: 6,
            padding: "28px 24px",
            animationDelay: `${i * 0.07}s`,
          }}>
            {/* Gold corner accent */}
            <div style={{
              position: "absolute", top: 0, right: 0,
              width: 40, height: 40,
              background: "linear-gradient(225deg, #c9a84c22 0%, transparent 60%)",
              borderBottom: "1px solid #c9a84c30",
              borderLeft: "1px solid #c9a84c30",
            }} />
            <p style={{ color: GOLD, fontSize: 10, letterSpacing: "0.2em", marginBottom: 16 }}>{card.label}</p>
            <p style={{ fontSize: 42, fontWeight: 300, color: "#1a1000", lineHeight: 1, fontFamily: "var(--font-serif), Georgia, serif" }}>{card.value}</p>
            <p style={{ color: "#9e8860", fontSize: 12, marginTop: 8 }}>{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Ornamental divider */}
      <div className="flex items-center gap-4 mb-10">
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${GOLD}40, transparent)` }} />
        <span style={{ color: `${GOLD}60`, fontSize: 12, letterSpacing: "0.3em" }}>✦ ✦ ✦</span>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}40)` }} />
      </div>

      <p className="fade-in" style={{ color: "#9e8860", fontSize: 13, letterSpacing: "0.05em", textAlign: "center" }}>
        Chào mừng trở lại — Hữu Sâm Admin
      </p>
    </div>
  );
}
