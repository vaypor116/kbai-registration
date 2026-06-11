"use client";
import { useState } from "react";

interface Props {
  openAuth: (mode: "investor" | "builder") => void;
  isDashboard?: boolean;
}

const milestones = [
  { title: "Business registered on OSHEN", done: true },
  { title: "CAC documents verified", done: true },
  { title: "BVN & identity confirmed", done: true },
  { title: "Financial audit completed", done: true },
  { title: "OSHEN Score assigned", done: true },
  { title: "Listing goes live", done: false },
  { title: "First investor funds received", done: false },
];

const sectors = ["AgriTech", "HealthTech", "EdTech", "FinTech", "CleanEnergy", "Logistics", "Technology", "Retail", "Manufacturing", "Other"];

export default function BuilderDashboard({ openAuth, isDashboard }: Props) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ bizName: "", sector: "", location: "", tagline: "", goal: "", returnType: "Revenue Share", returnRate: "", duration: "", desc: "" });

  const inp: React.CSSProperties = { width: "100%", background: "var(--bg)", border: "1.5px solid var(--border)", borderRadius: 9, padding: "11px 14px", color: "var(--text)", fontSize: 14, fontFamily: "Cabinet Grotesk", outline: "none" };
  const lbl: React.CSSProperties = { display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-mid)", marginBottom: 6 };

  if (isDashboard) {
    return (
      <div style={{ paddingTop: 60, minHeight: "100vh", background: "var(--bg)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 28px" }}>
          <div className="section-label">Builder Dashboard</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, letterSpacing: "-0.5px", color: "var(--text)" }}>Your listing status</h1>

          <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 20, padding: 32, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text)", marginBottom: 4 }}>Realm Technology Ltd.</h2>
                <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "DM Mono, monospace" }}>Technology · Abuja, FCT</div>
              </div>
              <span className="tag tag-gold" style={{ fontSize: 11, padding: "5px 12px" }}>UNDER REVIEW</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {milestones.map((m, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, background: m.done ? "var(--accent)" : "var(--bg)", border: m.done ? "none" : "1.5px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "white", fontWeight: 700 }}>
                    {m.done ? "✓" : ""}
                  </div>
                  <span style={{ fontSize: 13, color: m.done ? "var(--text)" : "var(--muted)", fontWeight: m.done ? 600 : 400 }}>{m.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
            {[
              { label: "Funding Goal", value: "₦20,000,000" },
              { label: "Return Offered", value: "20% p.a." },
              { label: "OSHEN Score", value: "82 / 100" },
              { label: "Est. Go Live", value: "7 days" },
            ].map(c => (
              <div key={c.label} style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 18px" }}>
                <div style={{ fontSize: 10, color: "var(--muted)", fontFamily: "DM Mono, monospace", marginBottom: 6 }}>{c.label.toUpperCase()}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "var(--accent)" }}>{c.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 60, minHeight: "100vh", background: "var(--bg)" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 28px" }}>
        <div className="section-label">List your business</div>
        <h1 className="serif" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-1px", marginBottom: 10, color: "var(--text)" }}>Apply for community funding</h1>
        <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7, marginBottom: 40 }}>Our team reviews every application within 5 working days. All businesses are audited before listing.</p>

        {/* Steps */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 36 }}>
          {["Business info", "Financials", "Review"].map((label, i) => {
            const n = i + 1;
            const active = step === n;
            const done = step > n;
            return (
              <div key={label} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: done || active ? "var(--accent)" : "var(--white)", border: done || active ? "none" : "1.5px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: done || active ? "white" : "var(--muted)", flexShrink: 0 }}>{done ? "✓" : n}</div>
                  <span style={{ fontSize: 12, fontWeight: active ? 700 : 400, color: active ? "var(--text)" : "var(--muted)", whiteSpace: "nowrap" }}>{label}</span>
                </div>
                {i < 2 && <div style={{ flex: 1, height: 1, background: done ? "var(--accent)" : "var(--border)", margin: "0 12px" }} />}
              </div>
            );
          })}
        </div>

        <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 20, padding: 32 }}>
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div><label style={lbl}>Business Name</label><input style={inp} placeholder="e.g. FarmDirect NG" value={form.bizName} onChange={e => setForm({ ...form, bizName: e.target.value })} /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label style={lbl}>Sector</label>
                  <select style={{ ...inp, cursor: "pointer" }} value={form.sector} onChange={e => setForm({ ...form, sector: e.target.value })}>
                    <option value="">Select sector</option>
                    {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div><label style={lbl}>Location</label><input style={inp} placeholder="e.g. Lagos State" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} /></div>
              </div>
              <div><label style={lbl}>Business Tagline</label><input style={inp} placeholder="One sentence — what do you do?" value={form.tagline} onChange={e => setForm({ ...form, tagline: e.target.value })} /></div>
              <div><label style={lbl}>Business Description</label><textarea style={{ ...inp, minHeight: 100, resize: "vertical" }} placeholder="Tell investors about your traction, team, and why you need funding..." value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} /></div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div><label style={lbl}>Funding Goal (₦)</label><input style={inp} placeholder="e.g. 10000000" type="number" value={form.goal} onChange={e => setForm({ ...form, goal: e.target.value })} /></div>
              <div>
                <label style={lbl}>Return Structure</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {["Revenue Share", "Fixed Return", "Equity"].map(t => (
                    <button key={t} onClick={() => setForm({ ...form, returnType: t })} style={{ flex: 1, padding: "10px 8px", borderRadius: 9, border: `1.5px solid ${form.returnType === t ? "var(--accent)" : "var(--border)"}`, background: form.returnType === t ? "var(--accent-pale)" : "var(--bg)", color: form.returnType === t ? "var(--accent)" : "var(--text-mid)", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "Cabinet Grotesk", transition: "all 0.15s" }}>{t}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label style={lbl}>Return Rate / Terms</label><input style={inp} placeholder="e.g. 20% per annum" value={form.returnRate} onChange={e => setForm({ ...form, returnRate: e.target.value })} /></div>
                <div><label style={lbl}>Duration</label><input style={inp} placeholder="e.g. 18 months" value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} /></div>
              </div>
              <div style={{ padding: 16, background: "var(--accent-pale)", border: "1px solid rgba(82,183,136,0.3)", borderRadius: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)", marginBottom: 8 }}>Documents required for verification</div>
                {["CAC registration certificate", "6 months bank statements", "Valid ID of all founders", "BVN of all directors"].map(d => (
                  <div key={d} style={{ fontSize: 12, color: "var(--text-mid)", marginBottom: 4 }}>✓ {d}</div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 20 }}>Review your application</div>
              {[
                { label: "Business Name", value: form.bizName || "—" },
                { label: "Sector", value: form.sector || "—" },
                { label: "Location", value: form.location || "—" },
                { label: "Funding Goal", value: form.goal ? `₦${Number(form.goal).toLocaleString()}` : "—" },
                { label: "Return Type", value: form.returnType },
                { label: "Return Rate", value: form.returnRate || "—" },
                { label: "Duration", value: form.duration || "—" },
              ].map(r => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "11px 0", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>{r.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{r.value}</span>
                </div>
              ))}
              <div style={{ padding: 16, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 12, marginTop: 20 }}>
                <div style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.7 }}>
                  Our team will review your application within <strong style={{ color: "var(--text)" }}>5 working days</strong> and contact you at your registered email address.
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            {step > 1 && <button className="btn-secondary" onClick={() => setStep(step - 1)} style={{ flex: 1 }}>← Back</button>}
            <button className="btn-primary" onClick={() => { if (step < 3) setStep(step + 1); else openAuth("builder"); }} style={{ flex: 2, padding: "13px" }}>
              {step < 3 ? "Continue →" : "Submit Application"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
