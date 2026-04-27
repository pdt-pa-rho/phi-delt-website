"use client";

import AuthGate from "../AuthGate";

export default function BplBracketsPage() {
  return (
    <AuthGate>
      <main className="min-h-screen bg-[#F1F5F9] px-4 pb-16 pt-28">
        <section className="mx-auto max-w-3xl rounded-2xl border border-[#DBECF3] bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-[#0D1433]">BPL Brackets</h1>
          <p className="mt-3 text-[#0D1433]/80">
            This page is ready for bracket content, standings, and updates.
          </p>
        </section>
      </main>
    </AuthGate>
  );
}
