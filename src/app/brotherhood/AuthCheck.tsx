"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function AuthCheck({ bypass, children }: { children: React.ReactNode, bypass?: boolean }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (bypass) return;

    if (status === "unauthenticated") {
      signIn("google");
    }
  }, [status, bypass]);

  // Ignore all checks if bypass is true
  if (bypass) return <>{children}</>;

  if (status === "loading") {
    return <div className="text-center py-10">Loading authentication...</div>;
  }

  if (!session) {
    // Redirect handled by useEffect
    return null;
  }

  return <>{children}</>;
}
