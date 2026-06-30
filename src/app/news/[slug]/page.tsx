import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const GOLD = "#c9a84c";

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug, isPublished: true } });
  if (!post) return { title: "Bài viết không tồn tại | Hữu Sâm" };

  const title = `${post.title} | Hữu Sâm`;
  const description = post.excerpt || stripHtml(post.content).slice(0, 160);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
      type: "article",
    },
  };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug, isPublished: true },
  });

  if (!post) return notFound();

  const related = await prisma.post.findMany({
    where: { isPublished: true, id: { not: post.id } },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return (
    <>
      <Navbar />
      <div style={{ background: "#faf7f0", minHeight: "100vh" }}>
        {/* Cover image */}
        {post.coverImage ? (
          <div className="fade-in" style={{ width: "100%", maxHeight: 420, height: "min(420px, 48vw)", overflow: "hidden", position: "relative" }}>
            <Image src={post.coverImage} alt={post.title} fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.05), rgba(20,13,0,0.35))" }} />
          </div>
        ) : (
          <div style={{ height: 12 }} />
        )}

        <div style={{ maxWidth: 780, margin: "0 auto", padding: "56px 24px 80px" }}>
          <Link href="/news" className="link-underline" style={{ fontSize: 11, letterSpacing: "0.1em", color: GOLD }}>
            ← TIN TỨC
          </Link>

          <div className="fade-in-up" style={{ marginTop: 32 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", color: GOLD, marginBottom: 16 }}>
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" }) : ""}
            </div>
            <h1 className="hero-title-lg" style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: 36, color: "#1a1000", fontWeight: 400, lineHeight: 1.4, marginBottom: 24 }}>
              {post.title}
            </h1>

            {post.excerpt && (
              <p style={{ fontSize: 16, color: "#5a4020", lineHeight: 1.8, marginBottom: 32, fontStyle: "italic", borderLeft: `3px solid ${GOLD}`, paddingLeft: 20 }}>
                {post.excerpt}
              </p>
            )}

            <div style={{ height: 1, background: `linear-gradient(90deg, ${GOLD}40, transparent)`, marginBottom: 40 }} />

            <div
              className="rich-editor"
              style={{ fontSize: 15.5, color: "#3a2a00" }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Share / back */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 56, paddingTop: 28, borderTop: "1px solid #e8d9b0", flexWrap: "wrap", gap: 16 }}>
            <Link href="/news" className="link-underline" style={{ fontSize: 12, color: GOLD }}>← Tất cả tin tức</Link>
            <Link href="/contact" className="btn-glow btn-press" style={{
              padding: "12px 28px", fontSize: 11, letterSpacing: "0.12em",
              background: `linear-gradient(135deg, ${GOLD}, #9e7820)`, color: "#fff",
              borderRadius: 3, textDecoration: "none",
            }}>
              LIÊN HỆ TƯ VẤN
            </Link>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px 96px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
              <div style={{ width: 32, height: 1, background: GOLD }} />
              <span style={{ fontSize: 11, letterSpacing: "0.2em", color: GOLD }}>BÀI VIẾT KHÁC</span>
            </div>
            <div className="grid-3">
              {related.map((p) => (
                <Link key={p.id} href={`/news/${p.slug}`} style={{ textDecoration: "none" }}>
                  <article className="lift-hover" style={{ background: "#fff", border: "1px solid #e8d9b0", borderRadius: 8, overflow: "hidden", height: "100%" }}>
                    <div className="img-zoom" style={{ height: 160, background: "linear-gradient(135deg, #1e1200, #2a1a00)", position: "relative" }}>
                      {p.coverImage ? (
                        <Image src={p.coverImage} alt={p.title} fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: 40, opacity: 0.3 }}>🌿</span>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "18px 20px" }}>
                      <h3 style={{ fontSize: 14, color: "#1a1000", margin: "0 0 8px", fontWeight: 500, fontFamily: "var(--font-serif), Georgia, serif" }}>{p.title}</h3>
                      <span style={{ fontSize: 11, color: GOLD }}>Đọc thêm →</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
