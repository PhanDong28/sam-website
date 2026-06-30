import ProductForm from "@/components/admin/ProductForm";
const GOLD = "#c9a84c";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div style={{ padding: "48px" }}>
      <div style={{ marginBottom: 32 }}>
        <span style={{ fontSize: 10, letterSpacing: "0.25em", color: GOLD, display: "block", marginBottom: 8 }}>SẢN PHẨM</span>
        <h2 style={{ fontSize: 26, fontWeight: 400, color: "#1a1000", fontFamily: "var(--font-serif), Georgia, serif", margin: 0 }}>Chỉnh sửa sản phẩm</h2>
      </div>
      <ProductForm productId={id} />
    </div>
  );
}