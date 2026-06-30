"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

type PostInput = {
  title: string; slug: string; excerpt: string;
  content: string; coverImage: string; isPublished: boolean;
};
const empty: PostInput = { title: "", slug: "", excerpt: "", content: "", coverImage: "", isPublished: true };

function toSlug(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

const inp: React.CSSProperties = { width: "100%", border: "1px solid #e2d5b0", borderRadius: 4, padding: "10px 14px", fontSize: 13, color: "#1a1000", background: "#fffdf7", outline: "none", boxSizing: "border-box", fontFamily: "inherit" };
const lbl: React.CSSProperties = { display: "block", fontSize: 10, letterSpacing: "0.2em", color: "#9e8050", marginBottom: 8, fontWeight: 500 };
const GOLD = "#c9a84c";

type UploadResult = { info?: { secure_url?: string } | string };

function getSecureUrl(result: UploadResult): string | undefined {
  if (result.info && typeof result.info === "object" && "secure_url" in result.info) {
    return result.info.secure_url;
  }
  return undefined;
}

// ---- Toolbar button ----
function ToolBtn({ onClick, title, active, children }: { onClick: () => void; title: string; active?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      style={{
        padding: "5px 10px", fontSize: 13, border: "none", borderRadius: 3, cursor: "pointer",
        background: active ? `${GOLD}33` : "transparent",
        color: active ? "#7a5010" : "#5a4020",
        fontWeight: active ? 600 : 400,
        minWidth: 32, lineHeight: 1.4,
      }}
    >
      {children}
    </button>
  );
}

export default function PostForm({ postId }: { postId?: string }) {
  const router = useRouter();
  const editorRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<PostInput>(empty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (postId) {
      fetch(`/api/posts/${postId}`).then(r => r.json()).then(p => {
        setForm({
          title: p.title, slug: p.slug,
          excerpt: p.excerpt ?? "",
          content: p.content ?? "",
          coverImage: p.coverImage ?? "",
          isPublished: p.isPublished,
        });
        // Set editor HTML content after mount
        setTimeout(() => {
          if (editorRef.current && p.content) {
            editorRef.current.innerHTML = p.content;
            updateWordCount();
          }
          setDirty(false);
        }, 50);
      });
    }
  }, [postId]);

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

  function updateWordCount() {
    if (editorRef.current) {
      const text = editorRef.current.innerText || "";
      setWordCount(text.trim().split(/\s+/).filter(Boolean).length);
    }
  }

  function execCmd(cmd: string, value?: string) {
    document.execCommand(cmd, false, value);
    editorRef.current?.focus();
    updateWordCount();
  }

  function isActive(cmd: string) {
    try { return document.queryCommandState(cmd); } catch { return false; }
  }

  function insertImageAtCursor(url: string) {
    editorRef.current?.focus();
    document.execCommand("insertHTML", false,
      `<figure style="margin:20px 0;text-align:center"><img src="${url}" style="max-width:100%;border-radius:4px" /><figcaption style="font-size:12px;color:#9e8050;margin-top:8px">Chú thích ảnh...</figcaption></figure>`
    );
    updateWordCount();
  }

  function handleEditorInput() {
    if (editorRef.current) {
      setForm(prev => ({ ...prev, content: editorRef.current!.innerHTML }));
      updateWordCount();
      setDirty(true);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setForm(prev => {
      const next = { ...prev, [name]: val } as PostInput;
      if (name === "title") next.slug = toSlug(value);
      return next;
    });
    setDirty(true);
  }

  function goBack() {
    if (dirty && !confirm("Bạn có thay đổi chưa lưu. Rời khỏi trang và bỏ qua thay đổi?")) return;
    router.push("/admin/posts");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError("");
    // Sync editor content
    const content = editorRef.current?.innerHTML ?? form.content;
    const payload = { ...form, content, publishedAt: form.isPublished ? new Date().toISOString() : null };
    const res = postId
      ? await fetch(`/api/posts/${postId}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      : await fetch("/api/posts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) { setDirty(false); router.push("/admin/posts"); }
    else { setError("Có lỗi xảy ra, thử lại."); setLoading(false); }
  }

  const toolbarGroups = [
    [
      { cmd: "bold", label: <strong>B</strong>, title: "In đậm (Ctrl+B)" },
      { cmd: "italic", label: <em>I</em>, title: "In nghiêng (Ctrl+I)" },
      { cmd: "underline", label: <u>U</u>, title: "Gạch chân (Ctrl+U)" },
    ],
    [
      { cmd: "formatBlock", val: "H1", label: "H1", title: "Tiêu đề lớn" },
      { cmd: "formatBlock", val: "H2", label: "H2", title: "Tiêu đề vừa" },
      { cmd: "formatBlock", val: "H3", label: "H3", title: "Tiêu đề nhỏ" },
      { cmd: "formatBlock", val: "P", label: "¶", title: "Đoạn văn" },
    ],
    [
      { cmd: "insertUnorderedList", label: "≡", title: "Danh sách chấm" },
      { cmd: "insertOrderedList", label: "1.", title: "Danh sách số" },
      { cmd: "formatBlock", val: "BLOCKQUOTE", label: "❝", title: "Trích dẫn" },
    ],
    [
      { cmd: "justifyLeft", label: "⬅", title: "Căn trái" },
      { cmd: "justifyCenter", label: "⬛", title: "Căn giữa" },
      { cmd: "justifyRight", label: "➡", title: "Căn phải" },
    ],
    [
      { cmd: "undo", label: "↩", title: "Hoàn tác" },
      { cmd: "redo", label: "↪", title: "Làm lại" },
    ],
  ];

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 900, background: "#fff", border: "1px solid #e8d9b0", borderRadius: 6, padding: "40px", display: "flex", flexDirection: "column", gap: 28 }}>

      {/* Tiêu đề & Slug */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div>
          <label style={lbl}>TIÊU ĐỀ *</label>
          <input name="title" value={form.title} onChange={handleChange} required style={inp} placeholder="Tên bài viết..." />
        </div>
        <div>
          <label style={lbl}>SLUG *</label>
          <input name="slug" value={form.slug} onChange={handleChange} required style={{ ...inp, color: "#9e8050" }} />
        </div>
      </div>

      {/* Ảnh bìa */}
      <div>
        <label style={lbl}>ẢNH BÌA</label>
        {form.coverImage && (
          <div style={{ position: "relative", marginBottom: 12, width: "100%", height: 240, borderRadius: 4, overflow: "hidden" }}>
            <Image src={form.coverImage} alt="" fill sizes="700px" style={{ objectFit: "cover" }} />
            <button
              type="button"
              onClick={() => { setForm(prev => ({ ...prev, coverImage: "" })); setDirty(true); }}
              style={{ position: "absolute", top: 10, right: 10, background: "#c0392b", color: "#fff", border: "none", borderRadius: "50%", width: 30, height: 30, cursor: "pointer", fontSize: 18, lineHeight: 1 }}
            >×</button>
          </div>
        )}
        <CldUploadWidget
          uploadPreset="sam_website_unsigned"
          onSuccess={(result) => {
            const url = getSecureUrl(result as UploadResult);
            if (url) { setForm(prev => ({ ...prev, coverImage: url })); setDirty(true); }
          }}
          options={{ maxFiles: 1 }}
        >
          {({ open }) => (
            <button type="button" onClick={() => open()} style={{
              padding: "10px 20px", fontSize: 12, letterSpacing: "0.1em",
              background: "#f5f0e4", color: "#7a5c2e",
              border: "1px dashed #c9a84c", borderRadius: 4, cursor: "pointer",
            }}>
              {form.coverImage ? "ĐỔI ẢNH BÌA" : "+ TẢI ẢNH BÌA LÊN"}
            </button>
          )}
        </CldUploadWidget>
      </div>

      {/* Tóm tắt */}
      <div>
        <label style={lbl}>TÓM TẮT</label>
        <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={2} style={{ ...inp, resize: "vertical" }} placeholder="Mô tả ngắn hiển thị ngoài trang tin tức..." />
      </div>

      {/* Rich text editor */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <label style={lbl}>NỘI DUNG BÀI VIẾT</label>
          <span style={{ fontSize: 11, color: "#b09060" }}>{wordCount} từ</span>
        </div>

        {/* Toolbar */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 4, padding: "8px 12px",
          background: "#faf7f0", border: "1px solid #e2d5b0",
          borderRadius: "4px 4px 0 0",
          borderBottom: "none",
          alignItems: "center",
        }}>
          {toolbarGroups.map((group, gi) => (
            <div key={gi} style={{ display: "flex", gap: 2, paddingRight: 8, borderRight: gi < toolbarGroups.length - 1 ? "1px solid #e2d5b0" : "none", marginRight: gi < toolbarGroups.length - 1 ? 4 : 0 }}>
              {group.map(t => (
                <ToolBtn key={t.cmd + (t as { val?: string }).val} onClick={() => execCmd(t.cmd, (t as { val?: string }).val)} title={t.title} active={!(t as { val?: string }).val && isActive(t.cmd)}>
                  {t.label}
                </ToolBtn>
              ))}
            </div>
          ))}

          {/* Insert link */}
          <div style={{ paddingLeft: 4 }}>
            <ToolBtn title="Chèn đường dẫn" onClick={() => {
              const url = prompt("Nhập URL:");
              if (url) execCmd("createLink", url);
            }}>
              🔗
            </ToolBtn>
          </div>

          {/* Insert image inline */}
          <CldUploadWidget
            uploadPreset="sam_website_unsigned"
            onSuccess={(result) => {
              const url = getSecureUrl(result as UploadResult);
              if (url) insertImageAtCursor(url);
            }}
          >
            {({ open }) => (
              <ToolBtn title="Chèn ảnh vào giữa bài" onClick={() => open()}>
                🖼️ Chèn ảnh
              </ToolBtn>
            )}
          </CldUploadWidget>
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleEditorInput}
          className="rich-editor"
          style={{
            minHeight: 480,
            border: "1px solid #e2d5b0",
            borderRadius: "0 0 4px 4px",
            padding: "20px 24px",
            background: "#fffdf7",
            outline: "none",
            fontSize: 14,
            lineHeight: 1.9,
            color: "#1a1000",
          }}
          data-placeholder="Bắt đầu viết nội dung bài viết... Dùng toolbar để định dạng, chèn ảnh, tiêu đề..."
        />

        {/* Placeholder CSS */}
        <style>{`
          [data-placeholder]:empty::before {
            content: attr(data-placeholder);
            color: #c0a870;
            pointer-events: none;
          }
        `}</style>

        <p style={{ fontSize: 11, color: "#b09060", marginTop: 6 }}>
          💡 Nhấn <kbd style={{ background: "#f0e8d0", padding: "1px 5px", borderRadius: 3, fontSize: 10 }}>🖼️ Chèn ảnh</kbd> để thêm ảnh vào giữa bài viết
        </p>
      </div>

      {/* Hiển thị */}
      <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#5a4020", cursor: "pointer" }}>
        <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange} style={{ width: 15, height: 15, accentColor: GOLD }} />
        Hiển thị công khai
      </label>

      <div style={{ height: 1, background: "linear-gradient(90deg, #e8d9b0, transparent)" }} />
      {error && <p style={{ color: "#c0392b", fontSize: 13 }}>{error}</p>}

      <div style={{ display: "flex", gap: 12 }}>
        <button type="submit" disabled={loading} style={{
          padding: "12px 32px", fontSize: 12, letterSpacing: "0.12em",
          background: loading ? "#c9a84c88" : "linear-gradient(135deg, #c9a84c, #9e7820)",
          color: "#fff", border: "none", borderRadius: 4, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit",
        }}>
          {loading ? "ĐANG LƯU..." : postId ? "CẬP NHẬT BÀI VIẾT" : "ĐĂNG BÀI"}
        </button>
        <button type="button" onClick={goBack} style={{
          padding: "12px 24px", fontSize: 12, letterSpacing: "0.12em",
          background: "#f5f0e4", color: "#7a5c2e", border: "1px solid #e2d5b0", borderRadius: 4, cursor: "pointer", fontFamily: "inherit",
        }}>
          HỦY
        </button>
      </div>
    </form>
  );
}
