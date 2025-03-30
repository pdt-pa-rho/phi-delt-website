import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

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
      <body className={`${inter.variable} antialiased`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
