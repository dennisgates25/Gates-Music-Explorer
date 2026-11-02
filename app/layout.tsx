import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "./components/Analytics";

export const metadata: Metadata = {
  title: "Gates Music Explorer",
  description: "Explore, learn, create, and perform on a joyful musical adventure.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<Analytics /></body></html>;
}
