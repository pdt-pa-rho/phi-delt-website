"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import SvgTiltBackground from "@/components/SVGTiltBackground";

const errorMessages: Record<string, string> = {
  AccessDenied: "You do not have access to the brotherhood portal. If are an alumnus or believe this is a mistake, contact our current Alumni Relations Chair or Membership Development Chair.",
  OAuthSignin: "There was a problem starting Google sign-in.",
  OAuthCallback: "There was a problem completing Google sign-in.",
  Configuration: "Authentication is not configured correctly.",
};

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const error = searchParams.get("error");
  const errorText = error
    ? errorMessages[error] ?? "Sign in failed. Please try again."
    : null;

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/brotherhood");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex justify-center space-x-5 items-center h-screen text-center">
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  if (status === "authenticated") return null;

  return (
    <SvgTiltBackground
      svgUrl="/svg/PDT_Swords.svg"
      className="min-h-screen bg-gradient-to-b from-[#0D1433] via-[#14244E] to-[#0D1433]"
      svgClassName="text-[var(--light-blue)]/15 drop-shadow-md drop-shadow-black"
      fullPage
      fadeIn={false}
    >
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="glass-card rounded-2xl p-6 !bg-black/10 max-w-md w-full text-center">
          <h1 className="text-5xl font-bold mb-4 text-foreground">Sign in</h1>

          {errorText && (
            <p className="text-md text-[var(--red)] drop-shadow-sm mb-6">{errorText}</p>
          )}

          <button
            onClick={() => signIn("google", { callbackUrl: "/brotherhood" })}
            className="w-full py-2 px-4 bg-[#619CC7] text-white rounded-md font-medium hover:bg-[#4A85B0] transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </main>
    </SvgTiltBackground>
  );
}
