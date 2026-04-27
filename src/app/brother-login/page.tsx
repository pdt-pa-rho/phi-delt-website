"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BrotherLoginPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/brotherhood");
  }, [router]);

  return <div className="py-10 text-center">Redirecting...</div>;
}
