import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import FilterDrawer from "@/components/public/FilterDrawer";
import type { Metadata } from "next";

const GOLD = "#c9a84c";
const SERIF = "var(--font-serif), Georgia, serif";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Bộ Sưu Tập | Hậu Sâm",
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

// Bento pattern: repeats every 6 items — a wide tile (span 2) at position 0 and 4
// within a 4-column grid, small tiles (span 1) fill the rest.
function spanFor(indexInCycle: number) {
  return indexInCycle % 6 === 0 || indexInCycle % 6 === 4 ? 2 : 1;
}

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
  const activeCategory = categories.find((c) => c.slug === category);

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
      <div style={{ background: "#0a0e08", minHeight: "100vh" }}>
        {/* Header */}
        <div style={{
          padding: "88px 32px 64px", textAlign: "center", position: "relative", overflow: "hidden",
          background: "radial-gradient(ellipse at 50% 0%, #16190f 0%, #0a0e08 65%)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 18 }}>
            <div style={{ width: 32, height: 1, background: GOLD }} />
            <span style={{ fontSize: 10, letterSpacing: "0.3em", color: GOLD }}>LỰA CHỌN TINH TÚY</span>
            <div style={{ width: 32, height: 1, background: GOLD }} />
          </div>
          <h1 style={{ fontSize: "clamp(30px, 4.5vw, 46px)", fontWeight: 300, color: "#f0d070", fontFamily: SERIF, margin: 0 }}>
            {activeCategory ? activeCategory.name : "Bộ Sưu Tập Tinh Tuyển"}
          </h1>
        </div>

        {/* Toolbar */}
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
          <div style={{
            display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center",
            paddingBottom: 28, borderBottom: "1px solid rgba(201,168,76,0.15)",
          }}>
            <form action="/products" method="get" style={{ display: "flex", gap: 12, flex: "1 1 320px", flexWrap: "wrap" }}>
              {category && <input type="hidden" name="category" value={category} />}
              <div style={{ position: "relative", flex: "1 1 240px" }}>
                <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#7a6f52", fontSize: 13 }}>🔍</span>
                <input
                  type="text"
                  name="q"
                  defaultValue={q || ""}
                  placeholder="Khám phá di sản..."
                  style={{
                    width: "100%", padding: "12px 16px 12px 40px", fontSize: 13,
                    border: "1px solid rgba(201,168,76,0.25)", borderRadius: 6, background: "#12140d",
                    color: "#e8dfc8", outline: "none", boxSizing: "border-box",
                  }}
                />
              </div>
              <select
                name="sort"
                defaultValue={sortKey}
                style={{
                  padding: "12px 16px", fontSize: 12, letterSpacing: "0.04em",
                  border: "1px solid rgba(201,168,76,0.25)", borderRadius: 6,
                  background: "#12140d", color: "#c9c0aa", outline: "none",
                }}
              >
                {Object.entries(SORT_OPTIONS).map(([key, opt]) => (
                  <option key={key} value={key}>{opt.label}</option>
                ))}
              </select>
              <button type="submit" className="btn-glow btn-press" style={{
                padding: "12px 26px", fontSize: 11, letterSpacing: "0.12em", fontWeight: 500,
                background: `linear-gradient(135deg, ${GOLD}, #9e7820)`, color: "#fff",
                border: "none", borderRadius: 6, cursor: "pointer",
              }}>
                TÌM
              </button>
            </form>

            <FilterDrawer categories={categories} currentCategory={category} q={q} sort={sort} />

            {(q || category) && (
              <Link href="/products" style={{
                fontSize: 12, color: "#8a7d60", textDecoration: "none",
                padding: "12px 6px",
              }}>
                Xóa lọc ×
              </Link>
            )}
          </div>

          {/* Result count */}
          <p style={{ fontSize: 12, color: "#7a6f52", letterSpacing: "0.02em", margin: "20px 0 32px" }}>
            {totalCount} sản phẩm{activeCategory ? ` trong "${activeCategory.name}"` : ""}{q ? ` cho "${q}"` : ""}
          </p>

          {/* Bento product grid */}
          {products.length === 0 ? (
            <p style={{ textAlign: "center", color: "#6a6048", padding: "100px 0", fontSize: 14 }}>
              Không tìm thấy sản phẩm phù hợp
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 28,
                paddingBottom: 56,
              }}
            >
              {products.map((p, i) => {
                const span = spanFor(i);
                return (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    style={{ textDecoration: "none", gridColumn: `span ${span}` }}
                  >
                    <div className="fade-in-up" style={{ animationDelay: `${i * 0.04}s` }}>
                      <div className="journey-img-frame img-zoom" style={{
                        position: "relative", overflow: "hidden",
                        aspectRatio: span === 2 ? "16 / 10" : "1 / 1",
                      }}>
                        <div style={{
                          position: "relative", width: "100%", height: "100%",
                          background: "linear-gradient(150deg, #1c2414 0%, #12160c 100%)",
                        }}>
                          {p.images?.[0] ? (
                            <Image
                              src={p.images[0]}
                              alt={p.name}
                              fill
                              sizes={span === 2 ? "(max-width: 768px) 100vw, 620px" : "(max-width: 768px) 50vw, 300px"}
                              style={{ objectFit: "cover" }}
                            />
                          ) : (
                            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <span style={{ fontSize: span === 2 ? 48 : 32, opacity: 0.5 }}>🌿</span>
                            </div>
                          )}
                          {p.isFeatured && (
                            <div style={{
                              position: "absolute", top: 12, left: 12,
                              background: `linear-gradient(135deg, ${GOLD}, #9e7820)`, color: "#fff", fontSize: 9,
                              letterSpacing: "0.15em", padding: "5px 12px", borderRadius: 20,
                              boxShadow: "0 4px 10px rgba(0,0,0,0.35)",
                            }}>NỔI BẬT</div>
                          )}
                        </div>
                      </div>
                      <div style={{ padding: "18px 4px 0" }}>
                        <h3 style={{
                          fontSize: span === 2 ? 22 : 15, color: "#f0d070", fontWeight: span === 2 ? 400 : 500,
                          fontFamily: span === 2 ? SERIF : "inherit", margin: "0 0 8px", lineHeight: 1.35,
                        }}>
                          {p.name}
                        </h3>
                        {span === 2 && p.description ? (
                          <p style={{ fontSize: 13, color: "#9d9078", lineHeight: 1.8, margin: 0, maxWidth: 460 }}>
                            {p.description.replace(/<[^>]+>/g, "").slice(0, 120)}
                            {p.description.length > 120 ? "…" : ""}
                          </p>
                        ) : (
                          <span style={{ fontSize: 12, color: "#7a6f52" }}>
                            {p.unit || p.category?.name || "Liên hệ báo giá"}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, padding: "0 0 80px" }}>
              <Link
                href={pageHref(Math.max(1, currentPage - 1))}
                aria-disabled={currentPage === 1}
                style={{
                  width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  border: "1px solid rgba(201,168,76,0.3)", color: currentPage === 1 ? "#4a4534" : GOLD,
                  textDecoration: "none", pointerEvents: currentPage === 1 ? "none" : "auto",
                }}
              >
                ‹
              </Link>
              <span style={{ fontSize: 13, letterSpacing: "0.08em", color: "#c9c0aa" }}>
                <span style={{ color: GOLD }}>{String(currentPage).padStart(2, "0")}</span> / {totalPages}
              </span>
              <Link
                href={pageHref(Math.min(totalPages, currentPage + 1))}
                aria-disabled={currentPage === totalPages}
                style={{
                  width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  border: "1px solid rgba(201,168,76,0.3)", color: currentPage === totalPages ? "#4a4534" : GOLD,
                  textDecoration: "none", pointerEvents: currentPage === totalPages ? "none" : "auto",
                }}
              >
                ›
              </Link>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
