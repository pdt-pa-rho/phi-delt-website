"use client";

import useSWR from "swr";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useMemo } from "react";

type RushEvent = {
  date: string;
  time: string;
  location: string;
  title: string;
  description: string;
}

export default function RushEvents() {
  const {
    data: rushEvents,
    isLoading,
    error,
  } = useSWR(`/api/rush`);

  const firstRushEvent = rushEvents && rushEvents.length > 0 && rushEvents[0];

  const semester = useMemo(() => {
    // Default to current date
    let date = new Date();

    // Use the date of the first rush event if it exists
    if (firstRushEvent)
    {
      const parsedDate = new Date(firstRushEvent.date);

      if (parsedDate instanceof Date && !isNaN(parsedDate.valueOf())) date = parsedDate;
    }

    // Fall/spring discerned by threshhold of August
    return `${date.getMonth() < 7 ? 'Spring' : 'Fall'} ${date.getFullYear()}`
  }, [firstRushEvent])

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-6 text-[var(--white)]">{semester} Rush Events</h2>
      <div className="space-y-4">
        {isLoading && <LoadingSpinner />}

        {error && (
          <div className="text-center py-8 text-red-500">
            <p>There was an error loading the rush events.</p>
            <p className="text-sm text-gray-400 mt-2">
              Contact our recruitment chair for information regarding rush!
            </p>
          </div>
        )}

        {rushEvents && rushEvents.map((event: RushEvent, index: number) => (
          <div key={index} className="bg-[var(--light-blue)] p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h3 className="text-xl font-semibold text-[var(--navy)]">{event.title}</h3>
              <div className="text-[var(--blue)] font-medium">{event.date} • {event.time}</div>
            </div>
            <p className="text-[var(--navy)]/80 mb-2">{event.description}</p>
            <p className="text-[var(--navy)] font-medium">{event.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
