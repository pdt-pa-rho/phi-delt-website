import type { Metadata } from "next";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Teams from "./Teams";

export const metadata: Metadata = {
  title: "BPL - Teams",
};

export default function TeamsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-20">
          <LoadingSpinner />
        </div>
      }
    >
      <Teams />
    </Suspense>
  );
}
