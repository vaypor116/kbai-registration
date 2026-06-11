"use client";
import { View } from "@/app/page";

interface HeroProps {
  setView: (v: View) => void;
  openAuth: (mode: "investor" | "builder") => void;
}

export default function Hero({ setView, openAuth }: HeroProps) {
  return (
    <section style={{ paddingTop: 60, background: "var(--bg)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top hero text area */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "72px 28px 48px", width: "100%" }}>
        {/* Badge */}
        <div className="animate-slide-up" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "var(--accent-pale)", border: "1px solid rgba(82,183,136,0.3)", borderRadius: 100, padding: "5px 14px", marginBottom: 28 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-light)" }} />
          <span className="mono" style={{ fontSize: 11, color: "var(--accent)", letterSpacing: 0.5 }}>Now live in Nigeria · Verified businesses only</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "flex-start" }}>
          {/* Left — headline */}
          <div>
            <h1 className="animate-slide-up delay-1 serif" style={{
              fontSize: "clamp(40px, 5vw, 62px)",
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: "-1.5px",
              color: "var(--text)",
              marginBottom: 22,
            }}>
              Invest in<br />
              <em>African businesses.</em><br />
              <span style={{ color: "var(--accent)" }}>Earn real returns.</span>
            </h1>

            <p className="animate-slide-up delay-2" style={{ fontSize: 16, color: "var(--text-mid)", lineHeight: 1.7, maxWidth: 420, marginBottom: 36, fontWeight: 400 }}>
              OSHEN connects everyday Nigerians to verified, audited businesses seeking growth capital. Start from ₦50,000 and earn returns as they grow.
            </p>

            <div className="animate-slide-up delay-3" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 48 }}>
              <button className="btn-primary" onClick={() => setView("invest")} style={{ padding: "13px 28px", fontSize: 14 }}>
                Browse opportunities →
              </button>
              <button className="btn-secondary" onClick={() => openAuth("builder")} style={{ padding: "12px 24px", fontSize: 14 }}>
                List your business
              </button>
            </div>

            {/* Trust signals */}
            <div className="animate-slide-up delay-4" style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {[
                { icon: "🛡", text: "SEC compliant" },
                { icon: "✓", text: "BVN verified" },
                { icon: "⚡", text: "OPay powered" },
              ].map(t => (
                <div key={t.text} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 13 }}>{t.icon}</span>
                  <span style={{ fontSize: 12, color: "var(--text-mid)", fontWeight: 500 }}>{t.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — dashboard preview */}
          <div className="animate-slide-up delay-2 animate-float" style={{ position: "relative" }}>
            {/* Main dashboard card */}
            <div style={{
              background: "var(--white)", borderRadius: 20,
              border: "1px solid var(--border)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.06)",
              overflow: "hidden",
            }}>
              {/* Dashboard header */}
              <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 2 }} className="mono">PORTFOLIO OVERVIEW</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.5px" }}>₦847,500</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: "var(--accent-light)", fontWeight: 600 }} className="mono">+18.4%</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>Annual return</div>
                </div>
              </div>

              {/* Mini chart bars */}
              <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 50 }}>
                  {[30, 45, 35, 55, 48, 62, 58, 70, 65, 80, 75, 90].map((h, i) => (
                    <div key={i} style={{
                      flex: 1, height: `${h}%`,
                      background: i === 11 ? "var(--accent)" : "var(--accent-pale)",
                      borderRadius: "3px 3px 0 0",
                      transition: "height 0.3s",
                    }} />
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <span style={{ fontSize: 10, color: "var(--muted)" }} className="mono">Jan</span>
                  <span style={{ fontSize: 10, color: "var(--muted)" }} className="mono">Dec</span>
                </div>
              </div>

              {/* Mini investments */}
              <div style={{ padding: "12px 22px" }}>
                {[
                  { name: "SolarKasa", sector: "CleanEnergy", return: "+24%", amount: "₦150k" },
                  { name: "FarmDirect NG", sector: "AgriTech", return: "+22%", amount: "₦100k" },
                  { name: "MediReach", sector: "HealthTech", return: "+18%", amount: "₦75k" },
                ].map((inv, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 2 ? "1px solid var(--border)" : "none" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ width: 28, height: 28, borderRadius: 7, background: "var(--accent-pale)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>
                        {inv.sector === "CleanEnergy" ? "☀️" : inv.sector === "AgriTech" ? "🌱" : "🏥"}
                      </div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text)" }}>{inv.name}</div>
                        <div style={{ fontSize: 10, color: "var(--muted)" }}>{inv.sector}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)" }}>{inv.return}</div>
                      <div style={{ fontSize: 10, color: "var(--muted)" }}>{inv.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating notification card */}
            <div style={{
              position: "absolute", bottom: -20, left: -24,
              background: "var(--white)", borderRadius: 12,
              border: "1px solid var(--border)",
              boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
              padding: "12px 16px",
              display: "flex", alignItems: "center", gap: 10,
              minWidth: 200,
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--accent-pale)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>💰</div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text)" }}>Return received</div>
                <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600 }}>+₦7,500 from SolarKasa</div>
              </div>
            </div>

            {/* Score badge */}
            <div style={{
              position: "absolute", top: -16, right: -16,
              background: "var(--accent)", borderRadius: 12,
              padding: "10px 14px", textAlign: "center",
              boxShadow: "0 4px 20px rgba(27,67,50,0.3)",
            }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: "white", lineHeight: 1 }}>91</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.7)", marginTop: 2 }} className="mono">OSHEN SCORE</div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="animate-slide-up delay-5" style={{
          marginTop: 64, display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          background: "var(--white)", borderRadius: 14, border: "1px solid var(--border)",
          overflow: "hidden",
        }}>
          {[
            { value: "₦2.4B+", label: "Total invested", icon: "📈" },
            { value: "847", label: "Active investors", icon: "👥" },
            { value: "63", label: "Verified businesses", icon: "✓" },
            { value: "18.4%", label: "Avg. annual return", icon: "💹" },
          ].map(({ value, label, icon }, i) => (
            <div key={label} style={{
              padding: "24px 28px",
              borderRight: i < 3 ? "1px solid var(--border)" : "none",
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <div style={{ fontSize: 22 }}>{icon}</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.5px" }}>{value}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
