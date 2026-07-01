import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const revalidate = 0;

const GOLD = "#c9a84c";

export const metadata: Metadata = {
  title: "Tin Tức & Sự Kiện | Hậu Sâm",
  description: "Kiến thức, tin tức và câu chuyện về sâm Việt Nam — được tuyển chọn và cập nhật thường xuyên từ Hậu Sâm.",
};

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export default async function NewsPage() {
  const posts = await prisma.post.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });

  const [featured, ...rest] = posts;

  return (
    <>
      <Navbar />
      <div style={{ background: "#faf7f0", minHeight: "100vh" }}>
        <div>
          {/* Hero */}
          <div style={{
            position: "relative", overflow: "hidden",
            background: "linear-gradient(160deg, #140d00, #1e1200)",
            padding: "80px 24px 64px",
            borderBottom: "1px solid rgba(201,168,76,0.15)",
          }}>
            <div className="float-decor" style={{
              position: "absolute", top: -60, right: "8%", width: 220, height: 220,
              background: `radial-gradient(circle, ${GOLD}22, transparent 70%)`, borderRadius: "50%",
              pointerEvents: "none",
            }} />
            <div className="float-decor" style={{
              position: "absolute", bottom: -80, left: "4%", width: 260, height: 260,
              background: `radial-gradient(circle, ${GOLD}14, transparent 70%)`, borderRadius: "50%",
              animationDelay: "1.5s", pointerEvents: "none",
            }} />
            <div className="fade-in-up" style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <div style={{ width: 32, height: 1, background: GOLD }} />
                <span style={{ fontSize: 10, letterSpacing: "0.3em", color: GOLD }}>TIN TỨC & SỰ KIỆN</span>
              </div>
              <h1 className="hero-title-lg" style={{ fontSize: 40, fontWeight: 300, color: "#f0d070", fontFamily: "var(--font-serif), Georgia, serif", margin: 0 }}>
                Cập Nhật Mới Nhất
              </h1>
              <p style={{ color: "#9e8860", fontSize: 14, marginTop: 14, maxWidth: 480 }}>
                Kiến thức, tin tức và câu chuyện về sâm Việt Nam — được tuyển chọn và cập nhật thường xuyên.
              </p>
            </div>
          </div>

          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 24px 80px" }}>
            {posts.length === 0 ? (
              <div className="fade-in" style={{ textAlign: "center", padding: "80px 0" }}>
                <span style={{ fontSize: 40, opacity: 0.3, display: "block", marginBottom: 12 }}>🌿</span>
                <p style={{ color: "#9e8860", fontSize: 14 }}>Chưa có bài viết nào.</p>
              </div>
            ) : (
              <>
                {/* Featured post */}
                {featured && (
                  <Link href={`/news/${featured.slug}`} style={{ textDecoration: "none" }}>
                    <article className="fade-in-up lift-hover grid-detail" style={{
                      gap: 0,
                      background: "#fff", border: "1px solid #e8d9b0", borderRadius: 8,
                      overflow: "hidden", marginBottom: 56,
                    }}>
                      <div className="img-zoom" style={{ aspectRatio: "16/11", background: "linear-gradient(135deg, #1e1200, #2a1a00)", position: "relative" }}>
                        {featured.coverImage ? (
                          <Image src={featured.coverImage} alt={featured.title} fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "cover" }} />
                        ) : (
                          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: 56, opacity: 0.3 }}>🌿</span>
                          </div>
                        )}
                        <div style={{
                          position: "absolute", top: 16, left: 16,
                          background: `linear-gradient(135deg, ${GOLD}, #9e7820)`, color: "#fff",
                          fontSize: 10, letterSpacing: "0.15em", padding: "6px 14px", borderRadius: 3,
                        }}>BÀI MỚI NHẤT</div>
                      </div>
                      <div style={{ padding: "40px 40px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <div style={{ fontSize: 10, letterSpacing: "0.15em", color: GOLD, marginBottom: 14 }}>
                          {featured.publishedAt ? new Date(featured.publishedAt).toLocaleDateString("vi-VN") : ""}
                        </div>
                        <h2 style={{ fontSize: 26, fontWeight: 500, color: "#1a1000", fontFamily: "var(--font-serif), Georgia, serif", lineHeight: 1.35, marginBottom: 16 }}>
                          {featured.title}
                        </h2>
                        <p style={{ color: "#7a6040", fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
                          {featured.excerpt || stripHtml(featured.content).slice(0, 160) + "…"}
                        </p>
                        <span className="link-underline" style={{ fontSize: 11, letterSpacing: "0.12em", color: GOLD }}>
                          ĐỌC TOÀN BỘ BÀI VIẾT →
                        </span>
                      </div>
                    </article>
                  </Link>
                )}

                {/* Rest grid */}
                {rest.length > 0 && (
                  <div className="grid-3">
                    {rest.map((p, i) => (
                      <Link key={p.id} href={`/news/${p.slug}`} style={{ textDecoration: "none" }}>
                        <article className="fade-in-up lift-hover" style={{
                          background: "#fff", border: "1px solid #e8d9b0",
                          borderRadius: 8, overflow: "hidden", height: "100%",
                          display: "flex", flexDirection: "column",
                          animationDelay: `${i * 0.06}s`,
                        }}>
                          <div className="img-zoom" style={{ height: 200, background: "linear-gradient(135deg, #1e1200, #2a1a00)", position: "relative" }}>
                            {p.coverImage ? (
                              <Image src={p.coverImage} alt={p.title} fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "cover" }} />
                            ) : (
                              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <span style={{ fontSize: 48, opacity: 0.3 }}>🌿</span>
                              </div>
                            )}
                          </div>
                          <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                            <div style={{ fontSize: 10, letterSpacing: "0.15em", color: GOLD, marginBottom: 10 }}>
                              {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("vi-VN") : ""}
                            </div>
                            <h2 style={{ fontSize: 16, fontWeight: 500, color: "#1a1000", fontFamily: "var(--font-serif), Georgia, serif", lineHeight: 1.5, marginBottom: 12 }}>
                              {p.title}
                            </h2>
                            <p style={{ color: "#9e8860", fontSize: 13, lineHeight: 1.7, marginBottom: 16, flex: 1 }}>
                              {p.excerpt || stripHtml(p.content).slice(0, 100) + "…"}
                            </p>
                            <span className="link-underline" style={{ fontSize: 11, letterSpacing: "0.12em", color: GOLD, alignSelf: "flex-start" }}>
                              ĐỌC THÊM →
                            </span>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}