"use client";
import { View } from "@/app/page";

interface NavbarProps {
  view: View;
  setView: (v: View) => void;
  openAuth: (mode: "investor" | "builder") => void;
}

export default function Navbar({ view, setView, openAuth }: NavbarProps) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: "rgba(247,245,240,0.92)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--border)",
    }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 28px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <button onClick={() => setView("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "white", fontWeight: 900, fontSize: 15, fontFamily: "Cabinet Grotesk" }}>Ø</span>
          </div>
          <span style={{ fontSize: 17, fontWeight: 800, color: "var(--text)", letterSpacing: "-0.4px" }}>OSHEN</span>
        </button>

        {/* Center nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {[
            { label: "How it works", v: "home" as View },
            { label: "Invest", v: "invest" as View },
            { label: "List a Business", v: "build" as View },
          ].map(({ label, v }) => (
            <button key={v} onClick={() => setView(v)} style={{
              background: "none",
              border: "none",
              color: view === v ? "var(--accent)" : "var(--text-mid)",
              padding: "6px 14px", borderRadius: 7, cursor: "pointer",
              fontSize: 13, fontWeight: view === v ? 700 : 500,
              fontFamily: "Cabinet Grotesk",
              transition: "all 0.15s",
            }}
              onMouseOver={e => { (e.target as HTMLButtonElement).style.color = "var(--accent)"; (e.target as HTMLButtonElement).style.background = "rgba(27,67,50,0.05)"; }}
              onMouseOut={e => { (e.target as HTMLButtonElement).style.color = view === v ? "var(--accent)" : "var(--text-mid)"; (e.target as HTMLButtonElement).style.background = "none"; }}
            >{label}</button>
          ))}
        </div>

        {/* Right */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => openAuth("investor")} style={{
            background: "none", border: "none", color: "var(--text-mid)",
            padding: "7px 14px", borderRadius: 7, cursor: "pointer",
            fontSize: 13, fontWeight: 500, fontFamily: "Cabinet Grotesk",
            transition: "color 0.15s",
          }}
            onMouseOver={e => { (e.target as HTMLButtonElement).style.color = "var(--accent)"; }}
            onMouseOut={e => { (e.target as HTMLButtonElement).style.color = "var(--text-mid)"; }}
          >Sign in</button>
          <button className="btn-primary" onClick={() => openAuth("investor")} style={{ padding: "8px 18px", fontSize: 13 }}>
            Get started
          </button>
        </div>
      </div>
    </nav>
  );
}
