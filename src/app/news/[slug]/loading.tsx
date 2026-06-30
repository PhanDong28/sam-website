export default function NewsDetailLoading() {
  return (
    <div style={{ background: "#faf7f0", minHeight: "100vh" }}>
      <div className="skeleton" style={{ width: "100%", height: 420 }} />
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "56px 24px 80px" }}>
        <div className="skeleton" style={{ height: 14, width: "20%", borderRadius: 4, marginBottom: 24 }} />
        <div className="skeleton" style={{ height: 34, width: "90%", borderRadius: 4, marginBottom: 12 }} />
        <div className="skeleton" style={{ height: 34, width: "60%", borderRadius: 4, marginBottom: 32 }} />
        <div className="skeleton" style={{ height: 14, width: "100%", borderRadius: 4, marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 14, width: "100%", borderRadius: 4, marginBottom: 8 }} />
        <div className="skeleton" style={{ height: 14, width: "80%", borderRadius: 4 }} />
      </div>
    </div>
  );
}
