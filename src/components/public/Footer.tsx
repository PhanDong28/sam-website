import Link from "next/link";

const GOLD = "#c9a84c";

export default function Footer() {
  return (
    <footer style={{ background: "#0a0600", borderTop: "1px solid rgba(201,168,76,0.15)", padding: "60px 32px 32px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div className="footer-grid" style={{ marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ fontSize: 9, letterSpacing: "0.3em", color: GOLD, marginBottom: 10 }}>✦ PREMIUM GINSENG ✦</div>
            <div style={{ fontSize: 22, fontWeight: 400, color: "#f0d070", fontFamily: "var(--font-serif), Georgia, serif", marginBottom: 14 }}>Sâm Việt Nam</div>
            <p style={{ color: "#7a5a30", fontSize: 13, lineHeight: 1.8, maxWidth: 280, marginBottom: 24 }}>
              Chuyên cung cấp sâm Ngọc Linh, sâm Lai Châu và các sản phẩm sâm chính gốc Việt Nam chất lượng cao, có chứng nhận xuất xứ rõ ràng.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {["Facebook", "Zalo", "Youtube"].map(s => (
                <a key={s} href="#" style={{
                  padding: "6px 14px", fontSize: 11, color: GOLD,
                  border: `1px solid rgba(201,168,76,0.3)`, borderRadius: 2,
                  textDecoration: "none", letterSpacing: "0.05em",
                }}>{s}</a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", color: GOLD, marginBottom: 20 }}>ĐIỀU HƯỚNG</div>
            {[
              { href: "/", label: "Trang chủ" },
              { href: "/products", label: "Sản phẩm" },
              { href: "/news", label: "Tin tức" },
              { href: "/contact", label: "Liên hệ" },
            ].map(t => (
              <div key={t.href} style={{ marginBottom: 12 }}>
                <Link href={t.href} style={{ color: "#7a5a30", fontSize: 13, textDecoration: "none" }}>{t.label}</Link>
              </div>
            ))}
          </div>

          {/* Products */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", color: GOLD, marginBottom: 20 }}>SẢN PHẨM</div>
            {["Sâm Ngọc Linh", "Sâm Lai Châu", "Sâm củ tươi", "Sâm ngâm mật ong", "Trà sâm"].map(t => (
              <div key={t} style={{ marginBottom: 12 }}>
                <Link href="/products" style={{ color: "#7a5a30", fontSize: 13, textDecoration: "none" }}>{t}</Link>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", color: GOLD, marginBottom: 20 }}>LIÊN HỆ</div>
            {[
              { icon: "📞", val: "0919 198 522", sub: "Hotline 24/7" },
              { icon: "✉", val: "info@samvietnam.vn", sub: "Email" },
              { icon: "📍", val: "Đà Nẵng, Việt Nam", sub: "Văn phòng" },
              { icon: "🕐", val: "8:00 – 22:00", sub: "T2 – CN" },
            ].map(c => (
              <div key={c.sub} style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "flex-start" }}>
                <span style={{ fontSize: 15, marginTop: 1 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: 9, color: "#5a3e18", letterSpacing: "0.1em", marginBottom: 2 }}>{c.sub.toUpperCase()}</div>
                  <div style={{ color: "#a08050", fontSize: 13 }}>{c.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications bar */}
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", padding: "24px 0", borderTop: "1px solid rgba(201,168,76,0.1)", borderBottom: "1px solid rgba(201,168,76,0.1)", marginBottom: 24 }}>
          {["✓  Chứng nhận nguồn gốc", "✓  Kiểm định chất lượng", "✓  Bảo hành đổi trả", "✓  Giao hàng toàn quốc"].map(t => (
            <span key={t} style={{ fontSize: 11, color: "#7a5a30", letterSpacing: "0.05em" }}>{t}</span>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ color: "#3a2810", fontSize: 11, letterSpacing: "0.1em", margin: 0 }}>
            © 2024 SÂM VIỆT NAM — ALL RIGHTS RESERVED
          </p>
          <div style={{ display: "flex", gap: 24 }}>
            {["Chính sách bảo mật", "Điều khoản sử dụng"].map(t => (
              <a key={t} href="#" style={{ color: "#3a2810", fontSize: 11, textDecoration: "none" }}>{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
