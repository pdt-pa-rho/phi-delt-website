"use client";

import AuthCheck from "./AuthCheck";

// All pages within brotherhoood are auth gated

export default function BrotherhoodLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // For debugging, just add the `bypass` flag to disable the auth check
  return (
      <AuthCheck>
        {children}
      </AuthCheck>
  );
}
