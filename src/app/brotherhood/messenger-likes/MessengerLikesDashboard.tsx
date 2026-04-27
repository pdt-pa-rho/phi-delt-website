"use client";

import { useEffect, useMemo, useState } from "react";

export type WrappedRow = {
  semester: string;
  rank: number;
  author: string;
  likes: number;
  messages: number;
  likesPerMessage: number;
};

type RankingMetric = {
  id: string;
  label: string;
  emoji: string;
  description: string;
  minMessages: number;
  formatter: (value: number) => string;
  score: (row: WrappedRow) => number;
};

const rankingMetrics: RankingMetric[] = [
  {
    id: "total-likes",
    label: "Total Likes",
    emoji: "👍",
    description: "Pure like volume leaders.",
    minMessages: 0,
    formatter: (value) => value.toLocaleString(),
    score: (row) => row.likes,
  },
  {
    id: "likes-per-message",
    label: "Likes per Message",
    emoji: "⚡",
    description: "Efficiency ranking for high-message posters.",
    minMessages: 101,
    formatter: (value) => value.toFixed(3),
    score: (row) => row.likesPerMessage,
  },
  {
    id: "message-volume",
    label: "Message Volume",
    emoji: "💬",
    description: "Most active brothers by message count.",
    minMessages: 0,
    formatter: (value) => value.toLocaleString(),
    score: (row) => row.messages,
  },
  {
    id: "quality-score",
    label: "Quality Score",
    emoji: "🎯",
    description: "Balanced impact (likes/message * sqrt(messages)).",
    minMessages: 101,
    formatter: (value) => value.toFixed(2),
    score: (row) => row.likesPerMessage * Math.sqrt(row.messages),
  },
  {
    id: "hype-index",
    label: "Hype Index",
    emoji: "🔥",
    description: "Custom momentum blend of likes and efficiency.",
    minMessages: 0,
    formatter: (value) => value.toFixed(1),
    score: (row) => row.likes * 0.65 + row.likesPerMessage * 55,
  },
];

const wrappedBackgroundImages = [
  "/WrappedBackgrounds/rafiphoto.jpg",
  "/WrappedBackgrounds/bow.jpg",
  "/WrappedBackgrounds/type.jpg",
  "/WrappedBackgrounds/rob.jpg",
  "/WrappedBackgrounds/declan.jpg",
  "/WrappedBackgrounds/wadeweasley.jpg",
];

