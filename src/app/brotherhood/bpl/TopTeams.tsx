"use client";

import Link from "next/link";
import useSWR from "swr";
import LoadingSpinner from "@/components/LoadingSpinner";

export type Team = {
  id: string,
  name: string,
  strictName: string,
  abbreviation: string,
  rank: number,
  wins: number,
  losses: number,
  cupDiff: number
};

export default function TopTeams() {
  const {
    data: topTeams,
    isLoading,
    error,
  } = useSWR("/api/bpl/home/top-teams");

  return (
    <div className="glass-card p-6 rounded-lg animate-float">
      <h2 className="text-2xl font-semibold mb-4 gradient-text">Top Teams</h2>

      {isLoading && <LoadingSpinner />}

      {error && (
        <div className="text-center py-4 text-red-500">
          <p>There was an error loading the top teams.</p>
        </div>
      )}

      {topTeams && (
        <div className="space-y-4">
          {topTeams.map((team: Team) => (
            <Link
              key={team.id}
              href={{
                pathname: "/brotherhood/bpl/teams",
                query: { team: team.name },
              }}
              className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:text-white/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm text-amber-400">#{team.rank}</span>
                <span>{team.name}</span>
              </div>

              <div className="text-sm flex flex-col md:flex-row md:items-center">
                <div className="flex items-center">
                  <span className="text-green-400">{team.wins}</span>
                  <span className="text-gray-400 mx-1">-</span>
                  <span className="text-red-400">{team.losses}</span>
                </div>

                <div className="text-gray-400 md:ml-2">
                  {team.cupDiff > 0 ? "+" : ""}
                  {team.cupDiff}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
