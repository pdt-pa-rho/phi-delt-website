"use client";

import useSWR from "swr";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import dayjs from "dayjs";

type UpcomingEvent = {
  date: string;
  endDate?: string;
  title: string;
  description: string;
  link?: string;
  linkTitle?: string;
}

function formatDateRange(startInput: string, endInput?: string) {
  const start = dayjs(startInput);
  const end = dayjs(endInput || startInput);

  if (start.isSame(end, "day")) {
    return start.format("MMM D, YYYY").toUpperCase();
  }

  if (start.isSame(end, "month")) {
    return `${start.format("MMM").toUpperCase()} ${start.format("D")}-${end.format("D")}, ${end.format("YYYY")}`;
  }

  if (start.isSame(end, "year")) {
    return `${start.format("MMM D").toUpperCase()} - ${end.format("MMM D")}, ${end.format("YYYY")}`;
  }

  return `${start.format("MMM D, YYYY").toUpperCase()} - ${end.format("MMM D, YYYY").toUpperCase()}`;
}

export default function UpcomingEvents() {
  const {
    data: rushEvents,
    isLoading,
    error,
  } = useSWR(`/api/upcoming_events`);

  return (
    <>
      {isLoading && <LoadingSpinner />}

      {error && (
        <div className="text-center py-8 text-red-500">
          <p>There was an error loading upcoming events.</p>
        </div>
      )}

      {rushEvents &&
        <div className="grid md:grid-cols-3 gap-6 w-full">
          {rushEvents.map((event: UpcomingEvent, index: number) => (
            <div key={index} className="bg-[var(--light-blue)] dark:bg-[var(--navy)]/50 p-6 rounded-xl">
              <div className="text-[var(--blue)] font-bold mb-2">{formatDateRange(event.date, event.endDate)}</div>
              <h3 className="text-xl font-semibold mb-3">{event.title}</h3>
              <p className="text-[var(--navy)]/70 dark:text-[var(--white)]/70 mb-4">
                {event.description}
              </p>
              {event.link && (
                <Link
                  href={event.link}
                  className="text-[var(--blue)] hover:text-[var(--primary-dark)] dark:hover:text-[var(--light-blue)] font-medium inline-flex items-center group"
                >
                  {event.linkTitle || "Details"}
                  <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          ))}
        </div>
      }
    </>
  );
}
