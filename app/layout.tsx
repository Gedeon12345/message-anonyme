import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "Message Anonyme",
  description: "Reçois des messages anonymes de tes amis.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={jakarta.variable}>
      <body
        className="min-h-dvh bg-background text-foreground antialiased"
        style={{ fontFamily: "var(--font-jakarta), system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
