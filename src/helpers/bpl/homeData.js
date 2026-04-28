// standingsData.js
import { sheets, calendar } from "@/lib/google";
import { getMostRecentSeason } from "@/helpers/bpl/seasons";
import { extractName, standardizeName, getAbbreviation } from "@/helpers/bpl/names";
import dayjs from "dayjs";

// Get featured matches from the spreadsheet
export const getFeaturedMatches = async (season = null) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.BPL_SHEET_ID,
      range: `${season || await getMostRecentSeason()}!A:ZZ`,
    });

    const values = response.data.values;
    if (!values || values.length === 0) {
      throw new Error('No data found in the spreadsheet');
    }

    // Get calendar events within two weeks
    const now = new Date();
    const timeMin = new Date();
    timeMin.setDate(now.getDate() - 14);

    const timeMax = new Date();
    timeMax.setDate(now.getDate() + 14);

    const calendarResponse = await calendar.events.list({
      calendarId: process.env.BPL_CALENDAR_ID,
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = calendarResponse.data.items || [];

    // Look for "Week X Matchups" headers
    const headers = values[0];
    const matchupColumns = [];

    headers.forEach((header, index) => {
      if (header && header.includes('Week') && header.includes('Matchups')) {
        // We found a matchups column, and the next column should contain the second team
        matchupColumns.push({
          index,
          title: header,
          week: parseInt(header.match(/Week\s+(\d+)/i)?.[1] || '0')
        });
      }
    });

    // Sort by week number to find the most recent/upcoming
    matchupColumns.sort((a, b) => b.week - a.week);

    if (matchupColumns.length === 0) {
      return []; // No matchups found
    }

    // Use the most recent matchup column
    const matchupColumnIndex = matchupColumns[0].index;
    const featuredMatches = [];
    let id = 1;

    // Process matchup data - teams are in adjacent columns
    for (let i = 1; i < values.length; i++) {
      const row = values[i];

      // Skip rows without matchup data
      if (!row || row.length <= matchupColumnIndex || !row[matchupColumnIndex] || row[matchupColumnIndex].trim() === '') {
        continue;
      }

      // Get team names from the matchup columns
      const team1Name = row[matchupColumnIndex].trim();

      // Skip headers or non-matchup rows
      if (team1Name === 'Team' || team1Name.includes('Matchups')) {
        continue;
      }

      // Check if there's a second team
      if (row.length <= matchupColumnIndex + 1 || !row[matchupColumnIndex + 1]) {
        continue; // Skip if no second team
      }

      const team2Name = row[matchupColumnIndex + 1].trim();

      // Assign alternating colors
      const colors = ["purple-500", "blue-500", "neon-green", "neon-orange"];

      const t1 = standardizeName(extractName(team1Name));
      const t2 = standardizeName(extractName(team2Name));

      const matchRegex = new RegExp(
        `\\b(${t1})\\s+(vs\\.?|versus)\\s+(${t2})\\b|\\b(${t2})\\s+(vs\\.?|versus)\\s+(${t1})\\b`,
        'i'
      );

      const matchingEvents = events.filter(e => {
        return e.summary && matchRegex.test(standardizeName(e.summary));
      });

      // Get the most recent event (the last one in time)
      const match = matchingEvents.length > 0 ? matchingEvents[matchingEvents.length - 1] : null;

      featuredMatches.push({
        id: id++,
        team1: {
          name: team1Name,
          abbreviation: getAbbreviation(team1Name),
          strictName: extractName(team1Name),
          color: colors[(id - 1) % colors.length]
        },
        team2: {
          name: team2Name,
          abbreviation: getAbbreviation(team2Name),
          strictName: extractName(team2Name),
          color: colors[id % colors.length]
        },
        ...(match?.start?.dateTime && {
          scheduled: true,
          dateTime: match.start.dateTime,
          time: dayjs(match.start.dateTime).format('h:mm A'), // Fixed placeholder time as requested
          date: dayjs(match.start.dateTime).format('MMMM D') // Today's date
        }),
      });
    }

    // Sort by scheduled
    return featuredMatches.sort((a, b) => {
      if (a.scheduled && !b.scheduled) return -1;
      else if (!a.scheduled && b.scheduled) return 1;
      else if (a.scheduled && b.scheduled) return a.dateTime - b.dateTime;
      else return 0;
    });

  } catch (error) {
    console.error('Error fetching featured matches:', error);
    return [];
  }
};

