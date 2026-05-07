"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import SvgTiltBackground from "@/components/SVGTiltBackground";
import { ChevronRight } from "lucide-react";


const brotherLinks = [
  {
    title: "Course Catalog",
    href: "/brotherhood/classes",
    description:
      "Browse peer reviews from the chapter — classes others have taken and notes from the form.",
  },
  {
    title: "Brotherhood Wrapped: Messenger Likes",
    href: "/brotherhood/messenger-likes",
    description: "Explore chapter engagement stats and message-like highlights.",
  },
  {
    title: "Brotherhood Pong League",
    href: "/brotherhood/bpl",
    description: "Check out the top teams and upcoming matches for this season of BPL.",
  },
  {
    title: "Family Lines",
    href: "/brotherhood/family-lines",
    description: "Discover your lineage within the brotherhood and explore the chapter family tree across generations.",
  },
];

export default function BrotherhoodHubPage() {
  const { data: session } = useSession();

  return (
    <SvgTiltBackground
      svgUrl="/svg/PDT_Swords.svg"
      className="min-h-screen bg-gradient-to-b from-[var(--navy)] via-[#14244E] to-[var(--navy)]"
      svgClassName="text-[var(--light-blue)]/15 drop-shadow-md drop-shadow-black"
      fullPage
      fadeIn={false}
    >
      <main className="min-h-screen px-4 pb-16 pt-28">
        <section className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-white md:text-5xl blue-shine">Brotherhood Hub</h1>
            <p className="mx-auto mt-3 max-w-2xl text-[#DBECF3]">
              {session?.user ? `Welcome ${session.user.name}! ` : ""}
              Access internal tools and chapter resources from one secure place.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {brotherLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border border-[var(--blue)]/40 bg-white/10 p-6 shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[var(--blue)] hover:bg-white/20"
              >
                <h2 className="text-2xl font-semibold text-white">{item.title}</h2>
                <p className="mt-2 text-sm text-[#DBECF3]">{item.description}</p>
                <span className="mt-6 inline-flex items-center text-sm font-medium text-[#8BC0E6] transition-colors group-hover:text-white">
                  Open
                  <ChevronRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </SvgTiltBackground>
  );
}
