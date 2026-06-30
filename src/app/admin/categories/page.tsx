"use client";
import { useEffect, useState } from "react";

type Category = { id: string; name: string; slug: string; _count?: { products: number } };

const inp: React.CSSProperties = { border: "1px solid #e2d5b0", borderRadius: 4, padding: "9px 14px", fontSize: 13, color: "#1a1000", background: "#fffdf7", outline: "none", fontFamily: "inherit", width: "100%" };
const GOLD = "#c9a84c";

export default function CategoriesPage() {
  const [cats, setCats] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  function fetchCats() {
    fetch("/api/categories").then(r => r.json()).then(d => { setCats(d); setLoading(false); });
  }
  useEffect(() => { fetchCats(); }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    const slug = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").replace(/[^a-z0-9\s-]/g,"").trim().replace(/\s+/g,"-");
    await fetch("/api/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, slug }) });
    setName(""); setSaving(false); fetchCats();
  }

  async function handleDelete(id: string) {
    if (!confirm("Xóa danh mục này?")) return;
    await fetch(`/api/categories/${id}`, { method: "DELETE" });
    setCats(prev => prev.filter(c => c.id !== id));
  }

  return (
    <div style={{ padding: "48px" }}>
      <div className="fade-in-up" style={{ marginBottom: 36 }}>
        <span style={{ fontSize: 10, letterSpacing: "0.25em", color: GOLD, display: "block", marginBottom: 8 }}>QUẢN LÝ</span>
        <h2 style={{ fontSize: 26, fontWeight: 400, color: "#1a1000", fontFamily: "var(--font-serif), Georgia, serif", margin: 0 }}>Danh mục</h2>
      </div>

      {/* Add form */}
      <div className="fade-in-up" style={{ background: "#fff", border: "1px solid #e8d9b0", borderRadius: 6, padding: "28px 28px 24px", marginBottom: 28, maxWidth: 520 }}>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", color: GOLD, marginBottom: 16 }}>THÊM DANH MỤC MỚI</div>
        <form onSubmit={handleAdd} style={{ display: "flex", gap: 12 }}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Tên danh mục..." style={inp} required />
          <button type="submit" disabled={saving} className="btn-glow btn-press" style={{
            padding: "9px 22px", fontSize: 11, letterSpacing: "0.12em", whiteSpace: "nowrap",
            background: "linear-gradient(135deg, #c9a84c, #9e7820)", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", fontFamily: "inherit",
          }}>
            {saving ? "..." : "+ THÊM"}
          </button>
        </form>
      </div>

      {/* List */}
      <div className="fade-in-up" style={{ background: "#fff", border: "1px solid #e8d9b0", borderRadius: 6, overflow: "hidden", maxWidth: 520 }}>
        {loading ? (
          <div style={{ padding: 20 }}>
            {[...Array(3)].map((_, i) => <div key={i} className="skeleton" style={{ height: 44, marginBottom: 10 }} />)}
          </div>
        ) : cats.length === 0 ? (
          <p style={{ textAlign: "center", padding: "40px", color: "#b09060", fontSize: 13 }}>Chưa có danh mục</p>
        ) : cats.map((c, i) => (
          <div key={c.id} className="admin-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: i < cats.length - 1 ? "1px solid #f5eedc" : "none" }}>
            <div>
              <div style={{ fontSize: 14, color: "#1a1000", fontWeight: 500 }}>{c.name}</div>
              <div style={{ fontSize: 11, color: "#b09060", marginTop: 2 }}>{c.slug}</div>
            </div>
            <button onClick={() => handleDelete(c.id)} style={{ fontSize: 12, color: "#c0392b", background: "none", border: "none", cursor: "pointer" }}>Xóa</button>
          </div>
        ))}
      </div>
    </div>
  );
}
