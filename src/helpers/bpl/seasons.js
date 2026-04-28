// Add these functions to a new file called seasonUtils.js
import { sheets } from "@/lib/google";

// Get all seasons (sheet names matching season format)
export const getSeasons = async () => {
  try {
    // Get spreadsheet metadata to access all sheet names
    const response = await sheets.spreadsheets.get({
      spreadsheetId: process.env.BPL_SHEET_ID
    });

    const allSheets = response.data.sheets || [];
    const seasonSheets = [];

    // Filter for sheets that match the season format (e.g., "Spring 2025", "Fall 2024")
    for (const sheet of allSheets) {
      const sheetName = sheet.properties.title;
      // Check if the sheet name matches the season format (Season Year)
      if (/^(Spring|Fall|Summer|Winter)\s+\d{4}$/.test(sheetName)) {
        seasonSheets.push(sheetName);
      }
    }

    return seasonSheets;
  } catch (error) {
    console.error('Error fetching sheet names:', error);
    return [];
  }
};

// Get the most recent season
export const getMostRecentSeason = async () => {
  const seasons = await getSeasons();

  if (seasons.length === 0) {
    return null;
  }

  // Parse season names into components for comparison
  const parsedSeasons = seasons.map(season => {
    const [seasonName, yearStr] = season.split(/\s+/);
    const year = parseInt(yearStr);

    // Assign a numeric value to each season for ordering within a year
    let seasonValue;
    switch (seasonName) {
      case 'Winter': seasonValue = 0; break;
      case 'Spring': seasonValue = 1; break;
      case 'Summer': seasonValue = 2; break;
      case 'Fall': seasonValue = 3; break;
      default: seasonValue = 0;
    }

    return {
      name: season,
      year,
      seasonValue
    };
  });

  // Sort by year, then by season value (both descending)
  parsedSeasons.sort((a, b) => {
    if (a.year !== b.year) {
      return b.year - a.year; // Most recent year first
    }
    return b.seasonValue - a.seasonValue; // Most recent season within the year first
  });

  // Return the name of the most recent season
  return parsedSeasons[0]?.name || null;
};
