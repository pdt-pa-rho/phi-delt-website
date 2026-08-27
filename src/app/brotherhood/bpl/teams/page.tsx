import type { Metadata } from "next";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Teams from "./Teams";

export const metadata: Metadata = {
  title: "BPL - Teams",
};

export default function TeamsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Teams />
    </Suspense>
  );
}
