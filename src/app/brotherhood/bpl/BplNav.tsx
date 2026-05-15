// app/bpl/components/BplNav.tsx

import Image from "next/image";
import Link from "next/link";

export default function BplNav() {
  return (
    <nav className="px-6 md:px-28 pt-28 mb-8 flex items-center gap-8 text-white">
      <Link
        href="/brotherhood/bpl"
        className="group flex items-center gap-3"
      >
        <Image
          src="/bpl/logo.png"
          alt="Brotherhood Pong League"
          width={40}
          height={40}
          className="rounded-full"
        />

        <span className="text-xl md:text-3xl font-semibold gradient-text">
          Brotherhood Pong League
        </span>
      </Link>

      <div className="flex items-center gap-6 text-sm">
        <BplNavLink href="/brotherhood/bpl/schedule">Schedule</BplNavLink>
        <BplNavLink href="/brotherhood/bpl/teams">Teams</BplNavLink>
      </div>
    </nav>
  );
}

function BplNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm md:text-xl relative text-white/80 transition-colors hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white/80 after:transition-all after:duration-300 hover:after:w-full"
    >
      {children}
    </Link>
  );
}
