import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

const GOLD = "#c9a84c";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { isPublished: true },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    take: 8,
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
        {/* Hero */}
        <section style={{
          minHeight: "100vh", display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", textAlign: "center",
          padding: "80px 24px 60px", position: "relative",
          background: "linear-gradient(180deg, #0a0600 0%, #180e00 60%, #1e1400 100%)",
        }}>
          {/* Decorative circles */}
          <div style={{ position: "absolute", top: "20%", left: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.06), transparent)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "15%", right: "8%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.05), transparent)", pointerEvents: "none" }} />

          <div className="fade-in-up">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, justifyContent: "center" }}>
              <div style={{ width: 40, height: 1, background: GOLD }} />
              <span style={{ color: GOLD, fontSize: 10, letterSpacing: "0.3em" }}>SÂM VIỆT NAM • EST. 1994</span>
              <div style={{ width: 40, height: 1, background: GOLD }} />
            </div>
            <h1 className="hero-title-lg" style={{
              color: "#f0d070", fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: "clamp(32px, 5.5vw, 62px)", fontWeight: 400,
              lineHeight: 1.35, maxWidth: 720, margin: "0 auto 28px",
            }}>
              Tinh hoa quốc bảo<br />từ núi rừng Việt Nam
            </h1>
            <p style={{ color: "#9e8050", fontSize: 16, maxWidth: 500, lineHeight: 1.9, margin: "0 auto 48px" }}>
              Sâm Ngọc Linh chính gốc, chứng nhận xuất xứ rõ ràng.
              Thương hiệu uy tín hàng đầu Việt Nam trên 30 năm.
            </p>
            <div className="home-hero-cta">
              <Link href="/contact" className="btn-glow" style={{
                padding: "16px 44px", fontSize: 11, letterSpacing: "0.18em",
                background: `linear-gradient(135deg, ${GOLD}, #9e7820)`,
                color: "#fff", borderRadius: 2, textDecoration: "none",
              }}>
                LIÊN HỆ BÁO GIÁ
              </Link>
              <Link href="/products" style={{
                padding: "16px 44px", fontSize: 11, letterSpacing: "0.18em",
                border: `1px solid ${GOLD}55`, color: GOLD,
                borderRadius: 2, textDecoration: "none",
              }}>
                XEM SẢN PHẨM
              </Link>
            </div>
          </div>

          <div style={{ position: "absolute", bottom: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4 }}>
            <span style={{ color: GOLD, fontSize: 9, letterSpacing: "0.3em" }}>CUỘN XUỐNG</span>
            <div style={{ width: 1, height: 36, background: `linear-gradient(${GOLD}, transparent)` }} />
          </div>
        </section>

        {/* Stats + Giới thiệu */}
        <section className="home-section" style={{ background: "#fdfaf3", borderTop: "1px solid #e8d9b0" }}>
          <div className="home-about-grid" style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 24, height: 1, background: GOLD }} />
                <span style={{ fontSize: 10, letterSpacing: "0.25em", color: GOLD }}>VỀ CHÚNG TÔI</span>
              </div>
              <h2 style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: 34, color: "#1a1000", fontWeight: 400, lineHeight: 1.45, marginBottom: 20 }}>
                Quốc bảo Việt Nam — <br />Niềm tự hào của người Việt
              </h2>
              <p style={{ color: "#5a4020", fontSize: 14, lineHeight: 1.95, marginBottom: 16 }}>
                Sâm Ngọc Linh (<em>Panax vietnamensis</em>) là loài sâm quý hiếm nhất thế giới,
                được phát hiện tại núi Ngọc Linh, Kon Tum. Với hàm lượng saponin cao hơn
                cả sâm Hàn Quốc, đây là báu vật thiên nhiên của Việt Nam.
              </p>
              <p style={{ color: "#5a4020", fontSize: 14, lineHeight: 1.95, marginBottom: 28 }}>
                Chúng tôi trực tiếp hợp tác với bà con nông dân tại vùng trồng sâm Ngọc Linh,
                đảm bảo nguồn gốc 100% chính gốc, có giấy tờ chứng nhận đầy đủ.
              </p>
              <Link href="/news" style={{ fontSize: 11, letterSpacing: "0.15em", color: GOLD, textDecoration: "none" }}>
                TÌM HIỂU THÊM VỀ SÂM NGỌC LINH →
              </Link>
            </div>
            <div className="grid-4">
              {[
                { num: "30+", label: "Năm kinh nghiệm", sub: "Uy tín lâu đời" },
                { num: "100%", label: "Chính gốc", sub: "Có chứng nhận" },
                { num: "500+", label: "Khách hàng", sub: "Tin tưởng lựa chọn" },
                { num: "24/7", label: "Hỗ trợ tư vấn", sub: "Luôn sẵn sàng" },
              ].map(s => (
                <div key={s.num} style={{
                  background: "#fff", border: "1px solid #e8d9b0",
                  borderRadius: 4, padding: "28px 20px", textAlign: "center",
                }}>
                  <div style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: 34, color: GOLD, fontWeight: 300 }}>{s.num}</div>
                  <div style={{ fontSize: 13, color: "#1a1000", marginTop: 8, fontWeight: 500 }}>{s.label}</div>
                  <div style={{ fontSize: 11, color: "#9e8050", marginTop: 4 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sản phẩm nổi bật */}
        <section className="home-section" style={{ background: "#faf7f0" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 16 }}>
                <div style={{ width: 40, height: 1, background: GOLD, opacity: 0.5 }} />
                <span style={{ fontSize: 10, letterSpacing: "0.25em", color: GOLD }}>SẢN PHẨM NỔI BẬT</span>
                <div style={{ width: 40, height: 1, background: GOLD, opacity: 0.5 }} />
              </div>
              <h2 style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: 34, color: "#1a1000", fontWeight: 400, margin: "0 0 12px" }}>
                Sâm chính gốc
              </h2>
              <p style={{ color: "#9e8050", fontSize: 14, maxWidth: 480, margin: "0 auto" }}>
                Tuyển chọn từ vùng núi Ngọc Linh — đảm bảo chất lượng, nguồn gốc rõ ràng
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(265px, 1fr))", gap: 28 }}>
              {products.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`} style={{ textDecoration: "none" }}>
                  <div className="product-card">
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

            {products.length === 0 && (
              <p style={{ textAlign: "center", color: "#b09060", padding: "64px 0", fontSize: 14 }}>Chưa có sản phẩm nào</p>
            )}

            {products.length > 0 && (
              <div style={{ textAlign: "center", marginTop: 52 }}>
                <Link href="/products" style={{
                  display: "inline-block", padding: "14px 48px",
                  fontSize: 11, letterSpacing: "0.18em",
                  border: `1px solid ${GOLD}`, color: GOLD,
                  borderRadius: 2, textDecoration: "none",
                }}>
                  XEM TẤT CẢ SẢN PHẨM
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Tại sao chọn chúng tôi */}
        <section className="home-section" style={{ background: "linear-gradient(160deg, #100900, #1c1100)" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 16 }}>
                <div style={{ width: 40, height: 1, background: GOLD, opacity: 0.4 }} />
                <span style={{ fontSize: 10, letterSpacing: "0.25em", color: GOLD }}>CAM KẾT CỦA CHÚNG TÔI</span>
                <div style={{ width: 40, height: 1, background: GOLD, opacity: 0.4 }} />
              </div>
              <h2 style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: 34, color: "#f0d070", fontWeight: 400, margin: 0 }}>
                Tại sao chọn Sâm Việt Nam?
              </h2>
            </div>

            <div className="grid-3">
              {[
                {
                  icon: "🌿",
                  title: "Nguồn gốc chính gốc 100%",
                  desc: "Hợp tác trực tiếp với nông dân tại vùng trồng sâm Ngọc Linh, Kon Tum. Toàn bộ sản phẩm có giấy tờ chứng nhận xuất xứ đầy đủ.",
                },
                {
                  icon: "🔬",
                  title: "Kiểm định chất lượng",
                  desc: "Sản phẩm được kiểm định bởi các cơ quan chức năng uy tín. Hàm lượng saponin được đảm bảo theo tiêu chuẩn quốc tế.",
                },
                {
                  icon: "🚚",
                  title: "Giao hàng toàn quốc",
                  desc: "Đóng gói chuyên nghiệp, giao nhanh toàn quốc. Cam kết hoàn tiền 100% nếu sản phẩm không đúng chất lượng.",
                },
                {
                  icon: "💬",
                  title: "Tư vấn chuyên nghiệp",
                  desc: "Đội ngũ chuyên gia sẵn sàng tư vấn cách dùng sâm phù hợp với từng thể trạng, mục đích sức khỏe của bạn.",
                },
                {
                  icon: "💎",
                  title: "Đa dạng sản phẩm",
                  desc: "Sâm tươi nguyên củ, sâm ngâm mật ong, trà sâm, viên sâm... đa dạng hình thức sử dụng cho mọi nhu cầu.",
                },
                {
                  icon: "🛡️",
                  title: "Bảo hành đổi trả",
                  desc: "Cam kết bảo hành và đổi trả trong vòng 7 ngày nếu sản phẩm có vấn đề. Uy tín là trên hết.",
                },
              ].map(f => (
                <div key={f.title} style={{
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.15)",
                  borderRadius: 6, padding: "32px 28px",
                }}>
                  <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
                  <h3 style={{ fontSize: 15, color: "#f0d070", fontWeight: 500, marginBottom: 12, lineHeight: 1.4 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: "#7a5a30", lineHeight: 1.8, margin: 0 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quy trình mua hàng */}
        <section className="home-section" style={{ background: "#fdfaf3", borderTop: "1px solid #e8d9b0" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 16 }}>
                <div style={{ width: 40, height: 1, background: GOLD, opacity: 0.5 }} />
                <span style={{ fontSize: 10, letterSpacing: "0.25em", color: GOLD }}>QUY TRÌNH</span>
                <div style={{ width: 40, height: 1, background: GOLD, opacity: 0.5 }} />
              </div>
              <h2 style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: 34, color: "#1a1000", fontWeight: 400, margin: 0 }}>
                Đặt hàng dễ dàng — 3 bước
              </h2>
            </div>

            <div className="grid-3" style={{ position: "relative" }}>
              {[
                { step: "01", title: "Liên hệ tư vấn", desc: "Gọi điện hoặc nhắn tin Zalo/Email để được tư vấn loại sâm phù hợp với nhu cầu và ngân sách." },
                { step: "02", title: "Xác nhận đơn hàng", desc: "Chốt đơn, thanh toán linh hoạt. Chúng tôi xuất hóa đơn và giấy chứng nhận nguồn gốc kèm theo." },
                { step: "03", title: "Nhận hàng & dùng thử", desc: "Giao hàng nhanh toàn quốc. Hoàn tiền 100% nếu không hài lòng với chất lượng sản phẩm." },
              ].map((s) => (
                <div key={s.step} style={{ textAlign: "center", padding: "0 20px" }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: "50%", margin: "0 auto 20px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: `linear-gradient(135deg, ${GOLD}22, ${GOLD}11)`,
                    border: `1px solid ${GOLD}44`,
                  }}>
                    <span style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: 18, color: GOLD }}>{s.step}</span>
                  </div>
                  <h3 style={{ fontSize: 16, color: "#1a1000", fontWeight: 500, marginBottom: 12 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: "#7a6040", lineHeight: 1.8, margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 52 }}>
              <Link href="/contact" className="btn-glow" style={{
                display: "inline-block", padding: "15px 48px",
                fontSize: 11, letterSpacing: "0.18em",
                background: `linear-gradient(135deg, ${GOLD}, #9e7820)`,
                color: "#fff", borderRadius: 2, textDecoration: "none",
              }}>
                LIÊN HỆ NGAY
              </Link>
            </div>
          </div>
        </section>

        {/* Tin tức mới nhất */}
        {posts.length > 0 && (
          <section className="home-section" style={{ background: "#faf7f0", borderTop: "1px solid #e8d9b0" }}>
            <div style={{ maxWidth: 1180, margin: "0 auto" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 48 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 24, height: 1, background: GOLD }} />
                    <span style={{ fontSize: 10, letterSpacing: "0.25em", color: GOLD }}>TIN TỨC MỚI NHẤT</span>
                  </div>
                  <h2 style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: 30, color: "#1a1000", fontWeight: 400, margin: 0 }}>
                    Kiến thức về sâm
                  </h2>
                </div>
                <Link href="/news" style={{ fontSize: 11, letterSpacing: "0.12em", color: GOLD, textDecoration: "none" }}>
                  XEM TẤT CẢ →
                </Link>
              </div>

              <div className="grid-3">
                {posts.map((p) => (
                  <article key={p.id} style={{ background: "#fff", border: "1px solid #e8d9b0", borderRadius: 4, overflow: "hidden" }} className="card-hover">
                    <div style={{ height: 200, background: "linear-gradient(135deg, #1e1200, #2a1a00)", overflow: "hidden", position: "relative" }}>
                      {p.coverImage ? (
                        <Image src={p.coverImage} alt={p.title} fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ fontSize: 40, opacity: 0.2 }}>🌿</span>
                        </div>
                      )}
                    </div>
                    <div style={{ padding: "22px" }}>
                      <div style={{ fontSize: 10, letterSpacing: "0.15em", color: GOLD, marginBottom: 10 }}>
                        {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString("vi-VN") : ""}
                      </div>
                      <h3 style={{ fontSize: 15, fontWeight: 500, color: "#1a1000", fontFamily: "var(--font-serif), Georgia, serif", lineHeight: 1.5, marginBottom: 12 }}>
                        {p.title}
                      </h3>
                      {p.excerpt && (
                        <p style={{ color: "#9e8860", fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>
                          {p.excerpt.slice(0, 100)}...
                        </p>
                      )}
                      <Link href={`/news/${p.slug}`} style={{ fontSize: 11, letterSpacing: "0.12em", color: GOLD, textDecoration: "none" }}>
                        ĐỌC THÊM →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Banner */}
        <section style={{ background: "linear-gradient(135deg, #100900, #1e1200)", padding: "72px 32px", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 20 }}>🌿</div>
            <h2 style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: 32, color: "#f0d070", fontWeight: 400, lineHeight: 1.4, marginBottom: 16 }}>
              Bắt đầu hành trình chăm sóc sức khỏe cùng sâm Ngọc Linh
            </h2>
            <p style={{ color: "#7a5a30", fontSize: 14, lineHeight: 1.8, marginBottom: 40 }}>
              Liên hệ ngay hôm nay để nhận tư vấn miễn phí và báo giá tốt nhất từ đội ngũ chuyên gia của chúng tôi.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
              <Link href="/contact" className="btn-glow" style={{
                padding: "15px 44px", fontSize: 11, letterSpacing: "0.18em",
                background: `linear-gradient(135deg, ${GOLD}, #9e7820)`,
                color: "#fff", borderRadius: 2, textDecoration: "none",
              }}>
                LIÊN HỆ NGAY
              </Link>
              <a href="tel:0900000000" style={{
                padding: "15px 44px", fontSize: 11, letterSpacing: "0.12em",
                border: `1px solid ${GOLD}55`, color: GOLD,
                borderRadius: 2, textDecoration: "none",
              }}>
                📞 0919 198 522
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}