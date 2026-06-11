"use client";
import { useState } from "react";
import { View } from "@/app/page";

interface Props { setView: (v: View) => void; }

const portfolio = [
  { name: "SolarKasa", sector: "CleanEnergy", emoji: "☀️", invested: 150000, currentValue: 172500, returnRate: "24%", status: "Active", progress: 73 },
  { name: "FarmDirect NG", sector: "AgriTech", emoji: "🌱", invested: 100000, currentValue: 111000, returnRate: "22%", status: "Active", progress: 75 },
  { name: "MediReach", sector: "HealthTech", emoji: "🏥", invested: 75000, currentValue: 80250, returnRate: "18%", status: "Active", progress: 61 },
];

const activity = [
  { type: "return", desc: "Return payment from SolarKasa", amount: "+₦7,500", time: "2 hours ago", positive: true },
  { type: "invest", desc: "Invested in FarmDirect NG", amount: "-₦100,000", time: "3 days ago", positive: false },
  { type: "return", desc: "Return payment from MediReach", amount: "+₦3,200", time: "1 week ago", positive: true },
  { type: "invest", desc: "Invested in SolarKasa", amount: "-₦150,000", time: "2 weeks ago", positive: false },
];

export default function InvestorDashboard({ setView }: Props) {
  const [activeTab, setActiveTab] = useState<"portfolio" | "activity" | "explore">("portfolio");
  const totalInvested = portfolio.reduce((a, b) => a + b.invested, 0);
  const totalValue = portfolio.reduce((a, b) => a + b.currentValue, 0);
  const totalReturn = totalValue - totalInvested;
  const returnPct = ((totalReturn / totalInvested) * 100).toFixed(1);

  return (
    <div style={{ paddingTop: 60, minHeight: "100vh", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 28px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div className="section-label">Investor Dashboard</div>
            <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.5px", color: "var(--text)" }}>Welcome back, Rinji 👋</h1>
            <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>Your portfolio is growing steadily.</p>
          </div>
          <button className="btn-primary" onClick={() => setView("invest")}>+ New investment</button>
        </div>

        {/* Summary */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 32 }}>
          {[
            { label: "Total Invested", value: `₦${(totalInvested / 1000).toFixed(0)}k`, sub: "Across 3 businesses", accent: false },
            { label: "Current Value", value: `₦${(totalValue / 1000).toFixed(1)}k`, sub: `+₦${(totalReturn / 1000).toFixed(1)}k gain`, accent: true },
            { label: "Total Returns", value: `+${returnPct}%`, sub: "Annualized average", accent: true },
            { label: "Active Investments", value: "3", sub: "All performing well", accent: false },
          ].map(c => (
            <div key={c.label} style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 14, padding: "20px 18px" }}>
              <div style={{ fontSize: 10, color: "var(--muted)", fontFamily: "DM Mono, monospace", letterSpacing: 0.5, marginBottom: 8 }}>{c.label.toUpperCase()}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: c.accent ? "var(--accent)" : "var(--text)", letterSpacing: "-0.5px", marginBottom: 3 }}>{c.value}</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 24, borderBottom: "1px solid var(--border)" }}>
          {(["portfolio", "activity", "explore"] as const).map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "10px 20px", fontSize: 13, fontWeight: activeTab === t ? 700 : 500,
              fontFamily: "Cabinet Grotesk",
              color: activeTab === t ? "var(--accent)" : "var(--muted)",
              borderBottom: activeTab === t ? "2px solid var(--accent)" : "2px solid transparent",
              transition: "all 0.15s", marginBottom: -1, textTransform: "capitalize",
            }}>{t}</button>
          ))}
        </div>

        {activeTab === "portfolio" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {portfolio.map(p => (
              <div key={p.name} style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 16, padding: "22px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 40, height: 40, borderRadius: 11, background: "var(--accent-pale)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{p.emoji}</div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: "var(--text)" }}>{p.name}</span>
                        <span className="tag tag-green">{p.status}</span>
                      </div>
                      <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{p.sector}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 24 }}>
                    {[
                      { label: "Invested", value: `₦${(p.invested / 1000).toFixed(0)}k`, accent: false },
                      { label: "Current Value", value: `₦${(p.currentValue / 1000).toFixed(1)}k`, accent: true },
                      { label: "Return", value: p.returnRate, accent: true },
                    ].map(s => (
                      <div key={s.label} style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 10, color: "var(--muted)", fontFamily: "DM Mono, monospace", marginBottom: 2 }}>{s.label.toUpperCase()}</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: s.accent ? "var(--accent)" : "var(--text)" }}>{s.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ height: 4, background: "rgba(0,0,0,0.06)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${p.progress}%`, background: "linear-gradient(90deg, var(--accent-light), var(--accent))", borderRadius: 4 }} />
                </div>
                <div style={{ fontSize: 10, color: "var(--muted)", fontFamily: "DM Mono, monospace", marginTop: 6 }}>{p.progress}% of investment term completed</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "activity" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {activity.map((a, i) => (
              <div key={i} style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 12, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: a.positive ? "var(--accent-pale)" : "rgba(0,0,0,0.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>
                    {a.positive ? "↑" : "↓"}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{a.desc}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)", fontFamily: "DM Mono, monospace", marginTop: 2 }}>{a.time}</div>
                  </div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: a.positive ? "var(--accent)" : "var(--text)" }}>{a.amount}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "explore" && (
          <div style={{ textAlign: "center", padding: "60px 24px", background: "var(--white)", borderRadius: 16, border: "1px solid var(--border)" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🔍</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>Discover new opportunities</div>
            <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 24 }}>Browse all verified listings and grow your portfolio</div>
            <button className="btn-primary" onClick={() => setView("invest")} style={{ padding: "12px 28px" }}>Browse listings →</button>
          </div>
        )}
      </div>
    </div>
  );
}
