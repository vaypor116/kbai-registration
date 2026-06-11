import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OSHEN — Africa's Community Investment Platform",
  description: "Where everyday Nigerians fund verified African businesses and earn real returns.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="grain" />
        {children}
      </body>
    </html>
  );
}
