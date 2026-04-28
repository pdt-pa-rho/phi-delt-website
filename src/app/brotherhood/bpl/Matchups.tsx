"use client";

import Link from "next/link";
import useSWR from "swr";
import { Team } from "./TopTeams";

const Matchups = () => {
  const {
    data: featuredMatches,
    isLoading,
    error,
  } = useSWR("/api/bpl/home/featured-matches");

  return (
    <div className="glass-card p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Matchups</h2>

      {isLoading && <LoadingSpinner />}

      {error && (
        <div className="text-center py-4 text-red-500">
          <p>There was an error loading the featured matches.</p>
        </div>
      )}

      {featuredMatches && !isLoading && (
        <div className="space-y-4">
          {featuredMatches.map((match: {
            id: string,
            scheduled: boolean,
            time: string,
            date: string,
            team1: Team,
            team2: Team
          }) => (
            <div key={match.id} className="bg-secondary/50 p-4 rounded-lg">
              <div className="grid grid-cols-[1fr_min-content_1fr] items-center text-center gap-2">
                <Link
                  href={{
                    pathname: "/brotherhood/bpl/teams",
                    query: { team: match.team1.strictName },
                  }}
                  className="flex items-center justify-end gap-3 hover:text-white/80 transition-colors"
                >
                  <div className="h-10 w-10 rounded-full md:flex hidden items-center justify-center">
                    <span className="font-bold mr-1">
                      {match.team1.abbreviation}
                    </span>
                  </div>

                  <span className="w-full text-center">
                    {match.team1.name}
                  </span>
                </Link>

                <div className="min-w-fit px-2 whitespace-nowrap">
                  <span className="text-sm text-gray-400 block">VS</span>

                  {match.scheduled && (
                    <>
                      <div className="text-xs text-gray-500">{match.time}</div>
                      <div className="text-xs text-gray-500">{match.date}</div>
                    </>
                  )}
                </div>

                <Link
                  href={{
                    pathname: "/brotherhood/bpl/teams",
                    query: { team: match.team2.strictName },
                  }}
                  className="flex items-center justify-start gap-3 hover:text-white/80 transition-colors"
                >
                  <span className="w-full text-center">
                    {match.team2.name}
                  </span>

                  <div className="h-10 w-10 rounded-full md:flex hidden items-center justify-center">
                    <span className="font-bold ml-1">
                      {match.team2.abbreviation}
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function LoadingSpinner() {
  return (
    <div className="text-center py-8">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Matchups;
