"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { useSession, signIn } from "next-auth/react";
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
    return (
      <div className="flex justify-center space-x-5 items-center h-screen text-center">
        <p>Authenticating...</p>
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  if (!session) {
    // Redirect handled by useEffect
    return null;
  }

  return <>{children}</>;
}
