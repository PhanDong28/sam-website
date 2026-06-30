"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";

type Category = { id: string; name: string };

type ProductInput = {
  name: string;
  slug: string;
  description: string;
  unit: string;
  categoryId: string;
  images: string[];
  isFeatured: boolean;
  isPublished: boolean;
};

const empty: ProductInput = {
  name: "", slug: "", description: "", unit: "",
  categoryId: "", images: [], isFeatured: false, isPublished: true,
};

function toSlug(s: string) {
  return s.toLowerCase().normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

const inp: React.CSSProperties = {
  width: "100%", border: "1px solid #e2d5b0", borderRadius: 4,
  padding: "10px 14px", fontSize: 13, color: "#1a1000",
  background: "#fffdf7", outline: "none", boxSizing: "border-box", fontFamily: "inherit",
};
const lbl: React.CSSProperties = {
  display: "block", fontSize: 10, letterSpacing: "0.2em",
  color: "#9e8050", marginBottom: 8, fontWeight: 500,
};

export default function ProductForm({ productId }: { productId?: string }) {
  const router = useRouter();
  const [form, setForm] = useState<ProductInput>(empty);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    fetch("/api/categories").then(r => r.json()).then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    if (productId) {
      fetch(`/api/products/${productId}`).then(r => r.json()).then(p => {
        setForm({
          name: p.name ?? "",
          slug: p.slug ?? "",
          description: p.description ?? "",
          unit: p.unit ?? "",
          categoryId: p.categoryId ?? "",
          images: p.images ?? [],
          isFeatured: !!p.isFeatured,
          isPublished: !!p.isPublished,
        });
        setDirty(false);
      });
    }
  }, [productId]);

  // Cảnh báo nếu rời/đóng tab khi đang có thay đổi chưa lưu
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (!dirty) return;
      e.preventDefault();
      e.returnValue = "";
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [dirty]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setForm(prev => {
      const next = { ...prev, [name]: val };
      if (name === "name") next.slug = toSlug(value);
      return next;
    });
    setDirty(true);
  }

  function handleImagesChange(images: string[]) {
    setForm(prev => ({ ...prev, images }));
    setDirty(true);
  }

  function goBack() {
    if (dirty && !confirm("Bạn có thay đổi chưa lưu. Rời khỏi trang và bỏ qua thay đổi?")) return;
    router.push("/admin/products");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const payload = {
      ...form,
      categoryId: form.categoryId || null,
    };
    const res = productId
      ? await fetch(`/api/products/${productId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      : await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) {
      setDirty(false);
      router.push("/admin/products");
    } else {
      setError("Có lỗi xảy ra, thử lại.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: 760, background: "#fff", border: "1px solid #e8d9b0",
      borderRadius: 4, padding: "40px", display: "flex", flexDirection: "column", gap: 24,
    }}>
      {/* Tên & Slug */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <label style={lbl}>TÊN SẢN PHẨM *</label>
          <input name="name" value={form.name} onChange={handleChange} required style={inp} placeholder="Sâm Ngọc Linh 20 năm tuổi..." />
        </div>
        <div>
          <label style={lbl}>SLUG *</label>
          <input name="slug" value={form.slug} onChange={handleChange} required style={inp} />
        </div>
      </div>

      {/* Danh mục & đơn vị */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <label style={lbl}>DANH MỤC</label>
          <select name="categoryId" value={form.categoryId} onChange={handleChange} style={inp}>
            <option value="">— Không chọn —</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={lbl}>ĐƠN VỊ</label>
          <input name="unit" value={form.unit} onChange={handleChange} style={inp} placeholder="kg, củ, bình..." />
        </div>
      </div>

      {/* Ảnh sản phẩm */}
      <div>
        <label style={lbl}>HÌNH ẢNH SẢN PHẨM</label>
        <ImageUploader images={form.images} onChange={handleImagesChange} />
      </div>

      {/* Mô tả */}
      <div>
        <label style={lbl}>MÔ TẢ</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows={6}
          style={{ ...inp, resize: "vertical" }} placeholder="Mô tả chi tiết sản phẩm..." />
      </div>

      {/* Cờ trạng thái */}
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#5a4020", cursor: "pointer" }}>
          <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange}
            style={{ width: 15, height: 15, accentColor: "#c9a84c" }} />
          Hiển thị công khai
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#5a4020", cursor: "pointer" }}>
          <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange}
            style={{ width: 15, height: 15, accentColor: "#c9a84c" }} />
          Sản phẩm nổi bật
        </label>
      </div>

      <div style={{ height: 1, background: "linear-gradient(90deg, #e8d9b0, transparent)" }} />
      {error && <p style={{ color: "#c0392b", fontSize: 13 }}>{error}</p>}

      <div style={{ display: "flex", gap: 12 }}>
        <button type="submit" disabled={loading} style={{
          padding: "11px 28px", fontSize: 12, letterSpacing: "0.12em",
          background: loading ? "#c9a84c88" : "linear-gradient(135deg, #c9a84c, #9e7820)",
          color: "#fff", border: "none", borderRadius: 4,
          cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit",
        }}>
          {loading ? "ĐANG LƯU..." : productId ? "CẬP NHẬT" : "THÊM SẢN PHẨM"}
        </button>
        <button type="button" onClick={goBack} style={{
          padding: "11px 24px", fontSize: 12, letterSpacing: "0.12em",
          background: "#f5f0e4", color: "#7a5c2e",
          border: "1px solid #e2d5b0", borderRadius: 4, cursor: "pointer", fontFamily: "inherit",
        }}>HỦY</button>
      </div>
    </form>
  );
}
