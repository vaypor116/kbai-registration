"use client";
import { useState } from "react";
import { View } from "@/app/page";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  mode: "investor" | "builder";
  setView: (v: View) => void;
}

export default function AuthModal({ open, onClose, mode, setView }: AuthModalProps) {
  const [tab, setTab] = useState<"signup" | "signin">("signup");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", bvn: "", password: "" });

  if (!open) return null;

  const handleSubmit = () => {
    if (step === 1) { setStep(2); return; }
    onClose();
    setView(mode === "investor" ? "dashboard-investor" : "dashboard-builder");
    setStep(1);
  };

  const inp: React.CSSProperties = {
    width: "100%", background: "var(--bg)", border: "1.5px solid var(--border)",
    borderRadius: 9, padding: "11px 14px", color: "var(--text)",
    fontSize: 14, fontFamily: "Cabinet Grotesk", outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(13,31,23,0.5)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
      onClick={onClose}>
      <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 24, padding: "40px 36px", width: "100%", maxWidth: 420, position: "relative", boxShadow: "0 24px 60px rgba(0,0,0,0.15)" }}
        onClick={e => e.stopPropagation()}>

        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(0,0,0,0.05)", border: "none", width: 28, height: 28, borderRadius: "50%", cursor: "pointer", fontSize: 14, color: "var(--text-mid)", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontWeight: 900, fontSize: 13 }}>Ø</span>
          </div>
          <span style={{ fontSize: 15, fontWeight: 800, color: "var(--text)" }}>OSHEN</span>
          <span className="tag tag-green" style={{ marginLeft: 4 }}>{mode === "investor" ? "INVESTOR" : "BUILDER"}</span>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--text)", marginBottom: 6, letterSpacing: "-0.5px" }}>
          {tab === "signup" ? "Create your account" : "Welcome back"}
        </h2>
        <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 24 }}>
          {tab === "signup" ? "Join thousands of Nigerians investing in Africa's future." : "Sign in to your OSHEN account."}
        </p>

        {/* Tabs */}
        <div style={{ display: "flex", background: "var(--bg)", borderRadius: 10, padding: 4, marginBottom: 24, border: "1px solid var(--border)" }}>
          {(["signup", "signin"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "8px", borderRadius: 7, border: "none", cursor: "pointer",
              background: tab === t ? "var(--white)" : "none",
              color: tab === t ? "var(--text)" : "var(--muted)",
              fontSize: 13, fontWeight: tab === t ? 700 : 500,
              fontFamily: "Cabinet Grotesk",
              boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              transition: "all 0.2s",
            }}>{t === "signup" ? "Create account" : "Sign in"}</button>
          ))}
        </div>

        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {tab === "signup" && <input placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inp} onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "var(--accent)"; }} onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "var(--border)"; }} />}
            <input placeholder="Email address" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inp} onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "var(--accent)"; }} onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "var(--border)"; }} />
            {tab === "signup" && <input placeholder="Phone number" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inp} onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "var(--accent)"; }} onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "var(--border)"; }} />}
            <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} style={inp} onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "var(--accent)"; }} onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "var(--border)"; }} />
          </div>
        )}

        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ padding: 16, background: "var(--accent-pale)", border: "1px solid rgba(82,183,136,0.3)", borderRadius: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)", marginBottom: 4 }}>Identity Verification Required</div>
              <div style={{ fontSize: 12, color: "var(--text-mid)", lineHeight: 1.6 }}>We use your BVN to verify your identity. Required by CBN regulations to protect all platform users.</div>
            </div>
            <input placeholder="Bank Verification Number (BVN)" value={form.bvn} onChange={e => setForm({ ...form, bvn: e.target.value })} style={inp} maxLength={11}
              onFocus={e => { (e.target as HTMLInputElement).style.borderColor = "var(--accent)"; }}
              onBlur={e => { (e.target as HTMLInputElement).style.borderColor = "var(--border)"; }} />
            <div style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", fontFamily: "DM Mono, monospace" }}>🔒 Encrypted · Never stored in plain text</div>
          </div>
        )}

        <button className="btn-primary" onClick={handleSubmit} style={{ width: "100%", padding: "13px", fontSize: 14, marginTop: 20 }}>
          {step === 1 ? "Continue →" : tab === "signup" ? "Create account" : "Sign in"}
        </button>

        <div style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", marginTop: 16, lineHeight: 1.7 }}>
          By continuing you agree to OSHEN's <span style={{ color: "var(--accent)", cursor: "pointer" }}>Terms of Service</span> and <span style={{ color: "var(--accent)", cursor: "pointer" }}>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
}
