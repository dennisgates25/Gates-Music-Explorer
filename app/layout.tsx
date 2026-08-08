import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gates Music Explorer",
  description: "Explore, learn, create, and perform on a joyful musical adventure.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
