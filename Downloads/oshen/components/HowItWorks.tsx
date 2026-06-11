"use client";

const investorSteps = [
  { n: "01", title: "Create your account", desc: "Sign up and verify your identity with BVN. Fully secure, takes under 5 minutes." },
  { n: "02", title: "Browse verified listings", desc: "Explore audited businesses with full financials, OSHEN scores and return structures." },
  { n: "03", title: "Invest via OPay", desc: "Choose your amount from ₦50,000. Funds held in secured escrow instantly." },
  { n: "04", title: "Earn your returns", desc: "Track performance in real time. Receive returns directly to your OPay wallet." },
];

const builderSteps = [
  { n: "01", title: "Submit your application", desc: "Tell us about your business, share your CAC documents and 6 months of financials." },
  { n: "02", title: "Pass verification", desc: "Our team audits your business thoroughly. You receive an OSHEN Score when approved." },
  { n: "03", title: "Set your terms", desc: "Choose your funding goal and return structure — revenue share, fixed return or equity." },
  { n: "04", title: "Receive funding", desc: "Go live to thousands of investors. Funds released in milestones as you grow." },
];

export default function HowItWorks() {
  return (
    <section style={{ padding: "96px 28px", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="section-label">How it works</div>
          <h2 className="serif" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400, letterSpacing: "-1px", color: "var(--text)" }}>
            Simple, transparent, secure.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {[
            { title: "For Investors", color: "var(--accent)", bg: "var(--accent-pale)", steps: investorSteps, emoji: "📈" },
            { title: "For Builders", color: "var(--gold)", bg: "var(--gold-pale)", steps: builderSteps, emoji: "🏗" },
          ].map(({ title, color, bg, steps, emoji }) => (
            <div key={title} style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 20, padding: "36px 32px", overflow: "hidden", position: "relative" }}>
              {/* Background decoration */}
              <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: bg, opacity: 0.5 }} />

              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32, position: "relative" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{emoji}</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "var(--text)" }}>{title}</div>
                  <div style={{ fontSize: 11, color, fontFamily: "DM Mono, monospace" }}>4 simple steps</div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {steps.map((s, i) => (
                  <div key={s.n} style={{ display: "flex", gap: 16, position: "relative" }}>
                    {/* Line connector */}
                    {i < steps.length - 1 && (
                      <div style={{ position: "absolute", left: 15, top: 32, bottom: -8, width: 1, background: "var(--border)", zIndex: 0 }} />
                    )}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 2, zIndex: 1 }}>
                      <div style={{ width: 30, height: 30, borderRadius: "50%", background: bg, border: `1.5px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color, fontFamily: "DM Mono, monospace" }}>{s.n}</span>
                      </div>
                    </div>
                    <div style={{ paddingBottom: 24 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{s.title}</div>
                      <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.65 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
