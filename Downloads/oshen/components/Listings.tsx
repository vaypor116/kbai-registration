"use client";
import { useState } from "react";
import { View } from "@/app/page";

export const listings = [
  { id: "agritech-01", name: "FarmDirect NG", sector: "AgriTech", location: "Kaduna State", tagline: "Connecting 3,000+ smallholder farmers directly to Lagos markets", goal: 25000000, raised: 18750000, investors: 47, returnType: "Revenue Share", returnRate: "22% p.a.", duration: "18 months", oshenScore: 87, stage: "Revenue Stage", tags: ["Agriculture", "B2B", "Supply Chain"], desc: "FarmDirect eliminates middlemen between Northern Nigerian farmers and Southern markets, increasing farmer income by 40% and reducing food prices for consumers. 3,000 active farmers onboarded.", emoji: "🌱" },
  { id: "energy-01", name: "SolarKasa", sector: "CleanEnergy", location: "Plateau State", tagline: "Pay-as-you-go solar energy for rural Nigerian households", goal: 30000000, raised: 22000000, investors: 63, returnType: "Fixed Return", returnRate: "24% after 18mo", duration: "18 months", oshenScore: 91, stage: "Scale Stage", tags: ["Energy", "Rural", "Climate"], desc: "SolarKasa has powered 2,400 homes across Plateau and Nasarawa States. Monthly subscription model with 94% repayment rate. Expanding to Benue and Kogi.", emoji: "☀️" },
  { id: "health-01", name: "MediReach", sector: "HealthTech", location: "Abuja, FCT", tagline: "Telemedicine platform serving underserved communities across Nigeria", goal: 15000000, raised: 9200000, investors: 31, returnType: "Fixed Return", returnRate: "18% after 12mo", duration: "12 months", oshenScore: 82, stage: "Growth Stage", tags: ["Health", "Mobile", "Rural"], desc: "MediReach brings qualified doctors to patients in rural Nigeria via mobile. 12,000 consultations completed. Partnered with 3 state health ministries.", emoji: "🏥" },
  { id: "edtech-01", name: "SkillBridge Academy", sector: "EdTech", location: "Lagos State", tagline: "Vocational digital skills training for out-of-school youth", goal: 10000000, raised: 7800000, investors: 28, returnType: "Revenue Share", returnRate: "20% p.a.", duration: "24 months", oshenScore: 79, stage: "Revenue Stage", tags: ["Education", "Youth", "Digital Skills"], desc: "Training 500+ young Nigerians per cohort in graphic design, video editing and digital marketing. 73% job placement rate within 3 months of graduation.", emoji: "📚" },
  { id: "fintech-01", name: "PayLocal", sector: "FinTech", location: "Port Harcourt", tagline: "POS and payment infrastructure for market traders", goal: 20000000, raised: 4500000, investors: 19, returnType: "Equity", returnRate: "3% equity stake", duration: "Long term", oshenScore: 74, stage: "Early Stage", tags: ["Payments", "SME", "Infrastructure"], desc: "PayLocal deploys affordable POS terminals to market traders with zero upfront cost. Revenue from transaction fees. 800 active terminals across Rivers State.", emoji: "💳" },
  { id: "logistics-01", name: "SwiftMove", sector: "Logistics", location: "Kano State", tagline: "Last-mile delivery network for Northern Nigerian e-commerce", goal: 18000000, raised: 6300000, investors: 22, returnType: "Revenue Share", returnRate: "19% p.a.", duration: "12 months", oshenScore: 76, stage: "Growth Stage", tags: ["Logistics", "E-commerce", "North"], desc: "SwiftMove operates 45 delivery hubs across Kano, Kaduna and Katsina. Processing 1,200 deliveries per day with 98% on-time rate.", emoji: "🚚" },
];

const sectors = ["All", "AgriTech", "HealthTech", "EdTech", "FinTech", "CleanEnergy", "Logistics"];

interface ListingsProps {
  setView: (v: View) => void;
  openAuth: (mode: "investor" | "builder") => void;
  setSelectedListing: (id: string) => void;
  fullPage?: boolean;
}

