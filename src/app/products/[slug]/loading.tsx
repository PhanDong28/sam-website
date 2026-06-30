export default function ProductDetailLoading() {
  return (
    <div style={{ background: "#faf7f0", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "32px 32px 80px" }}>
        <div className="grid-detail">
          <div className="skeleton" style={{ aspectRatio: "1", borderRadius: 4 }} />
          <div>
            <div className="skeleton" style={{ height: 14, width: "30%", borderRadius: 4, marginBottom: 16 }} />
            <div className="skeleton" style={{ height: 38, width: "80%", borderRadius: 4, marginBottom: 20 }} />
            <div className="skeleton" style={{ height: 14, width: "100%", borderRadius: 4, marginBottom: 8 }} />
            <div className="skeleton" style={{ height: 14, width: "90%", borderRadius: 4, marginBottom: 28 }} />
            <div className="skeleton" style={{ height: 100, borderRadius: 6 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
