"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import HowItWorks from "@/components/HowItWorks";
import Listings from "@/components/Listings";
import InvestorDashboard from "@/components/InvestorDashboard";
import BuilderDashboard from "@/components/BuilderDashboard";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import ListingModal from "@/components/ListingModal";

export type View = "home" | "invest" | "build" | "dashboard-investor" | "dashboard-builder";

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"investor" | "builder">("investor");
  const [selectedListing, setSelectedListing] = useState<string | null>(null);

  const openAuth = (mode: "investor" | "builder") => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar
        view={view}
        setView={setView}
        openAuth={openAuth}
      />

      {view === "home" && (
        <>
          <Hero setView={setView} openAuth={openAuth} />
          <Stats />
          <HowItWorks />
          <Listings
            setView={setView}
            openAuth={openAuth}
            setSelectedListing={setSelectedListing}
          />
        </>
      )}

      {view === "invest" && (
        <Listings
          setView={setView}
          openAuth={openAuth}
          setSelectedListing={setSelectedListing}
          fullPage
        />
      )}

      {view === "build" && (
        <BuilderDashboard openAuth={openAuth} />
      )}

      {view === "dashboard-investor" && <InvestorDashboard setView={setView} />}
      {view === "dashboard-builder" && <BuilderDashboard openAuth={openAuth} isDashboard />}

      {view === "home" && <Footer setView={setView} />}

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        mode={authMode}
        setView={setView}
      />

      {selectedListing && (
        <ListingModal
          id={selectedListing}
          onClose={() => setSelectedListing(null)}
          openAuth={openAuth}
        />
      )}
    </main>
  );
}
