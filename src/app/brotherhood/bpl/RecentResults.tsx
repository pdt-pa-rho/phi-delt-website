"use client";

import Link from "next/link";
import useSWR from "swr";
import { Team } from "./TopTeams";
import LoadingSpinner from "@/components/LoadingSpinner";

const RecentResults = () => {
  const {
    data: recentResults,
    isLoading,
    error,
  } = useSWR("/api/bpl/home/recent-results");

  return (
    <div className="glass-card p-6 rounded-lg lg:h-full lg:min-h-0 lg:flex lg:flex-col lg:overflow-hidden">      <h2 className="text-2xl font-semibold mb-4">Recent Results</h2>

      {isLoading && <LoadingSpinner />}

      {error && (
        <div className="text-center py-4 text-red-500">
          <p>There was an error loading the recent results.</p>
        </div>
      )}

      {recentResults && !isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 lg:flex-1 lg:min-h-0 lg:overflow-y-auto pr-1">          {recentResults.map((result: {
            id: string,
            score: string,
            cupDiff: number
            team1: Team & { result: "W" | "L" },
            team2: Team & { result: "W" | "L" }
          }) => (
            <div
              key={result.id}
              className="bg-secondary/50 p-4 rounded-lg hover:bg-secondary/100 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Score</span>

                <span className="flex items-center">
                  <span className="text-sm text-primary">{result.score}</span>
                  <span className="text-sm text-gray-400 ml-2">
                    {result.cupDiff}
                  </span>
                </span>
              </div>

              <div className="space-y-2">
                <Link
                  href={{
                    pathname: "/brotherhood/bpl/teams",
                    query: { team: result.team1.name },
                  }}
                  className="flex justify-between items-center hover:text-white/80 transition-colors"
                >
                  <span>{result.team1.name}</span>

                  <span
                    className={`font-bold ${result.team1.result === "W"
                        ? "text-green-400"
                        : "text-red-400"
                      }`}
                  >
                    {result.team1.result}
                  </span>
                </Link>

                <Link
                  href={{
                    pathname: "/brotherhood/bpl/teams",
                    query: { team: result.team2.name },
                  }}
                  className="flex justify-between items-center hover:text-white/80 transition-colors"
                >
                  <span>{result.team2.name}</span>

                  <span
                    className={`font-bold ${result.team2.result === "W"
                        ? "text-green-400"
                        : "text-red-400"
                      }`}
                  >
                    {result.team2.result}
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentResults;
