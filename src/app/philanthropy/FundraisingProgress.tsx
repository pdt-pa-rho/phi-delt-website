"use client";

import useSWR from "swr";

export default function FundraisingProgress() {
  const { data } = useSWR('/api/philanthropy');

  const raised = data?.raised || 0;
  const goal = data?.goal || 1;
  const pct = Math.min(Math.round((raised / goal) * 100), 100);

  return (
    <div className="relative flex-1">
      {/* track (thicker) */}
      <div className="w-full bg-(--white) bg-opacity-20 rounded-full h-12" />

      {/* fill + raised text */}
      <div
        className="absolute top-0 left-0 bg-(--blue) h-12 rounded-full flex items-center px-4"
        style={{ width: `${pct}%` }}
      >
        {raised > 0 && (
          <span className="text-xl md:text-2xl font-semibold drop-shadow-md text-(--white)">
            ${raised.toLocaleString()}
          </span>
        )}
      </div>

      {/* goal text at right inside bar */}
      <div className="absolute top-0 right-0 h-12 flex items-center pr-4 pointer-events-none">
        <span className="text-xl md:text-2xl font-semibold drop-shadow-md text-(--blue)">
          Goal: ${goal.toLocaleString()}
        </span>
      </div>
    </div>
  );
}
