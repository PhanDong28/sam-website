"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Sản phẩm" },
  { href: "/admin/categories", label: "Danh mục" },
  { href: "/admin/posts", label: "Tin tức" },
  { href: "/admin/contacts", label: "Liên hệ" },
];

const S = {
  wrap: { display: "flex", minHeight: "100vh", background: "#faf7f0" } as React.CSSProperties,
  aside: {
    width: 220, flexShrink: 0, display: "flex", flexDirection: "column",
    background: "#140d00",
    borderRight: "1px solid rgba(201,168,76,0.18)",
    position: "sticky", top: 0, height: "100vh", overflow: "hidden",
  } as React.CSSProperties,
  logoBox: {
    padding: "24px 28px 20px",
    borderBottom: "1px solid rgba(201,168,76,0.12)",
    display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
  } as React.CSSProperties,
  eyebrow: {
    fontSize: 9, letterSpacing: "0.28em", color: "#c9a84c",
    marginBottom: 0, display: "block", textAlign: "center",
  } as React.CSSProperties,
  logoText: {
    fontSize: 17, fontWeight: 400, color: "#f0d070",
    fontFamily: "var(--font-serif), Georgia, serif", letterSpacing: "0.04em", lineHeight: 1.3,
    textAlign: "center",
  } as React.CSSProperties,
  subText: {
    fontSize: 10, color: "#6b5020", letterSpacing: "0.18em", marginTop: 2, textAlign: "center",
  } as React.CSSProperties,
  nav: { flex: 1, padding: "20px 16px", display: "flex", flexDirection: "column", gap: 2 } as React.CSSProperties,
  divider: {
    height: 1, margin: "8px 0",
    background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
  } as React.CSSProperties,
  userBox: {
    padding: "16px 24px 24px",
    borderTop: "1px solid rgba(201,168,76,0.10)",
  } as React.CSSProperties,
  email: { fontSize: 11, color: "#5a4020", marginBottom: 10, display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const },
  logout: { fontSize: 11, letterSpacing: "0.12em", color: "#7a5c2e", background: "none", border: "none", cursor: "pointer", padding: 0 } as React.CSSProperties,
  main: { flex: 1, minHeight: "100vh", background: "#faf7f0" } as React.CSSProperties,
};

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link href={href} style={{
      display: "block",
      padding: "10px 14px",
      fontSize: 13,
      letterSpacing: "0.04em",
      color: active ? "#f0d070" : "#7a5c2e",
      background: active ? "rgba(201,168,76,0.10)" : "transparent",
      borderLeft: active ? "2px solid #c9a84c" : "2px solid transparent",
      borderRadius: "0 6px 6px 0",
      textDecoration: "none",
      transition: "all 0.15s",
    }}>
      {label}
    </Link>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="admin-shell" style={S.wrap}>
      <aside className="admin-aside" style={S.aside}>
        <div style={S.logoBox}>
          <span style={S.eyebrow}>— QUẢN TRỊ —</span>
          <Image
            src="/logo.webp"
            alt="Hữu Sâm"
            width={64}
            height={64}
            style={{ borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(201,168,76,0.4)" }}
          />
          <div style={S.logoText as React.CSSProperties}>Hữu Sâm</div>
          <div style={S.subText as React.CSSProperties}>SỨC KHỎE LÀ VÀNG</div>
        </div>

        <nav className="admin-nav" style={S.nav}>
          {navItems.map((item, i) => {
            const active = item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
            return (
              <div key={item.href}>
                {i === 1 && <div style={S.divider} />}
                <NavLink href={item.href} label={item.label} active={active} />
              </div>
            );
          })}
        </nav>

        <div style={S.userBox}>
          <span style={S.email}>{session?.user?.email}</span>
          <button
            style={S.logout}
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            onMouseOver={e => (e.currentTarget.style.color = "#c9a84c")}
            onMouseOut={e => (e.currentTarget.style.color = "#7a5c2e")}
          >
            ĐĂNG XUẤT
          </button>
        </div>
      </aside>

      <main style={S.main}>{children}</main>
    </div>
  );
}
