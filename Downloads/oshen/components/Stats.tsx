"use client";

const features = [
  {
    icon: "🛡",
    title: "Verified & Audited",
    desc: "Every business passes a rigorous 7-point verification. CAC registration, 6 months financials, BVN — all confirmed before listing.",
  },
  {
    icon: "📈",
    title: "Real Returns",
    desc: "Choose from revenue share, fixed returns or equity. Builders set their terms. You choose what fits your investment goals.",
  },
  {
    icon: "⚡",
    title: "OPay Powered",
    desc: "Invest and receive returns directly through OPay. Instant transfers, zero friction. Built for how Nigerians already move money.",
  },
  {
    icon: "🌍",
    title: "Africa First",
    desc: "Built for Nigerian realities. Works on any device, any network. Every naira stays in Africa and builds Africa.",
  },
];

export default function Stats() {
  return (
    <section style={{ background: "var(--white)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "80px 28px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="section-label">Why OSHEN</div>
          <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, letterSpacing: "-1px", color: "var(--text)" }}>
            Built for trust. Designed for growth.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {features.map((f, i) => (
            <div key={i} style={{ padding: "28px 26px", borderRadius: 14, border: "1px solid var(--border)", background: "var(--card)", transition: "box-shadow 0.2s, transform 0.2s", cursor: "default" }}
              onMouseOver={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 30px rgba(0,0,0,0.07)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
              onMouseOut={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 11, background: "var(--accent-pale)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 16 }}>{f.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