// Get top teams from the standings data
export const getTopTeams = async (season = null) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.BPL_SHEET_ID,
      range: `${season || await getMostRecentSeason()}!A:ZZ`,
    });

    const values = response.data.values;
    if (!values || values.length === 0) {
      throw new Error('No data found in the spreadsheet');
    }

    // Find the latest standings column
    const headers = values[0];
    const standingsColumns = [];

    headers.forEach((header, index) => {
      if (header && header.includes('Standings After Week')) {
        standingsColumns.push({
          index,
          title: header,
          week: parseInt(header.match(/Week\s+(\d+)/i)?.[1] || '0')
        });
      }
    });

    standingsColumns.sort((a, b) => b.week - a.week);

    if (standingsColumns.length === 0) {
      return []; // No standings found
    }

    const standingsColumnIndex = standingsColumns[0].index;
    const topTeams = [];
    let id = 1;
    let rank = 1;

    // Process standings data
    for (let i = 1; i < values.length; i++) {
      const row = values[i];

      // Skip rows without standings data
      if (!row || row.length <= standingsColumnIndex || !row[standingsColumnIndex] || row[standingsColumnIndex].trim() === '') {
        continue;
      }

      const teamName = row[standingsColumnIndex];

      // Skip header rows or non-team rows
      if (teamName === 'Team' || teamName.includes('Standings After')) {
        continue;
      }

      // Get record from the next column (wins-losses differential)
      if (row.length <= standingsColumnIndex + 1 || !row[standingsColumnIndex + 1]) continue;
      const recordString = row[standingsColumnIndex + 1];

      // Parse record string (format: "W-L +/-DIFF")
      const recordMatch = recordString.match(/(\d+)-(\d+)\s+([+-]?\d+)/);
      if (!recordMatch) continue;

      const wins = parseInt(recordMatch[1]);
      const losses = parseInt(recordMatch[2]);
      const differential = parseInt(recordMatch[3]);

      topTeams.push({
        id: id++,
        rank: rank++,
        name: teamName,
        strictName: extractName(teamName),
        abbreviation: getAbbreviation(teamName),
        wins,
        losses,
        differential,
      });

      // Only get the top 3 teams
      if (topTeams.length >= 3) break;
    }

    return topTeams;

  } catch (error) {
    console.error('Error fetching top teams:', error);
    return [];
  }
};

// Get recent results from the spreadsheet
export const getRecentResults = async (season = null) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.BPL_SHEET_ID,
      range: `${season || await getMostRecentSeason()}!A:ZZ`,
    });

    const values = response.data.values;
    if (!values || values.length === 0) {
      throw new Error('No data found in the spreadsheet');
    }

    // Look for "Result" columns
    const headers = values[0];
    const resultColumns = [];

    headers.forEach((header, index) => {
      if (header && header === 'Result') {
        resultColumns.push({
          index,
          // Find what week this result column belongs to
          week: (() => {
            // Look left for "Week X Matchups"
            for (let i = index - 1; i >= 0; i--) {
              if (headers[i] && headers[i].includes('Week') && headers[i].includes('Matchups')) {
                return parseInt(headers[i].match(/Week\s+(\d+)/i)?.[1] || '0');
              }
            }
            return 0;
          })()
        });
      }
    });

    // Sort by week number to find the most recent
    resultColumns.sort((a, b) => b.week - a.week);

    if (resultColumns.length === 0) {
      return []; // No results found
    }

    const resultColumnIndex = resultColumns[0].index;
    const matchupColumnIndex = (() => {
      // Find the corresponding matchup column
      for (let i = resultColumnIndex - 1; i >= 0; i--) {
        if (headers[i] && headers[i].includes('Week') && headers[i].includes('Matchups')) {
          return i;
        }
      }
      return -1;
    })();

    if (matchupColumnIndex === -1) {
      return []; // Couldn't find related matchup column
    }

    const recentResults = [];
    let id = 1;

    // Process result data - teams are in matchup columns, results are in result column
    for (let i = 1; i < values.length; i++) {
      const row = values[i];

      // Skip rows without result data
      if (!row || row.length <= resultColumnIndex || !row[resultColumnIndex] || row[resultColumnIndex].trim() === '') {
        continue;
      }

      // Skip if no matchup data in either matchup column
      if (row.length <= matchupColumnIndex || !row[matchupColumnIndex]) {
        continue;
      }

      // Skip if no second team in the matchup
      if (row.length <= matchupColumnIndex + 1 || !row[matchupColumnIndex + 1]) {
        continue;
      }

      const team1Name = row[matchupColumnIndex].trim();
      const team2Name = row[matchupColumnIndex + 1].trim();
      const resultText = row[resultColumnIndex];

      // Skip headers or non-result rows
      if (resultText === 'Result' || team1Name.includes('Matchups')) {
        continue;
      }

      // Parse result - assuming format is like standings: "W-L +/-DIFF"
      const scores = resultText.match(/(\d+)-(\d+)\s+([+-]?\d+)/);
      if (!scores) continue;

      const team1Score = parseInt(scores[1]);
      const team2Score = parseInt(scores[2]);

      recentResults.push({
        id: id++,
        score: `${team1Score}-${team2Score}`,
        differential: scores[3],
        team1: {
          name: team1Name,
          strictName: extractName(team1Name),
          abbreviation: getAbbreviation(team1Name),
          result: team1Score > team2Score ? "W" : "L"
        },
        team2: {
          name: team2Name,
          strictName: extractName(team2Name),
          abbreviation: getAbbreviation(team2Name),
          result: team2Score > team1Score ? "W" : "L"
        }
      });
    }

    return recentResults;
  } catch (error) {
    console.error('Error fetching recent results:', error);
    return [];
  }
};
