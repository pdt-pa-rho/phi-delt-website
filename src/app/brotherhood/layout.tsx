"use client";

import AuthCheck from "./AuthCheck";
import { SWRConfig } from "swr";

// All pages within brotherhoood are auth gated

export default function BrotherhoodLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      {/* For debugging, just add the `bypass` flag to disable the auth check */}
      <AuthCheck>{children}</AuthCheck>
    </SWRConfig>
  );
}
