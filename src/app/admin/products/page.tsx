"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Category = { id: string; name: string };
type Product = {
  id: string; name: string;
  unit: string | null; images: string[]; isPublished: boolean; isFeatured: boolean;
  category: Category | null; createdAt: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "hidden">("all");

  useEffect(() => {
    fetch("/api/products").then(r => r.json()).then(data => { setProducts(data); setLoading(false); });
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Xóa sản phẩm này?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts(prev => prev.filter(p => p.id !== id));
  }

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true :
      statusFilter === "published" ? p.isPublished :
      !p.isPublished;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: "48px 48px 64px" }}>
      <div className="fade-in-up" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
        <div>
          <span style={{ fontSize: 10, letterSpacing: "0.25em", color: "#c9a84c", display: "block", marginBottom: 8 }}>QUẢN LÝ</span>
          <h2 style={{ fontSize: 26, fontWeight: 400, color: "#1a1000", fontFamily: "var(--font-serif), Georgia, serif", margin: 0 }}>Sản phẩm</h2>
        </div>
        <Link href="/admin/products/new" className="btn-glow btn-press" style={{
          padding: "10px 22px", fontSize: 12, letterSpacing: "0.12em",
          background: "linear-gradient(135deg, #c9a84c, #9e7820)",
          color: "#fff", borderRadius: 4, textDecoration: "none",
        }}>
          + THÊM MỚI
        </Link>
      </div>

      <div className="fade-in-up" style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Tìm theo tên sản phẩm..."
          style={{
            flex: "1 1 240px", padding: "10px 16px", fontSize: 13, borderRadius: 6,
            border: "1px solid #e2d5b0", background: "#fffdf7", outline: "none", fontFamily: "inherit", color: "#1a1000",
          }}
        />
        <div style={{ display: "flex", gap: 8 }}>
          {([
            { key: "all", label: "Tất cả" },
            { key: "published", label: "Hiển thị" },
            { key: "hidden", label: "Ẩn" },
          ] as const).map(s => (
            <button
              key={s.key}
              onClick={() => setStatusFilter(s.key)}
              style={{
                fontSize: 12, padding: "8px 16px", borderRadius: 20, cursor: "pointer", letterSpacing: "0.03em",
                fontFamily: "inherit",
                ...(statusFilter === s.key
                  ? { background: "linear-gradient(135deg, #c9a84c, #9e7820)", color: "#fff", border: "none" }
                  : { background: "#fff", color: "#7a6040", border: "1px solid #e8d9b0" }),
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="fade-in-up" style={{ background: "#fff", border: "1px solid #e8d9b0", borderRadius: 6, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: 24 }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 48, marginBottom: 12 }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p style={{ textAlign: "center", padding: "64px 0", color: "#b09060", fontSize: 13 }}>
            {products.length === 0 ? "Chưa có sản phẩm nào" : "Không tìm thấy sản phẩm phù hợp"}
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
                <tr style={{ background: "#fdfaf3", borderBottom: "1px solid #ede0b8" }}>
                {["", "TÊN SẢN PHẨM", "DANH MỤC", "TRẠNG THÁI", ""].map((h, idx) => (
                    <th key={idx} style={{ padding: "14px 20px", textAlign: "left", fontSize: 10, letterSpacing: "0.18em", color: "#9e8050", fontWeight: 600 }}>{h}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                    {filtered.map((p, i) => (
        <tr key={p.id} className="admin-row" style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f5eedc" : "none" }}>
            <td style={{ padding: "12px 20px" }}>
            {p.images?.[0] ? (
                <Image src={p.images[0]} alt="" width={44} height={44} style={{ objectFit: "cover", borderRadius: 4 }} />
            ) : (
                <div style={{ width: 44, height: 44, borderRadius: 4, background: "#f5f0e4" }} />
            )}
            </td>
            <td style={{ padding: "16px 20px", color: "#1a1000", fontWeight: 500 }}>
            {p.name}
            {p.isFeatured && (
                <span style={{ marginLeft: 8, fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "#fef6e0", color: "#9e7820", letterSpacing: "0.08em" }}>
                NỔI BẬT
                </span>
            )}
            </td>
            <td style={{ padding: "16px 20px", color: "#7a6040" }}>{p.category?.name ?? "—"}</td>
            <td style={{ padding: "16px 20px" }}>
            <span style={{
                fontSize: 11, padding: "3px 10px", borderRadius: 20, letterSpacing: "0.06em",
                background: p.isPublished ? "#f0faf0" : "#f5f5f5",
                color: p.isPublished ? "#2e7d32" : "#888",
            }}>
                {p.isPublished ? "Hiển thị" : "Ẩn"}
            </span>
            </td>
            <td style={{ padding: "16px 20px", textAlign: "right" }}>
            <Link href={`/admin/products/${p.id}/edit`} style={{ fontSize: 12, color: "#c9a84c", marginRight: 16, textDecoration: "none", letterSpacing: "0.06em" }}>
                Sửa
            </Link>
            <button onClick={() => handleDelete(p.id)} style={{ fontSize: 12, color: "#c0392b", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.06em" }}>
                Xóa
            </button>
            </td>
        </tr>
        ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}