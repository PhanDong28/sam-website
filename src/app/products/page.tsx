import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import type { Metadata } from "next";

const GOLD = "#c9a84c";

export const metadata: Metadata = {
  title: "Toàn Bộ Sản Phẩm | Hữu Sâm",
  description: "Sâm Ngọc Linh, sâm Lai Châu, rượu sâm và các sản phẩm sâm chính gốc Việt Nam, nguồn gốc rõ ràng, chất lượng đảm bảo.",
};

const PAGE_SIZE = 12;

type ProductOrderBy =
  | { isFeatured?: "asc" | "desc"; createdAt?: "asc" | "desc"; name?: "asc" | "desc" }
  | { isFeatured?: "asc" | "desc"; createdAt?: "asc" | "desc"; name?: "asc" | "desc" }[];

const SORT_OPTIONS: Record<string, { label: string; orderBy: ProductOrderBy }> = {
  featured: { label: "Nổi bật trước", orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }] },
  newest: { label: "Mới nhất", orderBy: [{ createdAt: "desc" }] },
  nameAsc: { label: "Tên A → Z", orderBy: [{ name: "asc" }] },
  nameDesc: { label: "Tên Z → A", orderBy: [{ name: "desc" }] },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; sort?: string; page?: string }>;
}) {
  const { category, q, sort, page } = await searchParams;
  const sortKey = sort && SORT_OPTIONS[sort] ? sort : "featured";
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);

  const where = {
    isPublished: true,
    ...(category ? { category: { slug: category } } : {}),
    ...(q ? { name: { contains: q, mode: "insensitive" as const } } : {}),
  };

  const [products, totalCount, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      orderBy: SORT_OPTIONS[sortKey].orderBy,
      include: { category: true },
      skip: (currentPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  function pageHref(p: number) {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (q) params.set("q", q);
    if (sort) params.set("sort", sort);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
    return qs ? `/products?${qs}` : "/products";
  }

  return (
    <>
      <Navbar />
      <div style={{ background: "#faf7f0", minHeight: "100vh" }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(160deg, #140d00, #1e1200)",
          padding: "72px 32px 56px",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
        }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
              <div style={{ width: 32, height: 1, background: GOLD }} />
              <span style={{ fontSize: 10, letterSpacing: "0.3em", color: GOLD }}>BỘ SƯU TẬP</span>
            </div>
            <h1 style={{ fontSize: 38, fontWeight: 300, color: "#f0d070", fontFamily: "var(--font-serif), Georgia, serif", margin: 0 }}>
              Toàn Bộ Sản Phẩm
            </h1>
          </div>
        </div>

        {/* Search + sort toolbar */}
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "28px 32px 0" }}>
          <form action="/products" method="get" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {category && <input type="hidden" name="category" value={category} />}
            <div style={{ position: "relative", flex: "1 1 260px" }}>
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#b09060", fontSize: 14 }}>🔍</span>
              <input
                type="text"
                name="q"
                defaultValue={q || ""}
                placeholder="Tìm kiếm sản phẩm..."
                style={{
                  width: "100%", padding: "12px 16px 12px 40px", fontSize: 13,
                  border: "1px solid #e2d5b0", borderRadius: 6, background: "#fff",
                  color: "#1a1000", outline: "none", boxSizing: "border-box",
                }}
              />
            </div>
            <select
              name="sort"
              defaultValue={sortKey}
              style={{
                padding: "12px 16px", fontSize: 13, border: "1px solid #e2d5b0",
                borderRadius: 6, background: "#fff", color: "#5a4020", outline: "none",
              }}
            >
              {Object.entries(SORT_OPTIONS).map(([key, opt]) => (
                <option key={key} value={key}>{opt.label}</option>
              ))}
            </select>
            <button type="submit" className="btn-glow btn-press" style={{
              padding: "12px 28px", fontSize: 12, letterSpacing: "0.1em", fontWeight: 500,
              background: `linear-gradient(135deg, ${GOLD}, #9e7820)`, color: "#fff",
              border: "none", borderRadius: 6, cursor: "pointer",
            }}>
              LỌC
            </button>
            {(q || sort) && (
              <Link href={category ? `/products?category=${category}` : "/products"} style={{
                padding: "12px 18px", fontSize: 12, color: "#9e7820", textDecoration: "none",
                border: "1px solid #e8d9b0", borderRadius: 6, display: "flex", alignItems: "center",
              }}>
                Xóa lọc
              </Link>
            )}
          </form>
        </div>

        {/* Category chips */}
        {categories.length > 0 && (
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "20px 32px 0", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <Link href={q || sort ? `/products?${new URLSearchParams({ ...(q ? { q } : {}), ...(sort ? { sort } : {}) }).toString()}` : "/products"} style={{
              fontSize: 12, padding: "9px 20px", borderRadius: 20, textDecoration: "none",
              letterSpacing: "0.03em", fontWeight: 500, transition: "all 0.2s ease",
              ...(category ? {
                border: "1px solid #e8d9b0", color: "#7a6040", background: "#fff",
              } : {
                background: `linear-gradient(135deg, ${GOLD}, #9e7820)`, color: "#fff",
                boxShadow: "0 6px 16px rgba(158,120,32,0.3)",
              }),
            }}>
              Tất cả
            </Link>
            {categories.map(c => {
              const active = category === c.slug;
              const params = new URLSearchParams({ category: c.slug });
              if (q) params.set("q", q);
              if (sort) params.set("sort", sort);
              return (
                <Link key={c.id} href={`/products?${params.toString()}`} className="lift-hover" style={{
                  fontSize: 12, padding: "9px 20px", borderRadius: 20, textDecoration: "none",
                  letterSpacing: "0.03em", transition: "all 0.2s ease",
                  ...(active ? {
                    background: `linear-gradient(135deg, ${GOLD}, #9e7820)`, color: "#fff",
                    boxShadow: "0 6px 16px rgba(158,120,32,0.3)",
                  } : {
                    border: "1px solid #e8d9b0", color: "#7a6040", background: "#fff",
                  }),
                }}>
                  {c.name}
                </Link>
              );
            })}
          </div>
        )}

        {/* Result count */}
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "24px 32px 0" }}>
          <p style={{ fontSize: 12, color: "#a8895a", letterSpacing: "0.02em", margin: 0 }}>
            {totalCount} sản phẩm{category ? " trong danh mục này" : ""}{q ? ` cho "${q}"` : ""}
          </p>
        </div>

        {/* Products grid */}
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "20px 32px 40px" }}>
          {products.length === 0 ? (
            <p style={{ textAlign: "center", color: "#b09060", padding: "80px 0", fontSize: 14 }}>
              Không tìm thấy sản phẩm phù hợp
            </p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 28 }}>
              {products.map((p, i) => (
                <Link key={p.id} href={`/products/${p.slug}`} style={{ textDecoration: "none" }}>
                  <div className="product-card fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                    <div className="img-zoom" style={{
                      aspectRatio: "4/3", position: "relative", overflow: "hidden",
                      background: "linear-gradient(150deg, #f7efdd 0%, #ecdfbb 55%, #e3d3a4 100%)",
                    }}>
                      <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), transparent 60%)",
                      }} />
                      {p.images?.[0] ? (
                        <Image src={p.images[0]} alt={p.name} fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                          <span style={{ fontSize: 48, filter: "drop-shadow(0 6px 10px rgba(120,90,30,0.25))" }}>🌿</span>
                        </div>
                      )}
                      {p.isFeatured && (
                        <div style={{
                          position: "absolute", top: 14, left: 14,
                          background: `linear-gradient(135deg, ${GOLD}, #9e7820)`, color: "#fff", fontSize: 9,
                          letterSpacing: "0.15em", padding: "5px 12px", borderRadius: 20,
                          boxShadow: "0 4px 10px rgba(158,120,32,0.35)",
                        }}>NỔI BẬT</div>
                      )}
                    </div>
                    <div style={{ padding: "22px 22px 20px" }}>
                      {p.category && (
                        <span style={{
                          fontSize: 9, letterSpacing: "0.15em", color: "#9e7820", fontWeight: 600,
                          background: "#f7efd9", padding: "3px 9px", borderRadius: 4,
                        }}>{p.category.name.toUpperCase()}</span>
                      )}
                      <h3 style={{ fontSize: 17, color: "#1a1000", margin: "12px 0 16px", fontWeight: 500, fontFamily: "var(--font-serif), Georgia, serif", lineHeight: 1.35 }}>
                        {p.name}
                      </h3>
                      <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        paddingTop: 14, borderTop: "1px solid #f0e6cc",
                      }}>
                        <span style={{ fontSize: 11, color: "#9e7820", letterSpacing: "0.04em", fontWeight: 500 }}>Liên hệ báo giá</span>
                        <span className="card-arrow" style={{
                          width: 28, height: 28, borderRadius: "50%", display: "flex",
                          alignItems: "center", justifyContent: "center", fontSize: 14, color: GOLD,
                          border: `1px solid ${GOLD}55`,
                        }}>→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 32px 80px", display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
            <Link
              href={pageHref(Math.max(1, currentPage - 1))}
              aria-disabled={currentPage === 1}
              style={{
                padding: "9px 16px", fontSize: 12, borderRadius: 6, textDecoration: "none",
                border: "1px solid #e8d9b0", color: currentPage === 1 ? "#cbb88a" : "#7a6040",
                background: "#fff", pointerEvents: currentPage === 1 ? "none" : "auto",
              }}
            >
              ← Trước
            </Link>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Link key={p} href={pageHref(p)} style={{
                width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, borderRadius: 6, textDecoration: "none",
                ...(p === currentPage ? {
                  background: `linear-gradient(135deg, ${GOLD}, #9e7820)`, color: "#fff",
                } : {
                  border: "1px solid #e8d9b0", color: "#7a6040", background: "#fff",
                }),
              }}>
                {p}
              </Link>
            ))}
            <Link
              href={pageHref(Math.min(totalPages, currentPage + 1))}
              style={{
                padding: "9px 16px", fontSize: 12, borderRadius: 6, textDecoration: "none",
                border: "1px solid #e8d9b0", color: currentPage === totalPages ? "#cbb88a" : "#7a6040",
                background: "#fff", pointerEvents: currentPage === totalPages ? "none" : "auto",
              }}
            >
              Sau →
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}