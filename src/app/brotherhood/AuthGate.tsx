"use client";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  // Temporarily bypass auth checks for easier editing.
  return <>{children}</>;
}
