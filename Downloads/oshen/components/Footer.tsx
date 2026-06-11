"use client";
import { View } from "@/app/page";

interface Props { setView: (v: View) => void; }

export default function Footer({ setView }: Props) {
  return (
    <footer style={{ background: "var(--accent)", color: "white", padding: "64px 28px 40px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        {/* CTA banner */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "36px 40px", background: "rgba(255,255,255,0.07)", borderRadius: 18, border: "1px solid rgba(255,255,255,0.1)", marginBottom: 56, flexWrap: "wrap", gap: 20 }}>
          <div>
            <h3 className="serif" style={{ fontSize: 26, fontWeight: 400, marginBottom: 6, letterSpacing: "-0.5px" }}>Ready to start investing?</h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>Join 847 Nigerians already earning real returns from African businesses.</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setView("invest")} style={{ background: "white", border: "none", color: "var(--accent)", padding: "12px 24px", borderRadius: 9, cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: "Cabinet Grotesk" }}>
              Browse opportunities →
            </button>
            <button onClick={() => setView("build")} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.3)", color: "white", padding: "12px 22px", borderRadius: 9, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "Cabinet Grotesk" }}>
              List a business
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 48, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 16 }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "white", fontWeight: 900, fontSize: 13 }}>Ø</span>
              </div>
              <span style={{ fontSize: 16, fontWeight: 800 }}>OSHEN</span>
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 260 }}>
              Africa's community investment platform. Where everyday Nigerians fund verified African businesses and earn real returns.
            </p>
            <div style={{ fontSize: 10, fontFamily: "DM Mono, monospace", color: "rgba(255,255,255,0.35)", marginTop: 16, letterSpacing: 1 }}>
              A REALM TECHNOLOGY PRODUCT
            </div>
          </div>

          {[
            { title: "Platform", links: [{ l: "Invest", v: "invest" }, { l: "List Business", v: "build" }, { l: "How It Works", v: "home" }] },
            { title: "Company", links: [{ l: "About OSHEN", v: "home" }, { l: "Realm Technology", v: "home" }] },
            { title: "Legal", links: [{ l: "Terms of Service", v: "home" }, { l: "Privacy Policy", v: "home" }, { l: "SEC Compliance", v: "home" }] },
          ].map(col => (
            <div key={col.title}>
              <div style={{ fontSize: 10, fontFamily: "DM Mono, monospace", color: "rgba(255,255,255,0.4)", letterSpacing: 1.5, marginBottom: 16 }}>{col.title.toUpperCase()}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map(link => (
                  <button key={link.l} onClick={() => setView(link.v as View)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.65)", fontSize: 13, cursor: "pointer", textAlign: "left", fontFamily: "Cabinet Grotesk", padding: 0, transition: "color 0.15s" }}
                    onMouseOver={e => { (e.target as HTMLButtonElement).style.color = "white"; }}
                    onMouseOut={e => { (e.target as HTMLButtonElement).style.color = "rgba(255,255,255,0.65)"; }}
                  >{link.l}</button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "DM Mono, monospace" }}>© 2025 OSHEN by Realm Technology Ltd.</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "DM Mono, monospace" }}>SEC Registered · CAC Regulated · BVN Verified</div>
        </div>
      </div>
    </footer>
  );
}
