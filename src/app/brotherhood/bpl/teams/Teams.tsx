"use client";

import { Users } from "lucide-react";
import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { useEffect, useRef } from "react";
import { nameEqual } from "@/helpers/bpl/names";

export default function Teams() {
  const searchParams = useSearchParams();
  const selectedTeam = searchParams.get("team");
  const selectedRef = useRef<HTMLDivElement | null>(null);

  const {
    data: teams,
    isLoading,
    error,
  } = useSWR("/api/bpl/teams");

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center", // or "start" if you prefer
      });
    }
  }, [teams, selectedTeam]);

  return (
    <main className="text-white p-6">
      <div className="w-full mx-auto md:container">
        <div className="glass-card p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-6">
            <Users className="text-pink-500 w-8 h-8" />
            <h1 className="text-3xl font-bold gradient-text">Teams</h1>
          </div>

          {isLoading && (
            <div className="text-center py-8">
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
              <p className="mt-2 text-gray-400">Loading teams data...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-red-500">
              <p>There was an error loading the teams data.</p>
              <p className="text-sm text-gray-400 mt-2">
                Please try again later.
              </p>
            </div>
          )}

          {teams && !isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {teams?.map((team: any) => {
                const isSelected =
                  selectedTeam && nameEqual(team.name, selectedTeam);

                return (
                  <div
                    key={team.id}
                    className={clsx(
                      "bg-secondary/30 p-4 rounded-lg hover:bg-secondary/100 transition-colors",
                      { "neon-border": isSelected },
                      { "bg-secondary/100": isSelected}
                    )}
                    ref={isSelected ? selectedRef : null}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={clsx(
                          "h-10 w-10 rounded-full flex items-center justify-center",
                          {
                            "bg-pink-500/20": team.rank > 10,
                            "bg-blue-500/20":
                              team.rank > 3 && team.rank <= 10,
                            "bg-amber-400/20":
                              team.rank > 1 && team.rank <= 3,
                            "bg-amber-400/50": team.rank === 1,
                          }
                        )}
                      >
                        <span className="font-bold">#{team.rank}</span>
                      </div>

                      <h3 className="font-semibold">{team.name}</h3>
                    </div>

                    <div className="space-y-2">
                      {team.players.map((player: string, index: number) => (
                        <div key={index} className="text-sm text-gray-300">
                          {player}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 text-sm">
                      <div className="flex justify-between text-gray-400">
                        <span>Record:</span>
                        <span>
                          {team.stats.wins}W - {team.stats.losses}L
                        </span>
                        <span>
                          {team.stats.cupDiff > 0 ? "+" : ""}
                          {team.stats.cupDiff}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
