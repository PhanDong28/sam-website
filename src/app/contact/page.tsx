"use client";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { useState } from "react";

const GOLD = "#c9a84c";
const inp: React.CSSProperties = {
  width: "100%", border: "1px solid #e2d5b0", borderRadius: 6,
  padding: "12px 16px", fontSize: 14, color: "#1a1000",
  background: "#fffdf7", outline: "none", fontFamily: "inherit",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [focused, setFocused] = useState<string | null>(null);

  function handle(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function fieldStyle(name: string): React.CSSProperties {
    return {
      ...inp,
      borderColor: focused === name ? GOLD : "#e2d5b0",
      boxShadow: focused === name ? `0 0 0 3px ${GOLD}22` : "none",
    };
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const res = await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? "success" : "error");
    if (res.ok) setForm({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <div style={{ background: "#faf7f0", minHeight: "100vh" }}>
      <Navbar />
      <div>
        <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(160deg, #140d00, #1e1200)", padding: "80px 24px 64px", borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
          <div className="float-decor" style={{
            position: "absolute", top: -50, right: "6%", width: 200, height: 200,
            background: `radial-gradient(circle, ${GOLD}22, transparent 70%)`, borderRadius: "50%", pointerEvents: "none",
          }} />
          <div className="fade-in-up" style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{ width: 32, height: 1, background: GOLD }} />
              <span style={{ fontSize: 10, letterSpacing: "0.3em", color: GOLD }}>LIÊN HỆ VÀ TƯ VẤN</span>
            </div>
            <h1 className="hero-title-lg" style={{ fontSize: 40, fontWeight: 300, color: "#f0d070", fontFamily: "var(--font-serif), Georgia, serif", margin: 0 }}>
              Chúng Tôi Luôn Sẵn Sàng
            </h1>
            <p style={{ color: "#9e8860", fontSize: 14, marginTop: 14, maxWidth: 480 }}>
              Để lại thông tin, chúng tôi sẽ liên hệ tư vấn trong vòng 24 giờ.
            </p>
          </div>
        </div>

        <div className="grid-2" style={{ maxWidth: 1180, margin: "0 auto", padding: "64px 24px" }}>
          {/* Info */}
          <div className="fade-in-up">
            <div style={{ fontSize: 10, letterSpacing: "0.25em", color: GOLD, marginBottom: 24 }}>THÔNG TIN LIÊN HỆ</div>
            {[
              { icon: "📞", label: "Điện thoại", val: "0919 198 522" },
              { icon: "✉", label: "Email", val: "info@samvietnam.vn" },
              { icon: "📍", label: "Địa chỉ", val: "Đà Nẵng, Việt Nam" },
              { icon: "🕐", label: "Giờ làm việc", val: "8:00 – 17:30, T2–T7" },
            ].map(c => (
              <div key={c.label} className="lift-hover" style={{ display: "flex", gap: 16, marginBottom: 16, padding: "10px 12px", borderRadius: 6 }}>
                <span style={{ fontSize: 20, marginTop: 2 }}>{c.icon}</span>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: "0.15em", color: GOLD, marginBottom: 4 }}>{c.label.toUpperCase()}</div>
                  <div style={{ fontSize: 14, color: "#3a2a00" }}>{c.val}</div>
                </div>
              </div>
            ))}

            <div className="lift-hover" style={{ marginTop: 24, padding: "24px", background: "#fff", border: "1px solid #e8d9b0", borderRadius: 8, position: "relative", overflow: "hidden" }}>
              <div className="pulse-decor" style={{
                position: "absolute", top: -16, right: -16, width: 64, height: 64,
                background: `radial-gradient(circle, ${GOLD}30, transparent)`, borderRadius: "50%",
              }} />
              <div style={{ fontSize: 10, letterSpacing: "0.2em", color: GOLD, marginBottom: 12 }}>CAM KẾT</div>
              <p style={{ color: "#7a6040", fontSize: 13, lineHeight: 1.8, margin: 0 }}>
                100% sâm nguyên gốc, có chứng nhận nguồn gốc. Hoàn tiền nếu không đúng chất lượng.
              </p>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
              {["Facebook", "Zalo", "Youtube"].map(s => (
                <a key={s} href="#" className="lift-hover" style={{
                  padding: "8px 16px", fontSize: 11, color: GOLD,
                  border: `1px solid rgba(201,168,76,0.3)`, borderRadius: 20,
                  textDecoration: "none", letterSpacing: "0.05em", background: "#fff",
                }}>{s}</a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="fade-in-up" style={{ background: "#fff", border: "1px solid #e8d9b0", borderRadius: 8, padding: "40px", position: "relative", overflow: "hidden" }}>
            <div className="float-decor" style={{
              position: "absolute", bottom: -40, right: -40, width: 120, height: 120,
              background: `radial-gradient(circle, ${GOLD}14, transparent 70%)`, borderRadius: "50%",
              animationDelay: "2s", pointerEvents: "none",
            }} />
            <div style={{ fontSize: 10, letterSpacing: "0.25em", color: GOLD, marginBottom: 28, position: "relative" }}>GỬI YÊU CẦU</div>
            {status === "success" ? (
              <div className="fade-in-up" style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h3 style={{ color: "#1a1000", fontFamily: "var(--font-serif), Georgia, serif", fontWeight: 400, marginBottom: 12 }}>Gửi thành công!</h3>
                <p style={{ color: "#9e8860", fontSize: 13, marginBottom: 24 }}>Chúng tôi sẽ liên hệ lại trong vòng 24 giờ.</p>
                <button onClick={() => setStatus("idle")} className="btn-press" style={{
                  fontSize: 12, letterSpacing: "0.1em", color: GOLD, background: "none",
                  border: `1px solid ${GOLD}66`, borderRadius: 4, padding: "10px 24px", cursor: "pointer",
                }}>GỬI YÊU CẦU KHÁC</button>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative" }}>
                <div className="form-row">
                  <div>
                    <label style={{ display: "block", fontSize: 10, letterSpacing: "0.2em", color: "#9e8050", marginBottom: 8 }}>HỌ TÊN *</label>
                    <input name="name" value={form.name} onChange={handle} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} required style={fieldStyle("name")} placeholder="Nguyễn Văn A" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 10, letterSpacing: "0.2em", color: "#9e8050", marginBottom: 8 }}>SỐ ĐIỆN THOẠI</label>
                    <input name="phone" value={form.phone} onChange={handle} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} style={fieldStyle("phone")} placeholder="0919 198 522" />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 10, letterSpacing: "0.2em", color: "#9e8050", marginBottom: 8 }}>EMAIL *</label>
                  <input name="email" type="email" value={form.email} onChange={handle} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} required style={fieldStyle("email")} placeholder="email@example.com" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 10, letterSpacing: "0.2em", color: "#9e8050", marginBottom: 8 }}>NỘI DUNG</label>
                  <textarea name="message" value={form.message} onChange={handle} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} rows={5} style={{ ...fieldStyle("message"), resize: "vertical" }} placeholder="Tôi muốn hỏi về sâm Ngọc Linh..." />
                </div>
                {status === "error" && (
                  <p className="fade-in" style={{ color: "#c0392b", fontSize: 13 }}>Có lỗi xảy ra. Vui lòng thử lại.</p>
                )}
                <button type="submit" disabled={status === "loading"} className="btn-glow btn-press" style={{
                  padding: "14px", fontSize: 12, letterSpacing: "0.18em",
                  background: status === "loading" ? "#c9a84c88" : "linear-gradient(135deg, #c9a84c, #9e7820)",
                  color: "#fff", border: "none", borderRadius: 6, cursor: status === "loading" ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                }}>
                  {status === "loading" ? "ĐANG GỬI..." : "GỬI YÊU CẦU"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="fade-in-up" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px 80px" }}>
          <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e8d9b0", height: 320 }}>
            <iframe
              title="Bản đồ"
              src="https://www.google.com/maps?q=H%C3%A0%20N%E1%BB%99i%2C%20Vi%E1%BB%87t%20Nam&output=embed"
              style={{ width: "100%", height: "100%", border: 0, filter: "sepia(15%) saturate(85%)" }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
