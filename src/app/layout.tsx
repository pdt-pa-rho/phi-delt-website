import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import { geist, geistMono } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phi Delta Theta | Carnegie Mellon University",
  description: "Official website of the Pennsylvania Rho chapter of Phi Delta Theta at Carnegie Mellon University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
