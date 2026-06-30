"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

const GOLD = "#c9a84c";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Navbar />
      <main style={{
        background: "#faf7f0", minHeight: "70vh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "80px 24px",
      }}>
        <span style={{ fontSize: 56, opacity: 0.3, marginBottom: 16 }}>⚠️</span>
        <h1 style={{
          fontFamily: "var(--font-serif), Georgia, serif", fontSize: 26, fontWeight: 400,
          color: "#1a1000", marginBottom: 12,
        }}>
          Đã có lỗi xảy ra
        </h1>
        <p style={{ color: "#9e8860", fontSize: 14, marginBottom: 32, maxWidth: 420 }}>
          Rất tiếc, trang gặp sự cố khi tải. Vui lòng thử lại hoặc quay về trang chủ.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={() => reset()} className="btn-glow" style={{
            padding: "12px 28px", fontSize: 12, letterSpacing: "0.12em",
            background: `linear-gradient(135deg, ${GOLD}, #9e7820)`, color: "#fff",
            borderRadius: 4, border: "none", cursor: "pointer", fontFamily: "inherit",
          }}>
            THỬ LẠI
          </button>
          <Link href="/" style={{
            padding: "12px 28px", fontSize: 12, letterSpacing: "0.12em",
            border: `1px solid ${GOLD}66`, color: "#9e7820",
            borderRadius: 4, textDecoration: "none",
          }}>
            VỀ TRANG CHỦ
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
