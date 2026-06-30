"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Post = { id: string; title: string; slug: string; isPublished: boolean; publishedAt: string | null; excerpt: string | null };
const GOLD = "#c9a84c";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "hidden">("all");

  useEffect(() => {
    fetch("/api/posts").then(r => r.json()).then(d => { setPosts(d); setLoading(false); });
  }, []);

  async function del(id: string) {
    if (!confirm("Xóa bài viết này?")) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    setPosts(prev => prev.filter(p => p.id !== id));
  }

  const filtered = posts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ? true :
      statusFilter === "published" ? p.isPublished :
      !p.isPublished;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ padding: "48px" }}>
      <div className="fade-in-up" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
        <div>
          <span style={{ fontSize: 10, letterSpacing: "0.25em", color: GOLD, display: "block", marginBottom: 8 }}>QUẢN LÝ</span>
          <h2 style={{ fontSize: 26, fontWeight: 400, color: "#1a1000", fontFamily: "var(--font-serif), Georgia, serif", margin: 0 }}>Tin tức</h2>
        </div>
        <Link href="/admin/posts/new" className="btn-glow btn-press" style={{ padding: "10px 22px", fontSize: 12, letterSpacing: "0.12em", background: "linear-gradient(135deg, #c9a84c, #9e7820)", color: "#fff", borderRadius: 4, textDecoration: "none" }}>
          + THÊM MỚI
        </Link>
      </div>

      <div className="fade-in-up" style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Tìm theo tiêu đề..."
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
            {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 48, marginBottom: 12 }} />)}
          </div>
        ) : filtered.length === 0 ? (
          <p style={{ textAlign: "center", padding: "64px", color: "#b09060", fontSize: 13 }}>
            {posts.length === 0 ? "Chưa có bài viết nào" : "Không tìm thấy bài viết phù hợp"}
          </p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#fdfaf3", borderBottom: "1px solid #ede0b8" }}>
                {["TIÊU ĐỀ", "SLUG", "TRẠNG THÁI", "NGÀY ĐĂNG", ""].map(h => (
                  <th key={h} style={{ padding: "14px 20px", textAlign: "left", fontSize: 10, letterSpacing: "0.18em", color: "#9e8050", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id} className="admin-row" style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f5eedc" : "none" }}>
                  <td style={{ padding: "16px 20px", color: "#1a1000", fontWeight: 500 }}>{p.title}</td>
                  <td style={{ padding: "16px 20px", color: "#b09060", fontSize: 12 }}>{p.slug}</td>
                  <td style={{ padding: "16px 20px" }}>
                    <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: p.isPublished ? "#f0faf0" : "#f5f5f5", color: p.isPublished ? "#2e7d32" : "#888" }}>
                      {p.isPublished ? "Hiển thị" : "Ẩn"}
                    </span>
                  </td>
                  <td style={{ padding: "16px 20px", color: "#7a6040" }}>
                    {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("vi-VN") : "—"}
                  </td>
                  <td style={{ padding: "16px 20px", textAlign: "right" }}>
                    <Link href={`/admin/posts/${p.id}/edit`} style={{ fontSize: 12, color: GOLD, marginRight: 16, textDecoration: "none" }}>Sửa</Link>
                    <button onClick={() => del(p.id)} style={{ fontSize: 12, color: "#c0392b", background: "none", border: "none", cursor: "pointer" }}>Xóa</button>
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
