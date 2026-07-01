"use client";

import { useState } from "react";

const GOLD = "#c9a84c";

type Category = { id: string; name: string; slug: string };

export default function FilterDrawer({
  categories,
  currentCategory,
  q,
  sort,
}: {
  categories: Category[];
  currentCategory?: string;
  q?: string;
  sort?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-press"
        style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "12px 20px", fontSize: 12, letterSpacing: "0.08em",
          background: "transparent", border: "1px solid rgba(201,168,76,0.35)",
          color: GOLD, borderRadius: 6, cursor: "pointer", whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontSize: 13 }}>☰</span> BỘ LỌC
        {currentCategory && <span style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD, display: "inline-block" }} />}
      </button>

      <div
        style={{
          position: "fixed", inset: 0, zIndex: 100,
          pointerEvents: open ? "auto" : "none",
        }}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "absolute", inset: 0,
            background: "rgba(5,4,1,0.6)",
            opacity: open ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />
        {/* Panel */}
        <div
          style={{
            position: "absolute", top: 0, right: 0, bottom: 0,
            width: "min(360px, 92vw)",
            background: "#0f0c06",
            borderLeft: "1px solid rgba(201,168,76,0.2)",
            padding: "32px 28px",
            overflowY: "auto",
            transform: open ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.32s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 36 }}>
            <span style={{ fontFamily: "var(--font-serif), Georgia, serif", fontSize: 17, color: GOLD }}>Bộ Lọc Sản Phẩm</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Đóng bộ lọc"
              style={{
                width: 30, height: 30, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.3)",
                background: "transparent", color: GOLD, cursor: "pointer", fontSize: 15,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              ×
            </button>
          </div>

          <form action="/products" method="get">
            {q && <input type="hidden" name="q" value={q} />}
            {sort && <input type="hidden" name="sort" value={sort} />}

            <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#8a7d60", marginBottom: 18 }}>DANH MỤC</div>
            <label style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 0", borderBottom: "1px solid rgba(201,168,76,0.1)",
              fontSize: 13, color: !currentCategory ? GOLD : "#c9c0aa", cursor: "pointer",
            }}>
              Tất cả sản phẩm
              <input type="radio" name="category" value="" defaultChecked={!currentCategory} style={{ accentColor: GOLD }} />
            </label>
            {categories.map((c) => (
              <label key={c.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 0", borderBottom: "1px solid rgba(201,168,76,0.1)",
                fontSize: 13, color: currentCategory === c.slug ? GOLD : "#c9c0aa", cursor: "pointer",
              }}>
                {c.name}
                <input type="radio" name="category" value={c.slug} defaultChecked={currentCategory === c.slug} style={{ accentColor: GOLD }} />
              </label>
            ))}

            <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
              <a
                href="/products"
                style={{
                  flex: 1, textAlign: "center", padding: "13px", fontSize: 11, letterSpacing: "0.12em",
                  color: "#a89070", border: "1px solid rgba(201,168,76,0.25)", borderRadius: 4, textDecoration: "none",
                }}
              >
                LÀM MỚI
              </a>
              <button
                type="submit"
                className="btn-glow btn-press"
                style={{
                  flex: 1, padding: "13px", fontSize: 11, letterSpacing: "0.12em",
                  background: `linear-gradient(135deg, ${GOLD}, #9e7820)`,
                  color: "#fff", border: "none", borderRadius: 4, cursor: "pointer",
                }}
              >
                ÁP DỤNG
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