export default function MessengerLikesDashboard({ wrappedData }: { wrappedData: WrappedRow[] }) {
  const [selectedMetricId, setSelectedMetricId] = useState(rankingMetrics[0].id);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [backgroundImage, setBackgroundImage] = useState(wrappedBackgroundImages[0]);
  const selectedMetric = rankingMetrics.find((metric) => metric.id === selectedMetricId) ?? rankingMetrics[0];

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("wrapped-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
    const randomIndex = Math.floor(Math.random() * wrappedBackgroundImages.length);
    setBackgroundImage(wrappedBackgroundImages[randomIndex]);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem("wrapped-theme", nextTheme);
  };

  const rankedRows = useMemo(() => {
    return wrappedData
      .filter((row) => row.messages >= selectedMetric.minMessages)
      .map((row) => ({
        ...row,
        score: selectedMetric.score(row),
      }))
      .sort((a, b) => b.score - a.score);
  }, [selectedMetric, wrappedData]);

  const totalLikes = wrappedData.reduce((sum, row) => sum + row.likes, 0);
  const totalMessages = wrappedData.reduce((sum, row) => sum + row.messages, 0);
  const averageLikesPerMessage = totalMessages > 0 ? totalLikes / totalMessages : 0;
  const topThree = rankedRows.slice(0, 3);
  const tableRows = rankedRows.slice(0, 30);
  const topLikedPodium = [...wrappedData].sort((a, b) => b.likes - a.likes).slice(0, 3);
  const isDark = theme === "dark";
  const totalLikesWinner = wrappedData.reduce<WrappedRow | null>(
    (best, row) => (!best || row.likes > best.likes ? row : best),
    null,
  );
  const volumeWinner = wrappedData.reduce<WrappedRow | null>(
    (best, row) => (!best || row.messages > best.messages ? row : best),
    null,
  );
  const efficiencyWinner = wrappedData
    .filter((row) => row.messages >= 101)
    .reduce<WrappedRow | null>((best, row) => (!best || row.likesPerMessage > best.likesPerMessage ? row : best), null);
  const consistencyWinner = wrappedData
    .filter((row) => row.messages >= 101)
    .reduce<WrappedRow | null>(
      (best, row) =>
        !best || row.likesPerMessage * Math.sqrt(row.messages) > best.likesPerMessage * Math.sqrt(best.messages)
          ? row
          : best,
      null,
    );
  const shameCornerWinner = wrappedData
    .filter((row) => row.messages >= 101)
    .reduce<WrappedRow | null>((worst, row) => (!worst || row.likesPerMessage < worst.likesPerMessage ? row : worst), null);

  const semesterAwards = [
    {
      title: "The Crowd Favorite 👑",
      description: "Most total likes received this semester.",
      winner: totalLikesWinner,
      value: totalLikesWinner ? `${totalLikesWinner.likes.toLocaleString()} likes` : "N/A",
      cardClass: isDark ? "from-[#2A1A4A]/82 to-[#4F2F8A]/82 border-[#7652BA]" : "from-[#F3E8FF]/86 to-[#E9D5FF]/86 border-[#D8B4FE]",
    },
    {
      title: "The Megaphone 📣",
      description: "Most total messages sent in chat.",
      winner: volumeWinner,
      value: volumeWinner ? `${volumeWinner.messages.toLocaleString()} messages` : "N/A",
      cardClass: isDark ? "from-[#1A2A52]/82 to-[#2E5EA8]/82 border-[#4F87D8]" : "from-[#DBEAFE]/86 to-[#BFDBFE]/86 border-[#93C5FD]",
    },
    {
      title: "The All-Rounder 🎯",
      description: "Elite balance of volume and efficiency (quality score).",
      winner: consistencyWinner,
      value: consistencyWinner
        ? `${(consistencyWinner.likesPerMessage * Math.sqrt(consistencyWinner.messages)).toFixed(2)} quality score`
        : "N/A",
      cardClass: isDark ? "from-[#3D2316]/82 to-[#7A3E1D]/82 border-[#B66A3C]" : "from-[#FFEDD5]/86 to-[#FED7AA]/86 border-[#FDBA74]",
    },
    {
      title: "The Goon Corner 🫣",
      description: "Lowest likes-per-message among brothers with 100+ messages.",
      winner: shameCornerWinner,
      value: shameCornerWinner ? `${shameCornerWinner.likesPerMessage.toFixed(3)} likes/message` : "N/A",
      cardClass: isDark ? "from-[#4A171C]/82 to-[#8B2835]/82 border-[#CC4A5A]" : "from-[#FEE2E2]/86 to-[#FECACA]/86 border-[#FCA5A5]",
    },
  ];

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-fixed px-4 pb-16 pt-28"
      style={{
        backgroundImage: `${
          isDark
            ? "linear-gradient(to bottom, rgba(12,18,40,0.44), rgba(15,24,52,0.4), rgba(18,29,66,0.46))"
            : "linear-gradient(to bottom, rgba(244,248,252,0.38), rgba(248,251,254,0.34), rgba(255,255,255,0.42))"
        }, url(${backgroundImage})`,
      }}
    >
      <section className="mx-auto max-w-6xl">
        <div
          className={`relative overflow-hidden rounded-2xl p-5 shadow-2xl ${
            isDark ? "border border-[#3B5883] bg-[#101A3E]/82 text-white" : "border border-[#BFD8EB] bg-[#0D1433]/82 text-white"
          }`}
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#619CC7]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-10 h-72 w-72 rounded-full bg-[#2E4E84]/30 blur-3xl" />
          <p className="text-sm uppercase tracking-[0.2em] text-[#8BC0E6]">Spring 2026 • Messenger Recap</p>
          <h1 className="mt-3 text-3xl font-bold md:text-5xl">Brotherhood Wrapped: Messenger Likes ❤️</h1>
          <p className="mt-4 max-w-3xl text-[#DBECF3]">
            Pick a ranking mode to instantly recompute the leaderboard. Likes/message and quality metrics require more
            than 100 messages for fair comparison.
          </p>
          <button
            type="button"
            onClick={toggleTheme}
            className="mt-5 rounded-lg border border-[#8BC0E6]/60 bg-[#0D1433]/35 px-4 py-2 text-sm font-semibold text-[#DBECF3] transition hover:bg-[#4A85B0]/35"
          >
            {isDark ? "Switch to Light Mode ☀️" : "Switch to Dark Mode 🌙"}
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className={`rounded-2xl p-5 shadow-sm ${isDark ? "border border-[#304A72] bg-[#122048]/82" : "border border-[#DBECF3] bg-white/84"}`}>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#4A85B0]">Brothers Tracked 👥</p>
            <p className={`mt-2 text-3xl font-bold ${isDark ? "text-[#F1F5F9]" : "text-[#0D1433]"}`}>{wrappedData.length}</p>
          </div>
          <div className={`rounded-2xl p-5 shadow-sm ${isDark ? "border border-[#304A72] bg-[#122048]/82" : "border border-[#DBECF3] bg-white/84"}`}>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#4A85B0]">Total Likes 👍</p>
            <p className={`mt-2 text-3xl font-bold ${isDark ? "text-[#F1F5F9]" : "text-[#0D1433]"}`}>{totalLikes.toLocaleString()}</p>
          </div>
          <div className={`rounded-2xl p-5 shadow-sm ${isDark ? "border border-[#304A72] bg-[#122048]/82" : "border border-[#DBECF3] bg-white/84"}`}>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#4A85B0]">Total Messages 💬</p>
            <p className={`mt-2 text-3xl font-bold ${isDark ? "text-[#F1F5F9]" : "text-[#0D1433]"}`}>{totalMessages.toLocaleString()}</p>
          </div>
          <div className={`rounded-2xl p-5 shadow-sm ${isDark ? "border border-[#304A72] bg-[#122048]/82" : "border border-[#DBECF3] bg-white/84"}`}>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#4A85B0]">Avg Likes/Message 📊</p>
            <p className={`mt-2 text-3xl font-bold ${isDark ? "text-[#F1F5F9]" : "text-[#0D1433]"}`}>{averageLikesPerMessage.toFixed(3)}</p>
          </div>
        </div>

        <section
          className={`fire-border-glow mt-6 rounded-2xl p-5 shadow-sm ${
            isDark ? "border border-[#8B2A21] bg-gradient-to-br from-[#3C0F10]/82 to-[#5E1718]/82" : "border border-[#F07A62] bg-gradient-to-br from-[#FFE2DB]/86 to-[#FFC5B3]/86"
          }`}
        >
          <p className={`text-xs font-semibold uppercase tracking-wide ${isDark ? "text-[#FFC2B6]" : "text-[#9B2F1D]"}`}>Top 3 most liked this semester</p>
          <h2 className={`mt-2 text-2xl font-bold ${isDark ? "text-[#FFE4DA]" : "text-[#7A1F14]"}`}>
            The Most Heated 🏆
          </h2>
          <p className={`mt-2 text-sm ${isDark ? "text-[#FFD1C7]/85" : "text-[#8C2E1E]/85"}`}>
            The all-time heat check: straight likes leaderboard, no extra formulas.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {topLikedPodium.map((row, index) => (
              <article
                key={`goat-${row.author}`}
                className={`rounded-xl border p-4 shadow-sm ${
                  index === 0
                    ? isDark
                      ? "border-[#D8B14C] bg-[#4A350B]/70"
                      : "border-[#E5C26D] bg-[#FFF7D6]/80"
                    : index === 1
                      ? isDark
                        ? "border-[#C7CEDA] bg-[#2B3444]/70"
                        : "border-[#D0D7E3] bg-[#F4F7FB]/80"
                      : isDark
                        ? "border-[#B07A52] bg-[#3C2414]/70"
                        : "border-[#D8A47A] bg-[#FCECDD]/80"
                }`}
              >
                <p
                  className={`text-xs font-semibold uppercase tracking-wide ${
                    index === 0
                      ? isDark
                        ? "text-[#F8E5A8]"
                        : "text-[#8E6810]"
                      : index === 1
                        ? isDark
                          ? "text-[#E7ECF5]"
                          : "text-[#5D6778]"
                        : isDark
                          ? "text-[#E9C6A4]"
                          : "text-[#8A5A2E]"
                  }`}
                >
                  {index === 0 ? "1st Place 🥇" : index === 1 ? "2nd Place 🥈" : "3rd Place 🥉"}
                </p>
                <p
                  className={`mt-2 text-xl font-bold ${
                    index === 0
                      ? isDark
                        ? "text-[#FFF4CF]"
                        : "text-[#6E4E02]"
                      : index === 1
                        ? isDark
                          ? "text-[#F3F6FC]"
                          : "text-[#3F4B60]"
                        : isDark
                          ? "text-[#F5D8BE]"
                          : "text-[#6F4121]"
                  }`}
                >
                  {row.author}
                </p>
                <p
                  className={`mt-1 text-sm font-medium ${
                    index === 0
                      ? isDark
                        ? "text-[#FDEFC4]/90"
                        : "text-[#7A5B0B]"
                      : index === 1
                        ? isDark
                          ? "text-[#DFE6F3]/90"
                          : "text-[#5D6778]"
                        : isDark
                          ? "text-[#E9C6A4]/90"
                          : "text-[#8A5A2E]"
                  }`}
                >
                  {row.likes.toLocaleString()} likes • {row.messages.toLocaleString()} messages
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className={`mt-8 rounded-2xl p-5 shadow-sm ${isDark ? "border border-[#304A72] bg-[#122048]/82" : "border border-[#CFE3F2] bg-white/84"}`}>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#4A85B0]">Choose Ranking Mode</p>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {rankingMetrics.map((metric) => {
              const isActive = metric.id === selectedMetric.id;
              return (
                <button
                  key={metric.id}
                  type="button"
                  onClick={() => setSelectedMetricId(metric.id)}
                  className={`rounded-xl border p-4 text-left transition-all ${
                    isActive
                      ? isDark
                        ? "border-[#619CC7] bg-[#1A2C57]/82 shadow-[0_0_0_2px_rgba(97,156,199,0.25)]"
                        : "border-[#619CC7] bg-[#EAF4FB]/84 shadow-[0_0_0_2px_rgba(97,156,199,0.25)]"
                      : isDark
                        ? "border-[#35547F] bg-[#101D42]/82 hover:border-[#619CC7] hover:bg-[#162755]/85"
                        : "border-[#DBECF3] bg-white/84 hover:border-[#A7CAE3] hover:bg-[#F8FBFD]/90"
                  }`}
                >
                  <p className={`text-sm font-semibold ${isDark ? "text-[#F1F5F9]" : "text-[#0D1433]"}`}>
                    {metric.emoji} {metric.label}
                  </p>
                  <p className={`mt-1 text-xs ${isDark ? "text-[#DBECF3]/80" : "text-[#0D1433]/70"}`}>{metric.description}</p>
                  {metric.minMessages > 0 ? (
                    <p className="mt-2 text-xs font-medium text-[#4A85B0]">Requires 100+ messages</p>
                  ) : null}
                </button>
              );
            })}
          </div>
        </section>

        <p className={`mt-3 text-sm ${isDark ? "text-[#DBECF3]/80" : "text-[#0D1433]/70"}`}>
          Current ranking: <span className="font-semibold">{selectedMetric.label}</span> {selectedMetric.emoji} •{" "}
          {rankedRows.length} eligible brothers.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {topThree.map((row, index) => (
            <article
              key={`${row.author}-${index}`}
              className={`rounded-2xl p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1 ${
                isDark ? "border border-[#304A72] bg-[#122048]/82" : "border border-[#DBECF3] bg-white/84"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[#4A85B0]">
                Rank #{index + 1} {index === 0 ? "👑" : index === 1 ? "🥈" : "🥉"}
              </p>
              <h2 className={`mt-2 text-2xl font-bold ${isDark ? "text-[#F1F5F9]" : "text-[#0D1433]"}`}>{row.author}</h2>
              <p className={`mt-2 text-sm ${isDark ? "text-[#DBECF3]/80" : "text-[#0D1433]/75"}`}>
                {selectedMetric.label}: <span className="font-semibold">{selectedMetric.formatter(row.score)}</span>
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className={`rounded-lg p-3 ${isDark ? "bg-[#1A2C57]/82" : "bg-[#F4F9FD]/86"}`}>
                  <p className="text-[#4A85B0]">Likes</p>
                  <p className={`text-lg font-semibold ${isDark ? "text-[#F1F5F9]" : "text-[#0D1433]"}`}>{row.likes}</p>
                </div>
                <div className={`rounded-lg p-3 ${isDark ? "bg-[#1A2C57]/82" : "bg-[#F4F9FD]/86"}`}>
                  <p className="text-[#4A85B0]">Messages</p>
                  <p className={`text-lg font-semibold ${isDark ? "text-[#F1F5F9]" : "text-[#0D1433]"}`}>{row.messages}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={`mt-8 overflow-x-auto rounded-2xl shadow-sm ${isDark ? "border border-[#304A72] bg-[#122048]/82" : "border border-[#DBECF3] bg-white/84"}`}>
          <table className="min-w-full divide-y divide-[#DBECF3] text-left">
            <thead className={isDark ? "bg-[#1A2C57]/82" : "bg-[#F3F8FC]/86"}>
              <tr>
                <th className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide ${isDark ? "text-[#DBECF3]" : "text-[#0D1433]"}`}>Rank</th>
                <th className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide ${isDark ? "text-[#DBECF3]" : "text-[#0D1433]"}`}>Author</th>
                <th className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide ${isDark ? "text-[#DBECF3]" : "text-[#0D1433]"}`}>
                  {selectedMetric.label}
                </th>
                <th className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide ${isDark ? "text-[#DBECF3]" : "text-[#0D1433]"}`}>Likes</th>
                <th className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide ${isDark ? "text-[#DBECF3]" : "text-[#0D1433]"}`}>Messages</th>
                <th className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide ${isDark ? "text-[#DBECF3]" : "text-[#0D1433]"}`}>Likes/Message</th>
              </tr>
            </thead>
            <tbody className={`divide-y divide-[#DBECF3] ${isDark ? "bg-[#122048]/82" : "bg-white/84"}`}>
              {tableRows.map((row, index) => (
                <tr key={`${row.author}-${index}`} className={`transition-colors ${isDark ? "hover:bg-[#1A2C57]/88" : "hover:bg-[#F8FBFD]/90"}`}>
                  <td className={`px-4 py-3 font-medium ${isDark ? "text-[#F1F5F9]" : "text-[#0D1433]"}`}>{index + 1}</td>
                  <td className={`px-4 py-3 ${isDark ? "text-[#F1F5F9]" : "text-[#0D1433]"}`}>{row.author}</td>
                  <td className={`px-4 py-3 font-semibold ${isDark ? "text-[#F1F5F9]" : "text-[#0D1433]"}`}>{selectedMetric.formatter(row.score)}</td>
                  <td className={`px-4 py-3 ${isDark ? "text-[#F1F5F9]" : "text-[#0D1433]"}`}>{row.likes}</td>
                  <td className={`px-4 py-3 ${isDark ? "text-[#F1F5F9]" : "text-[#0D1433]"}`}>{row.messages}</td>
                  <td className={`px-4 py-3 ${isDark ? "text-[#F1F5F9]" : "text-[#0D1433]"}`}>{row.likesPerMessage.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section
          className={`mt-8 rounded-2xl p-5 shadow-sm ${
            isDark ? "border border-[#304A72] bg-[#122048]/82" : "border border-[#CFE3F2] bg-white/84"
          }`}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-[#4A85B0]">This Semester Wrapped</p>
          <h2 className={`mt-2 text-2xl font-bold ${isDark ? "text-[#F1F5F9]" : "text-[#0D1433]"}`}>
            Chapter shoutouts based on Spring 2026 stats
          </h2>
          <p className={`mt-2 text-sm ${isDark ? "text-[#DBECF3]/80" : "text-[#0D1433]/70"}`}>
            Quick superlatives pulled directly from the data to highlight different styles of chat impact.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {semesterAwards.map((award) => (
              <article
                key={award.title}
                className={`rounded-xl border bg-gradient-to-br p-4 shadow-sm ${award.cardClass}`}
              >
                <p className={`text-xs font-semibold uppercase tracking-wide ${isDark ? "text-[#E5EDFF]" : "text-[#1F3C67]"}`}>
                  {award.title}
                </p>
                <p className={`mt-1 text-sm ${isDark ? "text-[#E9EEFF]/90" : "text-[#213B5E]/85"}`}>{award.description}</p>
                <p className={`mt-3 text-lg font-bold ${isDark ? "text-white" : "text-[#0D1433]"}`}>
                  {award.winner?.author ?? "No eligible winner"}
                </p>
                <p className={`mt-1 text-sm font-medium ${isDark ? "text-[#DCE7FF]" : "text-[#22476E]"}`}>{award.value}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
