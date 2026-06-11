"use client";
import { listings } from "./Listings";

interface Props {
  id: string;
  onClose: () => void;
  openAuth: (mode: "investor" | "builder") => void;
}

export default function ListingModal({ id, onClose, openAuth }: Props) {
  const l = listings.find(x => x.id === id);
  if (!l) return null;
  const pct = Math.round((l.raised / l.goal) * 100);
  const scoreColor = (s: number) => s >= 85 ? "var(--accent)" : s >= 75 ? "var(--gold)" : "var(--text-mid)";
  const scoreBg = (s: number) => s >= 85 ? "var(--accent-pale)" : s >= 75 ? "var(--gold-pale)" : "rgba(0,0,0,0.04)";

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 150, background: "rgba(13,31,23,0.5)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
      onClick={onClose}>
      <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 24, padding: 36, width: "100%", maxWidth: 540, maxHeight: "85vh", overflowY: "auto", position: "relative", boxShadow: "0 24px 60px rgba(0,0,0,0.15)" }}
        onClick={e => e.stopPropagation()}>

        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.05)", border: "none", width: 28, height: 28, borderRadius: "50%", cursor: "pointer", fontSize: 14, color: "var(--text-mid)", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>

        {/* Header */}
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 20 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: "var(--accent-pale)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{l.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.3px" }}>{l.name}</h2>
              <span className="tag tag-green">{l.stage}</span>
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "DM Mono, monospace" }}>{l.sector} · {l.location}</div>
          </div>
          <div style={{ background: scoreBg(l.oshenScore), borderRadius: 12, padding: "10px 14px", textAlign: "center", border: `1px solid ${scoreColor(l.oshenScore)}30`, flexShrink: 0 }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: scoreColor(l.oshenScore), lineHeight: 1 }}>{l.oshenScore}</div>
            <div style={{ fontSize: 9, color: "var(--muted)", fontFamily: "DM Mono, monospace", marginTop: 2 }}>OSHEN SCORE</div>
          </div>
        </div>

        <p style={{ fontSize: 14, color: "var(--text-mid)", lineHeight: 1.75, marginBottom: 24 }}>{l.desc}</p>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
          {[
            { label: "Funding Goal", value: `₦${(l.goal / 1000000).toFixed(0)}M` },
            { label: "Raised", value: `₦${(l.raised / 1000000).toFixed(1)}M` },
            { label: "Investors", value: l.investors.toString() },
            { label: "Return Type", value: l.returnType },
            { label: "Return Rate", value: l.returnRate },
            { label: "Duration", value: l.duration },
          ].map(s => (
            <div key={s.label} style={{ background: "var(--bg)", borderRadius: 10, padding: "12px 14px", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: 10, color: "var(--muted)", fontFamily: "DM Mono, monospace", marginBottom: 4 }}>{s.label.toUpperCase()}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>Funding progress</span>
            <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 700 }}>{pct}% funded</span>
          </div>
          <div style={{ height: 6, background: "rgba(0,0,0,0.06)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, var(--accent-light), var(--accent))", borderRadius: 4 }} />
          </div>
        </div>

        <button className="btn-primary" onClick={() => { onClose(); openAuth("investor"); }} style={{ width: "100%", padding: "14px", fontSize: 15 }}>
          Invest in {l.name} →
        </button>
      </div>
    </div>
  );
}
