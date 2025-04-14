"use client";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("google");
    }
  }, [status]);

  if (status === "loading") {
    return <div className="text-center py-10">Loading authentication...</div>;
  }

  if (!session) {
    // Redirect handled by useEffect
    return null;
  }

  return <>{children}</>;
}
