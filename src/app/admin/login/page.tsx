"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setError("");
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.error) {
      setError(
        res.error === "CredentialsSignin"
          ? "Email hoặc mật khẩu không đúng"
          : res.error
      );
      setLoading(false);
    }
    else router.push("/admin");
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(201,168,76,0.25)", borderRadius: 4,
    padding: "12px 16px", fontSize: 13, color: "#f0d070",
    outline: "none", fontFamily: "inherit", boxSizing: "border-box",
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #0d0800, #1a1000, #241500)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="float-decor" style={{ position: "fixed", top: "20%", left: "15%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.06), transparent 70%)", pointerEvents: "none" }} />
      <div className="fade-in-up" style={{ width: "100%", maxWidth: 400, position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 9, letterSpacing: "0.35em", color: "#c9a84c", marginBottom: 12 }}>✦ QUẢN TRỊ HỆ THỐNG ✦</div>
          <h1 style={{ fontSize: 26, fontWeight: 400, color: "#f0d070", fontFamily: "var(--font-serif), Georgia, serif", margin: "0 0 12px" }}>Hậu Sâm</h1>
          <div style={{ width: 40, height: 1, background: "#c9a84c", margin: "0 auto" }} />
        </div>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 4, padding: "40px 36px" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "#c9a84c", marginBottom: 28 }}>ĐĂNG NHẬP</div>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{ display: "block", fontSize: 10, letterSpacing: "0.2em", color: "#7a6040", marginBottom: 8 }}>EMAIL</label>
              <input name="email" type="email" required placeholder="admin@hausam.vn" style={inputStyle} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 10, letterSpacing: "0.2em", color: "#7a6040", marginBottom: 8 }}>MẬT KHẨU</label>
              <input name="password" type="password" required placeholder="••••••••" style={inputStyle} />
            </div>
            {error && <div style={{ fontSize: 12, color: "#e07070", textAlign: "center", padding: "8px", background: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.2)", borderRadius: 4 }}>{error}</div>}
            <button type="submit" disabled={loading} style={{
              marginTop: 8, padding: "14px", fontSize: 11, letterSpacing: "0.2em",
              background: loading ? "rgba(201,168,76,0.4)" : "linear-gradient(135deg, #c9a84c, #9e7820)",
              color: "#fff", border: "none", borderRadius: 4,
              cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit",
            }}>
              {loading ? "ĐANG ĐĂNG NHẬP..." : "ĐĂNG NHẬP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
