import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import SessionProviderWrapper from "@/app/SessionProviderWrapper";
import { geist, geistMono } from "./fonts";
import SWRConfigProvider from "@/components/SWRConfigProvider";

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
        <SessionProviderWrapper>
          <SWRConfigProvider>
            <NavBar />
            {children}
          </SWRConfigProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
