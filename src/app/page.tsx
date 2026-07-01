import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

const GOLD = "#c9a84c";
const SERIF = "var(--font-serif), Georgia, serif";

export const revalidate = 0;

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { isPublished: true },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    take: 6,
    include: { category: true },
  });

  const posts = await prisma.post.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return (
    <>
      <Navbar />
      <main>
        {/* ============ HERO ============ */}
        <section className="mountain-hero" style={{
          minHeight: "92vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", textAlign: "center",
          padding: "140px 24px 100px", position: "relative",
          background: "radial-gradient(ellipse at 50% 0%, #1c2418 0%, #0a0e08 55%, #050603 100%)",
          overflow: "hidden",
        }}>
          {/* Ảnh nền hero — tự thay bằng ảnh của bạn tại /public/images/hero/hero-bg.png */}
          <Image
            src="/images/hero/hero-bg.png"
            alt="Núi rừng Ngọc Linh"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div style={{ position: "absolute", top: "12%", left: "8%", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.1), transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "18%", right: "10%", width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.09), transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(5,7,3,0.55) 0%, rgba(5,7,3,0.35) 40%, rgba(5,7,3,0.85) 100%)", pointerEvents: "none" }} />

          <div className="fade-in-up" style={{ position: "relative", zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, justifyContent: "center" }}>
              <div style={{ width: 40, height: 1, background: GOLD }} />
              <span style={{ color: GOLD, fontSize: 10, letterSpacing: "0.3em" }}>HẬU SÂM · EST. 1994</span>
              <div style={{ width: 40, height: 1, background: GOLD }} />
            </div>
            <h1 className="hero-title-lg" style={{
              color: "#f0d070", fontFamily: SERIF,
              fontSize: "clamp(34px, 6vw, 64px)", fontWeight: 400,
              lineHeight: 1.3, maxWidth: 760, margin: "0 auto 24px",
            }}>
              Linh Hồn Luyện Kim<br />
              <span style={{ fontStyle: "italic", color: "#dcb96a" }}>của Sâm Ngọc Linh</span>
            </h1>
            <p style={{ color: "#b7a888", fontSize: 15, maxWidth: 520, lineHeight: 1.9, margin: "0 auto 48px" }}>
              Từ năm 1994, Hậu Sâm đã miệt mài chọn lọc những báu vật Sâm Ngọc Linh
              tinh khiết nhất, kết hợp tri thức y học cổ truyền và tinh thần hiện đại
              để kiến tạo nên các di sản chăm sóc sức khỏe.
            </p>
            <div className="home-hero-cta">
              <Link href="/products" className="btn-glow" style={{
                padding: "16px 44px", fontSize: 11, letterSpacing: "0.18em",
                background: `linear-gradient(135deg, ${GOLD}, #9e7820)`,
                color: "#fff", borderRadius: 2, textDecoration: "none",
              }}>
                KHÁM PHÁ BỘ SƯU TẬP
              </Link>
              <Link href="/news" style={{
                padding: "16px 44px", fontSize: 11, letterSpacing: "0.18em",
                border: `1px solid ${GOLD}55`, color: GOLD,
                borderRadius: 2, textDecoration: "none",
              }}>
                CÂU CHUYỆN CỦA CHÚNG TÔI
              </Link>
            </div>
          </div>

          <div style={{ position: "absolute", bottom: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.45, zIndex: 2 }}>
            <span style={{ color: GOLD, fontSize: 9, letterSpacing: "0.3em" }}>CUỘN XUỐNG</span>
            <div style={{ width: 1, height: 36, background: `linear-gradient(${GOLD}, transparent)` }} />
          </div>
        </section>

        {/* ============ HÀNH TRÌNH 30 NĂM ============ */}
        <section className="home-section" style={{ background: "#0a0e08", borderTop: "1px solid rgba(201,168,76,0.12)" }}>
          <div className="journey-grid" style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div style={{ display: "flex", gap: 28 }}>
              <span className="rotated-year">EST. 1994</span>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 24, height: 1, background: GOLD }} />
                  <span style={{ fontSize: 10, letterSpacing: "0.25em", color: GOLD }}>DI SẢN</span>
                </div>
                <h2 style={{ fontFamily: SERIF, fontSize: 34, color: "#f0d070", fontWeight: 400, lineHeight: 1.4, marginBottom: 22 }}>
                  Hành trình<br />30 năm
                </h2>
                <p style={{ color: "#9d9078", fontSize: 14, lineHeight: 1.95, marginBottom: 16 }}>
                  Câu chuyện của chúng tôi bắt đầu từ những thung lũng ẩn mình tại
                  miền Trung Việt Nam, nơi sâm Ngọc Linh quý hiếm đã vươn mình qua
                  hàng thiên niên kỷ. Hậu Sâm bảo tồn giá trị sản phẩm thiêng liêng
                  này qua việc thu hoạch tỉ mỉ và các phương pháp lưu giữ truyền
                  thống đầy tôn nghiêm.
                </p>
                <p style={{ color: "#9d9078", fontSize: 14, lineHeight: 1.95, marginBottom: 28 }}>
                  Mỗi sản phẩm được sinh ra từ chọn lọc khắt khe, chuyển hoá thành
                  di sản của sự tinh khiết, đại diện cho các phương pháp thủ công
                  đã tồn tại qua nhiều thế hệ.
                </p>
                <Link href="/news" className="link-underline" style={{ fontSize: 11, letterSpacing: "0.15em", color: GOLD, textDecoration: "none" }}>
                  TÌM HIỂU THÊM VỀ SÂM NGỌC LINH →
                </Link>
              </div>
            </div>

            <div className="journey-img-frame">
              <div style={{
                position: "relative", aspectRatio: "4/5", borderRadius: 2, overflow: "hidden",
                background: "linear-gradient(160deg, #1a1608 0%, #0d0b04 60%, #050402 100%)",
              }}>
                {/* Tự thay bằng ảnh của bạn tại /public/images/journey/journey-heritage.png */}
                <Image
                  src="/images/journey/journey-heritage.png"
                  alt="Hành trình 30 năm Hậu Sâm"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  style={{ objectFit: "cover", filter: "brightness(0.85)" }}
                />

                <div style={{
                  position: "absolute", left: 20, bottom: 20,
                  background: "rgba(10,10,6,0.72)", backdropFilter: "blur(6px)",
                  border: "1px solid rgba(201,168,76,0.35)", borderRadius: 2,
                  padding: "12px 18px",
                }}>
                  <div style={{ fontSize: 9, letterSpacing: "0.2em", color: GOLD, marginBottom: 4 }}>DẤU ẤN LƯU TRUYỀN</div>
                  <div style={{ fontFamily: SERIF, fontSize: 15, color: "#f0d070" }}>Số hiệu N°. 001/94</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ TINH HOA TUYỆT TÁC ============ */}
        <section className="home-section" style={{ background: "#0d1108" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 44, flexWrap: "wrap", gap: 20 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 24, height: 1, background: GOLD }} />
                  <span style={{ fontSize: 10, letterSpacing: "0.25em", color: GOLD }}>BỘ SƯU TẬP</span>
                </div>
                <h2 style={{ fontFamily: SERIF, fontSize: 32, color: "#f0d070", fontWeight: 400, margin: 0 }}>
                  Tinh hoa Tuyệt tác
                </h2>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <span className="carousel-arrow" aria-hidden>‹</span>
                <span className="carousel-arrow" aria-hidden>›</span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28 }}>
              {products.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`} style={{ textDecoration: "none" }}>
                  <div className="product-card" style={{ background: "#131a0e", border: "1px solid rgba(201,168,76,0.15)" }}>
                    <div className="img-zoom" style={{
                      aspectRatio: "4/3", position: "relative", overflow: "hidden",
                      background: "linear-gradient(150deg, #1c2414 0%, #12160c 100%)",
                    }}>
                      <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "radial-gradient(circle at 30% 30%, rgba(201,168,76,0.08), transparent 60%)",
                      }} />
                      <Image
                        src={p.images?.[0] || "/images/placeholders/product-placeholder.png"}
                        alt={p.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        style={{ objectFit: "cover" }}
                      />
                      {p.isFeatured && (
                        <div style={{
                          position: "absolute", top: 14, left: 14,
                          background: `linear-gradient(135deg, ${GOLD}, #9e7820)`, color: "#fff", fontSize: 9,
                          letterSpacing: "0.15em", padding: "5px 12px", borderRadius: 20,
                          boxShadow: "0 4px 10px rgba(0,0,0,0.35)",
                        }}>NỔI BẬT</div>
                      )}
                    </div>
                    <div style={{ padding: "24px 22px", textAlign: "center" }}>
                      <h3 style={{ fontSize: 17, color: "#f0d070", margin: "0 0 6px", fontWeight: 500, fontFamily: SERIF, lineHeight: 1.35 }}>
                        {p.name}
                      </h3>
                      <div style={{ fontSize: 12, color: "#8a7d60", marginBottom: 16 }}>
                        {p.unit || p.category?.name || "Sản phẩm chọn lọc"}
                      </div>
                      <div style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                        paddingTop: 14, borderTop: "1px solid rgba(201,168,76,0.12)",
                      }}>
                        <span style={{ fontSize: 12, color: GOLD, letterSpacing: "0.04em", fontWeight: 500 }}>Liên hệ báo giá</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {products.length === 0 && (
              <p style={{ textAlign: "center", color: "#6a6048", padding: "64px 0", fontSize: 14 }}>Chưa có sản phẩm nào</p>
            )}
          </div>
        </section>

        {/* ============ QUOTE ============ */}
        <section style={{
          background: "linear-gradient(160deg, #050603, #0a0e08)",
          padding: "110px 24px", textAlign: "center",
          borderTop: "1px solid rgba(201,168,76,0.1)", borderBottom: "1px solid rgba(201,168,76,0.1)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 32 }}>
            <div style={{ width: 40, height: 1, background: GOLD, opacity: 0.5 }} />
            <span style={{ fontSize: 10, letterSpacing: "0.3em", color: GOLD }}>NGHI THỨC</span>
            <div style={{ width: 40, height: 1, background: GOLD, opacity: 0.5 }} />
          </div>
          <p style={{
            fontFamily: SERIF, fontStyle: "italic", fontWeight: 300,
            fontSize: "clamp(24px, 3.6vw, 38px)", color: "#f0d070",
            lineHeight: 1.55, maxWidth: 760, margin: "0 auto",
          }}>
            &ldquo;Sức khỏe là một nghi thức<br />của tâm hồn.&rdquo;
          </p>
          <div style={{ width: 1, height: 56, background: `linear-gradient(${GOLD}, transparent)`, margin: "40px auto 0" }} />
        </section>

        {/* ============ CHUYỆN KỂ MỚI NHẤT ============ */}
        {posts.length > 0 && (
          <section className="home-section" style={{ background: "#0d1108" }}>
            <div style={{ maxWidth: 1180, margin: "0 auto" }}>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 44, flexWrap: "wrap", gap: 20 }}>
                <h2 style={{ fontFamily: SERIF, fontSize: 30, color: "#f0d070", fontWeight: 400, margin: 0 }}>
                  Chuyện kể mới nhất
                </h2>
                <Link href="/news" className="link-underline" style={{ fontSize: 11, letterSpacing: "0.12em", color: GOLD, textDecoration: "none" }}>
                  ĐỌC MỚI NHẤT →
                </Link>
              </div>

              <div className="grid-3">
                {posts.map((p) => (
                  <Link key={p.id} href={`/news/${p.slug}`} style={{ textDecoration: "none" }}>
                    <article className="card-hover" style={{ background: "#131a0e", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 4, overflow: "hidden" }}>
                      <div className="img-zoom" style={{ height: 210, background: "linear-gradient(150deg, #1c2414, #12160c)", overflow: "hidden", position: "relative" }}>
                        <Image
                          src={p.coverImage || "/images/placeholders/news-placeholder.png"}
                          alt={p.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 400px"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div style={{ padding: "22px" }}>
                        <div style={{ fontSize: 10, letterSpacing: "0.15em", color: GOLD, marginBottom: 10 }}>
                          {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("vi-VN") : ""}
                        </div>
                        <h3 style={{ fontSize: 16, fontWeight: 500, color: "#f0d070", fontFamily: SERIF, lineHeight: 1.5, margin: 0 }}>
                          {p.title}
                        </h3>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============ CTA: NÂNG TẦM BẢN THỂ ============ */}
        <section style={{
          background: "linear-gradient(150deg, #1a1608 0%, #0a0e08 100%)",
          padding: "100px 32px", textAlign: "center",
          borderTop: "1px solid rgba(201,168,76,0.12)",
        }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%", margin: "0 auto 28px",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `1px solid ${GOLD}66`,
            }}>
              <span style={{ fontSize: 22 }}>✦</span>
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 34, color: "#f0d070", fontWeight: 400, lineHeight: 1.4, marginBottom: 18 }}>
              Nâng tầm Bản thể
            </h2>
            <p style={{ color: "#9d9078", fontSize: 14, lineHeight: 1.9, marginBottom: 40 }}>
              Đội chuyên gia của chúng tôi luôn sẵn sàng cho các hành trình tinh
              tế và tư vấn hội tụ cá nhân. Khám phá liệu trình hoàn hảo cho đời
              sống của bạn.
            </p>
            <Link href="/contact" className="btn-glow" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "16px 48px", fontSize: 11, letterSpacing: "0.18em",
              background: `linear-gradient(135deg, ${GOLD}, #9e7820)`,
              color: "#fff", borderRadius: 2, textDecoration: "none",
            }}>
              YÊU CẦU TƯ VẤN RIÊNG →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
