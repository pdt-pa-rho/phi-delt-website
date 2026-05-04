"use client";

import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import LoadingSpinner from "@/components/LoadingSpinner";

type ExecPosition = {
  role: string;
  name: string;
  picture?: string;
  link?: string;
};

export default function Exec() {
  const { data: exec, isLoading, error } = useSWR("/api/exec");

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {isLoading && <LoadingSpinner />}

      {error && (
        <div className="text-center py-8 text-red-500">
          <p>There was an error loading the exec board.</p>
          <p className="text-sm text-gray-400 mt-2">
            Please try again later.
          </p>
        </div>
      )}

      {exec && exec.map((leader: ExecPosition, index: number) => {
          const imageSrc = leader.picture ?? `/executive/${leader.name}.jpg`;

          const content = (
            <>
              <div
                className={clsx(
                  "bg-[var(--white)] h-32 w-32 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden transition-transform duration-200",
                  leader.link && "group-hover:scale-105"
                )}
              >
                <Image
                  src={imageSrc}
                  alt={leader.name}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <h3 className="font-semibold text-[var(--navy)]">{leader.role}</h3>

              <p className="text-[var(--navy)]">
                <span
                  className={clsx(
                    "relative inline-block after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-[var(--navy)] after:transition-transform after:duration-200",
                    leader.link && "group-hover:after:scale-x-100"
                  )}
                >
                  {leader.name}
                </span>
              </p>
            </>
          );

          return (
            <div
              key={index}
              className="bg-[var(--light-blue)] p-4 rounded-lg shadow-md text-center"
            >
              {leader.link ? (
                <Link href={leader.link} className="group block cursor-pointer">
                  {content}
                </Link>
              ) : (
                <div className="block">{content}</div>
              )}
            </div>
          );
        })}
    </div>
  );
}
