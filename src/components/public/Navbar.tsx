"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const GOLD = "#c9a84c";

const navItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/products", label: "Sản phẩm" },
  { href: "/news", label: "Tin tức" },
  { href: "/contact", label: "Liên hệ" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "#0f0a00cc",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(201,168,76,0.2)",
    }}>
      <div style={{
        maxWidth: 1180, margin: "0 auto", padding: "10px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
          <Image
            src="/logo.webp"
            alt="Hữu Sâm Logo"
            width={52}
            height={52}
            style={{ borderRadius: "50%", objectFit: "cover" }}
            priority
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: 20, color: "#f0d070", letterSpacing: "0.04em", lineHeight: 1 }}>
              Hữu Sâm
            </span>
            <span style={{ fontSize: 9, color: GOLD, letterSpacing: "0.25em" }}>✦ SỨC KHỎE LÀ VÀNG ✦</span>
          </div>
        </Link>

        <nav className="nav-links-desktop" style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className="link-underline"
                style={{
                  fontSize: 13, letterSpacing: "0.04em",
                  color: active ? GOLD : "#a89070",
                  paddingBottom: 3,
                  transition: "color 0.2s",
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/contact" className="btn-glow btn-press" style={{
            padding: "8px 20px", fontSize: 11, letterSpacing: "0.12em",
            background: `linear-gradient(135deg, ${GOLD}, #9e7820)`,
            color: "#fff", borderRadius: 2, textDecoration: "none",
          }}>
            BÁO GIÁ
          </Link>
        </nav>

        {/* Mobile burger */}
        <button
          className="nav-burger"
          aria-label="Mở menu"
          onClick={() => setOpen(o => !o)}
        >
          <span style={{ transform: open ? "translateY(7px) rotate(45deg)" : "none" }} />
          <span style={{ opacity: open ? 0 : 1 }} />
          <span style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        style={{
          maxHeight: open ? 320 : 0,
          overflow: "hidden",
          transition: "max-height 0.3s ease",
          background: "#0f0a00f5",
          borderTop: open ? "1px solid rgba(201,168,76,0.15)" : "none",
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column", padding: open ? "12px 24px 20px" : "0 24px" }}>
          {navItems.map((item, i) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: "14px 4px",
                  fontSize: 14, letterSpacing: "0.04em", textDecoration: "none",
                  color: active ? GOLD : "#cbb589",
                  borderBottom: i < navItems.length - 1 ? "1px solid rgba(201,168,76,0.1)" : "none",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(-6px)",
                  transition: `opacity 0.3s ease ${i * 0.04}s, transform 0.3s ease ${i * 0.04}s`,
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/contact" className="btn-glow" style={{
            marginTop: 16, textAlign: "center",
            padding: "12px", fontSize: 12, letterSpacing: "0.12em",
            background: `linear-gradient(135deg, ${GOLD}, #9e7820)`,
            color: "#fff", borderRadius: 4, textDecoration: "none",
          }}>
            BÁO GIÁ NGAY
          </Link>
        </nav>
      </div>
    </header>
  );
}
