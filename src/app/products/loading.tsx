export default function ProductsLoading() {
  return (
    <div style={{ background: "#faf7f0", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(160deg, #140d00, #1e1200)", height: 180 }} />
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "48px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 28 }}>
          {[...Array(6)].map((_, i) => (
            <div key={i}>
              <div className="skeleton" style={{ aspectRatio: "4/3", borderRadius: 14, marginBottom: 12 }} />
              <div className="skeleton" style={{ height: 14, width: "60%", borderRadius: 4 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
