import type { Metadata } from "next";
import TopTeams from "./TopTeams";
import Matchups from "./Matchups";
import RecentResults from "./RecentResults";
import Bracket from "./Bracket";

export const metadata: Metadata = {
  title: "Brotherhood Pong League",
};

export default function Bpl() {
  return (
    <main className="text-white p-6">
      <div className="w-full mx-auto md:container space-y-4">
        <Bracket />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <TopTeams />
            <Matchups />
          </div>

          <div className="lg:h-0 lg:min-h-full">
            <RecentResults />
          </div>
        </div>
      </div>
    </main>
  );
}
