import Link from "next/link";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

const GOLD = "#c9a84c";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main style={{
        background: "#faf7f0", minHeight: "70vh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "80px 24px",
      }}>
        <span style={{ fontSize: 56, opacity: 0.3, marginBottom: 16 }}>🌿</span>
        <div style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: 80, color: "#e8d9b0", lineHeight: 1, marginBottom: 8 }}>
          404
        </div>
        <h1 style={{
          fontFamily: "var(--font-serif), Georgia, serif", fontSize: 26, fontWeight: 400,
          color: "#1a1000", marginBottom: 12,
        }}>
          Không tìm thấy trang
        </h1>
        <p style={{ color: "#9e8860", fontSize: 14, marginBottom: 32, maxWidth: 420 }}>
          Trang bạn tìm có thể đã bị xóa hoặc không tồn tại. Hãy quay lại trang chủ hoặc xem sản phẩm của chúng tôi.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/" className="btn-glow" style={{
            padding: "12px 28px", fontSize: 12, letterSpacing: "0.12em",
            background: `linear-gradient(135deg, ${GOLD}, #9e7820)`, color: "#fff",
            borderRadius: 4, textDecoration: "none",
          }}>
            VỀ TRANG CHỦ
          </Link>
          <Link href="/products" style={{
            padding: "12px 28px", fontSize: 12, letterSpacing: "0.12em",
            border: `1px solid ${GOLD}66`, color: "#9e7820",
            borderRadius: 4, textDecoration: "none",
          }}>
            XEM SẢN PHẨM
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
