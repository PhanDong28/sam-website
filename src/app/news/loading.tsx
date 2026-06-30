export default function NewsLoading() {
  return (
    <div style={{ background: "#faf7f0", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(160deg, #140d00, #1e1200)", height: 200 }} />
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 24px" }}>
        <div className="skeleton" style={{ aspectRatio: "16/8", borderRadius: 8, marginBottom: 56 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 28 }}>
          {[...Array(3)].map((_, i) => (
            <div key={i}>
              <div className="skeleton" style={{ height: 200, borderRadius: 8, marginBottom: 12 }} />
              <div className="skeleton" style={{ height: 14, width: "70%", borderRadius: 4 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
