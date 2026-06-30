import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import type { Metadata } from "next";

export const revalidate = 0;

const GOLD = "#c9a84c";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug, isPublished: true } });
  if (!product) return { title: "Sản phẩm không tồn tại | Hữu Sâm" };

  const title = `${product.name} | Hữu Sâm`;
  const description = product.description
    ? product.description.slice(0, 160)
    : `${product.name} – sâm chính gốc Việt Nam, nguồn gốc rõ ràng. Liên hệ Hữu Sâm để được báo giá tốt nhất.`;
  const image = product.images?.[0];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : undefined,
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug, isPublished: true },
    include: { category: true },
  });

  if (!product) return notFound();

  const related = await prisma.product.findMany({
    where: {
      isPublished: true,
      id: { not: product.id },
      ...(product.categoryId ? { categoryId: product.categoryId } : {}),
    },
    take: 3,
  });

  return (
    <>
      <Navbar />
      <main style={{ background: "#faf7f0", minHeight: "100vh" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "32px 32px 0" }}>
          <Link href="/products" style={{ fontSize: 12, color: "#9e7820", textDecoration: "none", letterSpacing: "0.05em" }}>
            ← Tất cả sản phẩm
          </Link>
        </div>

        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "32px 32px 80px" }}>
          <div className="grid-detail">

            <div className="fade-in-up">
              <div style={{
                aspectRatio: "1", borderRadius: 4, overflow: "hidden", marginBottom: 14,
                background: "linear-gradient(135deg, #f0e6cc, #e8d9b0)",
                boxShadow: "0 8px 32px rgba(201,168,76,0.18)",
                position: "relative",
              }}>
                {product.images?.[0] ? (
                  <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 64, opacity: 0.3 }}>🌿</span>
                  </div>
                )}
                {product.isFeatured && (
                  <div style={{
                    position: "absolute", top: 16, left: 16,
                    background: `linear-gradient(135deg, ${GOLD}, #9e7820)`,
                    color: "#fff", fontSize: 10, letterSpacing: "0.15em",
                    padding: "6px 14px", borderRadius: 2,
                  }}>SẢN PHẨM NỔI BẬT</div>
                )}
              </div>

              {product.images.length > 1 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                  {product.images.slice(1, 5).map((img, i) => (
                    <div key={i} style={{ aspectRatio: "1", borderRadius: 4, overflow: "hidden", background: "#f0e6cc", position: "relative" }}>
                      <Image src={img} alt="" fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "cover" }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="fade-in-up">
              {product.category && (
                <Link href={`/products?category=${product.category.slug}`} style={{
                  fontSize: 11, letterSpacing: "0.2em", color: GOLD, textDecoration: "none",
                  display: "inline-block", marginBottom: 14,
                }}>
                  {product.category.name.toUpperCase()}
                </Link>
              )}

              <h1 style={{
                fontFamily: "var(--font-serif), Georgia, serif", fontSize: 38, color: "#1a1000",
                fontWeight: 400, lineHeight: 1.3, margin: "0 0 20px",
              }}>
                {product.name}
              </h1>

              <div style={{ display: "flex", gap: 24, marginBottom: 28, flexWrap: "wrap" }}>
                {product.unit && (
                  <div style={{ fontSize: 13, color: "#7a6040" }}>
                    <span style={{ color: "#b09060" }}>Đơn vị:</span> <strong style={{ color: "#1a1000" }}>{product.unit}</strong>
                  </div>
                )}
              </div>

              {product.description && (
                <p style={{ fontSize: 15, color: "#5a4020", lineHeight: 1.85, marginBottom: 32 }}>
                  {product.description}
                </p>
              )}

              <div style={{
                background: "linear-gradient(135deg, #fff, #fdfaf3)",
                border: `1px solid ${GOLD}55`,
                borderRadius: 6, padding: "26px 30px", marginBottom: 28,
                position: "relative", overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: -20, right: -20, width: 80, height: 80,
                  background: `radial-gradient(circle, ${GOLD}22, transparent)`, borderRadius: "50%",
                }} />
                <p style={{ fontSize: 11, letterSpacing: "0.15em", color: "#9e8050", marginBottom: 6 }}>GIÁ SẢN PHẨM</p>
                <p style={{ fontSize: 20, color: "#9e7820", fontWeight: 600, fontFamily: "var(--font-serif), Georgia, serif" }}>
                  Liên hệ để được báo giá tốt nhất
                </p>
                <p style={{ fontSize: 12, color: "#b09060", marginTop: 6 }}>
                  Giá ưu đãi cho khách hàng đặt số lượng lớn
                </p>
              </div>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link href="/contact" className="btn-glow" style={{
                  padding: "16px 40px", fontSize: 12, letterSpacing: "0.15em",
                  background: `linear-gradient(135deg, ${GOLD}, #9e7820)`, color: "#fff",
                  borderRadius: 3, textDecoration: "none", display: "inline-block",
                }}>
                  LIÊN HỆ BÁO GIÁ
                </Link>
                
              </div>

              <div style={{ display: "flex", gap: 28, marginTop: 36, paddingTop: 28, borderTop: "1px solid #e8d9b0" }}>
                {[
                  { icon: "✓", label: "Chính gốc 100%" },
                  { icon: "✓", label: "Giao hàng toàn quốc" },
                  { icon: "✓", label: "Bảo hành đổi trả" },
                ].map((b) => (
                  <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#7a6040" }}>
                    <span style={{ color: GOLD }}>{b.icon}</span> {b.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div style={{ marginTop: 96 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                <div style={{ width: 32, height: 1, background: GOLD }} />
                <span style={{ fontSize: 11, letterSpacing: "0.2em", color: GOLD }}>SẢN PHẨM LIÊN QUAN</span>
              </div>
              <div className="grid-3">
                {related.map((p) => (
                  <Link key={p.id} href={`/products/${p.slug}`} style={{ textDecoration: "none" }}>
                    <div className="card-hover lift-hover" style={{ background: "#fff", border: "1px solid #e8d9b0", borderRadius: 4, overflow: "hidden" }}>
                      <div className="img-zoom" style={{ aspectRatio: "4/3", background: "#f0e6cc", position: "relative", overflow: "hidden" }}>
                        {p.images?.[0] && <Image src={p.images[0]} alt={p.name} fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "cover" }} />}
                      </div>
                      <div style={{ padding: "16px 18px" }}>
                        <h3 style={{ fontSize: 14, color: "#1a1000", margin: 0, fontWeight: 500 }}>{p.name}</h3>
                        <span style={{ fontSize: 11, color: GOLD }}>Liên hệ báo giá →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}