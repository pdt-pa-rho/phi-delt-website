"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      // Redirect to classes after login
      router.replace("/classes");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="py-10 text-center">Loading...</div>;
  }

  if (status === "authenticated") {
    return null; // Redirect handled above
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--navy)]">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold mb-6 text-[#0D1433]">Sign in to access Classes</h1>
        <button
          onClick={() => signIn("google")}
          className="w-full py-2 px-4 bg-[#619CC7] text-white rounded-md font-medium hover:bg-[#4A85B0] transition-colors"
        >
          Sign in with Google
        </button>
      </div>
    </main>
  );
}
