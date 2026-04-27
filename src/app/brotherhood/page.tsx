"use client";

import Link from "next/link";
import AuthGate from "./AuthGate";

const brotherLinks = [
  {
    title: "Brotherhood Wrapped: Messenger Likes",
    href: "/brotherhood/messenger-likes",
    description: "Explore chapter engagement stats and message-like highlights.",
  },
  {
    title: "BPL Brackets",
    href: "/brotherhood/bpl-brackets",
    description: "Open the latest bracket hub for BPL competitions and picks.",
  },
];

export default function BrotherhoodHubPage() {
  return (
    <AuthGate>
      <main className="min-h-screen bg-gradient-to-b from-[#0D1433] via-[#14244E] to-[#0D1433] px-4 pb-16 pt-28">
        <section className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl">Brotherhood Hub</h1>
            <p className="mx-auto mt-3 max-w-2xl text-[#DBECF3]">
              Access internal tools and chapter resources from one secure place.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {brotherLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-[#619CC7]/40 bg-white/10 p-6 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#619CC7] hover:bg-white/20"
              >
                <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
                <p className="mt-2 text-sm text-[#DBECF3]">{item.description}</p>
                <span className="mt-6 inline-flex items-center text-sm font-medium text-[#8BC0E6] transition-colors group-hover:text-white">
                  Open page
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    {"->"}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </AuthGate>
  );
}
