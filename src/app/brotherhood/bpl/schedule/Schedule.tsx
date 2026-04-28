"use client";

import { Calendar } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch schedule");
  }

  return res.json();
};

export default function ScheduleClient() {
  const {
    data: weekData,
    isLoading,
    error,
  } = useSWR("/api/bpl/schedule", fetcher);

  return (
    <main className="flex flex-col text-white p-6">
      <div className="w-full mx-auto md:container flex-1 flex flex-col">
        <div className="glass-card p-6 rounded-lg flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="text-blue-500 w-8 h-8" />
            <h1 className="text-3xl font-bold gradient-text">Schedule</h1>
          </div>

          {isLoading && (
            <div className="text-center py-8">
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
              <p className="mt-2 text-gray-400">Loading schedule data...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-red-500">
              <p>There was an error loading the schedule data.</p>
              <p className="text-sm text-gray-400 mt-2">
                Please try again later.
              </p>
            </div>
          )}

          {weekData && !isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-7 gap-4 flex-1 overflow-y-auto">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {weekData.map((day: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-col md:flex-row lg:flex-col h-full"
                >
                  <div className="flex flex-col items-center md:items-start text-center md:text-center lg:text-center lg:items-center mb-2 md:mb-0 md:mr-4 min-w-[80px]">
                    <div className="text-sm w-full text-gray-400">
                      {day.day}
                    </div>
                    <div className="text-lg w-full font-semibold">
                      {day.dayNumber}
                    </div>
                  </div>

                  <div className="bg-secondary/30 rounded-lg p-3 space-y-4 flex-1">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {day.matches.map((match: any, matchIndex: number) => {
                      const location = match.location?.trim();
                      const isB2 = location?.toLowerCase() === "b2";
                      const is329 = location === "329";

                      return (
                        <div
                          key={matchIndex}
                          className={clsx("text-sm border rounded p-2", {
                            "border-pink-500/20 bg-pink-500/5": isB2,
                            "border-blue-500/20 bg-blue-500/5": is329,
                            "border-white/20 bg-white/5": !location,
                          })}
                        >
                          <div
                            className={clsx(
                              "font-semibold flex justify-between",
                              {
                                "text-pink-500": isB2,
                                "text-blue-500": is329,
                                "text-white": !location,
                              }
                            )}
                          >
                            <span>{match.time}</span>

                            {location && (
                              <span className="text-white/80">
                                {location.toUpperCase()}
                              </span>
                            )}
                          </div>

                          <div className="mt-1 text-center">
                            <Link
                              href={{
                                pathname: "/brotherhood/bpl/teams",
                                query: { team: match.teams[0] },
                              }}
                              className="hover:text-white/80 transition-colors"
                            >
                              {match.teams[0]}
                            </Link>

                            <div className="text-xs">vs</div>

                            <Link
                              href={{
                                pathname: "/brotherhood/bpl/teams",
                                query: { team: match.teams[1] },
                              }}
                              className="hover:text-white/80 transition-colors"
                            >
                              {match.teams[1]}
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
