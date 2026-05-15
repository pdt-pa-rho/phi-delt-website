import type { Metadata } from "next";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import Schedule from "./Schedule";

export const metadata: Metadata = {
  title: "BPL - Schedule",
};

export default function SchedulePage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-20">
          <LoadingSpinner />
        </div>
      }
    >
      <Schedule />
    </Suspense>
  );
}