export default function Listings({ setView, openAuth, setSelectedListing, fullPage }: ListingsProps) {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? listings : listings.filter(l => l.sector === filter);

  const scoreColor = (score: number) => score >= 85 ? "var(--accent)" : score >= 75 ? "var(--gold)" : "var(--text-mid)";
  const scoreBg = (score: number) => score >= 85 ? "var(--accent-pale)" : score >= 75 ? "var(--gold-pale)" : "rgba(0,0,0,0.04)";

  return (
    <section style={{ padding: fullPage ? "96px 28px 80px" : "0 28px 96px", background: fullPage ? "var(--bg)" : "var(--white)", borderTop: fullPage ? "none" : "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
          <div>
            {!fullPage && <div className="section-label">Live opportunities</div>}
            <h2 className="serif" style={{ fontSize: fullPage ? "clamp(28px, 3.5vw, 42px)" : 28, fontWeight: 400, letterSpacing: "-0.8px", color: "var(--text)" }}>
              {fullPage ? "Browse all opportunities" : "Verified businesses, seeking capital."}
            </h2>
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {sectors.map(s => (
              <button key={s} onClick={() => setFilter(s)} style={{
                background: filter === s ? "var(--accent)" : "var(--card)",
                border: `1px solid ${filter === s ? "transparent" : "var(--border)"}`,
                color: filter === s ? "white" : "var(--text-mid)",
                padding: "5px 13px", borderRadius: 100, cursor: "pointer",
                fontSize: 12, fontWeight: 600, fontFamily: "Cabinet Grotesk",
                transition: "all 0.15s",
              }}>{s}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 18 }}>
          {filtered.map(l => {
            const pct = Math.round((l.raised / l.goal) * 100);
            return (
              <div key={l.id} className="card" style={{ padding: 24, cursor: "pointer" }}
                onClick={() => setSelectedListing(l.id)}
              >
                {/* Top */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--accent-pale)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{l.emoji}</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: "var(--text)", marginBottom: 2 }}>{l.name}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)", fontFamily: "DM Mono, monospace" }}>📍 {l.location}</div>
                    </div>
                  </div>
                  {/* Score */}
                  <div style={{ background: scoreBg(l.oshenScore), borderRadius: 9, padding: "5px 10px", textAlign: "center", border: `1px solid ${scoreColor(l.oshenScore)}25` }}>
                    <div style={{ fontSize: 16, fontWeight: 900, color: scoreColor(l.oshenScore), lineHeight: 1 }}>{l.oshenScore}</div>
                    <div style={{ fontSize: 8, color: "var(--muted)", fontFamily: "DM Mono, monospace", marginTop: 1, letterSpacing: 0.5 }}>SCORE</div>
                  </div>
                </div>

                {/* Stage + tags */}
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
                  <span className="tag tag-green">{l.stage}</span>
                  {l.tags.map(t => <span key={t} className="tag tag-neutral">{t}</span>)}
                </div>

                <p style={{ fontSize: 13, color: "var(--text-mid)", lineHeight: 1.65, marginBottom: 18 }}>{l.tagline}</p>

                {/* Progress */}
                <div style={{ marginBottom: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                    <span style={{ fontSize: 12, color: "var(--muted)", fontFamily: "DM Mono, monospace" }}>₦{(l.raised / 1000000).toFixed(1)}M raised</span>
                    <span style={{ fontSize: 12, color: "var(--accent)", fontFamily: "DM Mono, monospace", fontWeight: 600 }}>{pct}%</span>
                  </div>
                  <div style={{ height: 5, background: "rgba(0,0,0,0.06)", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, var(--accent-light), var(--accent))", borderRadius: 4 }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                    <span style={{ fontSize: 10, color: "var(--muted)" }}>{l.investors} investors</span>
                    <span style={{ fontSize: 10, color: "var(--muted)" }}>Goal: ₦{(l.goal / 1000000).toFixed(0)}M</span>
                  </div>
                </div>

                {/* Return + CTA */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "var(--bg)", borderRadius: 10, border: "1px solid var(--border)" }}>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--muted)", marginBottom: 2 }}>{l.returnType} · {l.duration}</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "var(--accent)" }}>{l.returnRate}</div>
                  </div>
                  <button className="btn-primary" onClick={e => { e.stopPropagation(); openAuth("investor"); }} style={{ padding: "8px 16px", fontSize: 12 }}>
                    Invest →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {!fullPage && (
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <button className="btn-secondary" onClick={() => setView("invest")} style={{ padding: "12px 28px" }}>
              View all {listings.length} opportunities →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
