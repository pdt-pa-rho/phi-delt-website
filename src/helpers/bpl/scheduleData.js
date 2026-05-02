// scheduleData.js
import { calendar } from "@/lib/google";
import dayjs from 'dayjs';

export const getScheduleData = async (weekOffset) => {
  try {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();

    // Get date for Sunday (start of the week)
    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - currentDate.getDay() + weekOffset * 7);
    startDate.setHours(0, 0, 0, 0);

    // Get date for Saturday (end of the week)
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    endDate.setHours(23, 59, 59, 999);

    // Format dates for Google Calendar API
    const timeMin = startDate.toISOString();
    const timeMax = endDate.toISOString();

    // Fetch events from Google Calendar
    const response = await calendar.events.list({
      calendarId: process.env.BPL_CALENDAR_ID,
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: 'startTime'
    });

    const events = response.data.items || [];

    // Create the week structure
    const currentWeek = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      return {
        date,
        dateString: date.toISOString().split('T')[0], // Format as YYYY-MM-DD
        day: weekDays[i],
        dayNumber: date.getDate(),
        matches: [] // Will be populated with events
      };
    });

    // Process events and add them to the appropriate day
    events.forEach(event => {
      // Skip events without a start time
      if (!event.start || !event.start.dateTime) return;

      // Get the date and time of the event
      const eventDate = new Date(event.start.dateTime);
      const eventDay = eventDate.getDay(); // 0 = Sunday, 6 = Saturday

      // Format time (e.g., "9:00 PM")
      const time = dayjs(eventDate).format('h:mm A');

      // Extract team names from event summary
      // Assuming format is "Team 1 vs Team 2" or similar
      let teams = [];
      if (event.summary) {
        // Try to split by "vs" or "vs."
        const teamMatch = event.summary.match(/(.+?)\s+(?:vs\.?|versus)\s+(.+)/i);
        if (teamMatch) {
          teams = [teamMatch[1].trim(), teamMatch[2].trim()];
        } else {
          // If no "vs" found, just use the whole summary as a single team
          teams = [event.summary];
        }
      }

      // Add the match to the corresponding day
      currentWeek[eventDay].matches.push({
        time,
        teams,
        eventId: event.id,
        location: event.location
      });
    });

    return currentWeek;
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    // Return a fallback week structure with no matches
    return createFallbackWeek(weekOffset);
  }
};

// Helper function to create a fallback week structure if API call fails
const createFallbackWeek = (weekOffset) => {
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDate = new Date();

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - currentDate.getDay() + i + weekOffset * 7);

    return {
      date: date.toISOString().split('T')[0],
      day: weekDays[i],
      dayNumber: date.getDate(),
      matches: []
    };
  });
};
