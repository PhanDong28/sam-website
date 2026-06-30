"use client";
import { useEffect, useState } from "react";

type Contact = { id: string; name: string; email: string; phone: string | null; message: string | null; isRead: boolean; createdAt: string };
const GOLD = "#c9a84c";

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Contact | null>(null);

  useEffect(() => {
    fetch("/api/contacts").then(r => r.json()).then(d => { setContacts(d); setLoading(false); });
  }, []);

  async function markRead(c: Contact) {
    if (c.isRead) { setSelected(c); return; }
    await fetch(`/api/contacts/${c.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isRead: true }) });
    setContacts(prev => prev.map(x => x.id === c.id ? { ...x, isRead: true } : x));
    setSelected({ ...c, isRead: true });
  }

  async function markAllRead() {
    const unreadContacts = contacts.filter(c => !c.isRead);
    if (unreadContacts.length === 0) return;
    await Promise.all(
      unreadContacts.map(c =>
        fetch(`/api/contacts/${c.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isRead: true }) })
      )
    );
    setContacts(prev => prev.map(c => ({ ...c, isRead: true })));
  }

  function exportExcel() {
    const headers = ["Họ tên", "Email", "Điện thoại", "Nội dung", "Trạng thái", "Thời gian"];
    const rows = contacts.map(c => [
      c.name,
      c.email,
      c.phone || "",
      (c.message || "").replace(/[\r\n]+/g, " "),
      c.isRead ? "Đã đọc" : "Chưa đọc",
      new Date(c.createdAt).toLocaleString("vi-VN"),
    ]);
    const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
    // BOM giúp Excel nhận đúng tiếng Việt UTF-8
    const csv = "\uFEFF" + [headers, ...rows].map(r => r.map(v => escape(String(v))).join(",")).join("\r\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `lien-he-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function del(id: string) {
    if (!confirm("Xóa liên hệ này?")) return;
    await fetch(`/api/contacts/${id}`, { method: "DELETE" });
    setContacts(prev => prev.filter(c => c.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  const unread = contacts.filter(c => !c.isRead).length;

  return (
    <div className="contacts-grid" style={{ padding: "48px", display: "grid", gridTemplateColumns: selected ? "1fr 1.2fr" : "1fr", gap: 28 }}>
      <div className="fade-in-up">
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
          <div>
            <span style={{ fontSize: 10, letterSpacing: "0.25em", color: GOLD, display: "block", marginBottom: 8 }}>QUẢN LÝ</span>
            <h2 style={{ fontSize: 26, fontWeight: 400, color: "#1a1000", fontFamily: "var(--font-serif), Georgia, serif", margin: 0 }}>
              Liên hệ {unread > 0 && <span className="pulse-decor" style={{ fontSize: 14, background: GOLD, color: "#fff", borderRadius: 20, padding: "2px 10px", marginLeft: 8 }}>{unread}</span>}
            </h2>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={markAllRead}
              disabled={unread === 0}
              style={{
                fontSize: 12, padding: "9px 18px", borderRadius: 4, letterSpacing: "0.04em",
                border: `1px solid ${GOLD}66`, background: "#fff", color: unread === 0 ? "#c9bca0" : "#9e7820",
                cursor: unread === 0 ? "not-allowed" : "pointer", fontFamily: "inherit",
              }}
            >
              Đánh dấu tất cả đã đọc
            </button>
            <button
              onClick={exportExcel}
              disabled={contacts.length === 0}
              style={{
                fontSize: 12, padding: "9px 18px", borderRadius: 4, letterSpacing: "0.04em",
                border: "none", background: contacts.length === 0 ? "#e8d9b0" : "linear-gradient(135deg, #c9a84c, #9e7820)",
                color: "#fff", cursor: contacts.length === 0 ? "not-allowed" : "pointer", fontFamily: "inherit",
              }}
            >
              Xuất Excel
            </button>
          </div>
        </div>
        <div style={{ background: "#fff", border: "1px solid #e8d9b0", borderRadius: 6, overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: 20 }}>
              {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: 52, marginBottom: 10 }} />)}
            </div>
          ) : contacts.length === 0 ? (
            <p style={{ textAlign: "center", padding: "64px", color: "#b09060", fontSize: 13 }}>Chưa có liên hệ nào</p>
          ) : contacts.map((c, i) => (
            <div key={c.id} onClick={() => markRead(c)} className="admin-row"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: i < contacts.length - 1 ? "1px solid #f5eedc" : "none", cursor: "pointer", background: selected?.id === c.id ? "#fffbf0" : "transparent" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flex: 1, minWidth: 0 }}>
                {!c.isRead && <div style={{ width: 7, height: 7, borderRadius: "50%", background: GOLD, flexShrink: 0 }} />}
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: c.isRead ? 400 : 600, color: "#1a1000", marginBottom: 2 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: "#b09060", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.email}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                <span style={{ fontSize: 11, color: "#b09060" }}>{new Date(c.createdAt).toLocaleDateString("vi-VN")}</span>
                <button onClick={e => { e.stopPropagation(); del(c.id); }} style={{ fontSize: 11, color: "#c0392b", background: "none", border: "none", cursor: "pointer" }}>✕</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fade-in-up" style={{ background: "#fff", border: "1px solid #e8d9b0", borderRadius: 6, padding: "32px", position: "sticky", top: 80, alignSelf: "start" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", color: GOLD }}>CHI TIẾT LIÊN HỆ</div>
            <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#b09060", fontSize: 16 }}>✕</button>
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 400, color: "#1a1000", fontFamily: "var(--font-serif), Georgia, serif", margin: "0 0 20px" }}>{selected.name}</h3>
          {[
            { label: "Email", val: selected.email },
            { label: "Điện thoại", val: selected.phone || "—" },
            { label: "Thời gian", val: new Date(selected.createdAt).toLocaleString("vi-VN") },
          ].map(r => (
            <div key={r.label} style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#b09060", marginBottom: 4 }}>{r.label.toUpperCase()}</div>
              <div style={{ fontSize: 13, color: "#3a2a00" }}>{r.val}</div>
            </div>
          ))}
          {selected.message && (
            <div style={{ marginTop: 20, padding: "16px", background: "#fdfaf3", borderRadius: 4, border: "1px solid #f0e8cc" }}>
              <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#b09060", marginBottom: 10 }}>NỘI DUNG</div>
              <p style={{ color: "#3a2a00", fontSize: 13, lineHeight: 1.8, margin: 0 }}>{selected.message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
