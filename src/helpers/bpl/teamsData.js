// teamsData.js
import { sheets } from "@/lib/google";
import { getMostRecentSeason } from "@/helpers/bpl/seasons";
import { extractName, getAbbreviation } from "@/helpers/bpl/names";


export const getTeamsData = async (season = null) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.BPL_SHEET_ID,
      range: `${season || await getMostRecentSeason()}!A:ZZ`,
    });

    const values = response.data.values;
    if (!values || values.length === 0) {
      throw new Error('No data found in the spreadsheet');
    }

    // Function to normalize team name (remove player names in parentheses)
    const normalizeTeamName = (fullName) => {
      // Extract just the team name part before the parentheses
      const match = fullName.trim().match(/^([^(]+)/);
      const trimmed = match ? match[1].trim() : fullName.trim();
      return trimmed.toLowerCase().replace(/[^\w\s]/g, '');
    };

    // First get all team names and players from the main listing (first columns)
    const teamPlayers = {};
    for (let i = 1; i < values.length; i++) {
      const row = values[i];
      if (row && row[0] && row[0].trim() !== '') {
        const teamName = row[0].trim();
        // Skip header rows
        if (teamName === 'Team' || teamName.includes('Week') || teamName.includes('Standings')) {
          continue;
        }

        const player1 = row.length > 1 ? row[1] || '' : '';
        const player2 = row.length > 2 ? row[2] || '' : '';

        teamPlayers[teamName] = {
          normalizedName: normalizeTeamName(teamName), // Store normalized version for matching
          players: [player1, player2].filter(Boolean)
        };
      }
    }

    // Find all "Standings After Week X" columns
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

    // Sort standings columns by week number (descending)
    standingsColumns.sort((a, b) => b.week - a.week);

    // For each team, find the most recent week where they appear in standings
    const teams = [];
    let id = 1;

    // Create a map of normalized names to full team names for easy lookup
    const normalizedMap = {};
    for (const teamName in teamPlayers) {
      const normalizedName = teamPlayers[teamName].normalizedName;
      normalizedMap[normalizedName] = teamName;
    }

    // Iterate through each team in our teamPlayers object
    for (const teamName in teamPlayers) {
      // Find the most recent standings column that includes this team
      let foundStats = false;
      let teamStats = null;
      let teamWeek = null;

      // Check each standings column, starting from the most recent
      for (const standingsColumn of standingsColumns) {
        const columnIndex = standingsColumn.index;

        // Look for the team in this standings column
        for (let i = 1; i < values.length; i++) {
          const row = values[i];
          if (!row || row.length <= columnIndex) continue;

          if (row[columnIndex]) {
            const standingsTeamName = row[columnIndex].trim();
            const normalizedStandingsName = normalizeTeamName(standingsTeamName);

            // Match using normalized names
            if (normalizedStandingsName === teamPlayers[teamName].normalizedName) {
              // Found the team in this standings column
              if (row.length > columnIndex + 1 && row[columnIndex + 1]) {
                const recordString = row[columnIndex + 1];
                const recordMatch = recordString.match(/(\d+)-(\d+)\s+([+-]?\d+)/);

                if (recordMatch) {
                  const wins = parseInt(recordMatch[1]);
                  const losses = parseInt(recordMatch[2]);
                  const differential = parseInt(recordMatch[3]);

                  teamStats = { wins, losses, differential };
                  teamWeek = standingsColumn.week;
                  foundStats = true;
                  break;
                }
              }
            }
          }
        }

        if (foundStats) break; // Stop checking older standings columns
      }

      // Add team to our results if we found stats for them
      if (foundStats && teamStats) {
        teams.push({
          id: id++,
          name: teamName,
          strictName: extractName(teamName),
          abbreviation: getAbbreviation(teamName),
          players: teamPlayers[teamName].players,
          stats: teamStats,
          week: teamWeek
        });
      } else {
        // If no stats were found, add the team with empty stats
        teams.push({
          id: id++,
          name: teamName,
          strictName: extractName(teamName),
          abbreviation: getAbbreviation(teamName),
          players: teamPlayers[teamName].players,
          stats: { wins: 0, losses: 0 },
          week: null
        });
      }
    }

    // Sort by wins first, then differential -- add rank to response
    return teams.sort((a, b) => {
      if (b.stats.wins !== a.stats.wins) return b.stats.wins - a.stats.wins;
      return b.stats.differential - a.stats.differential;
    }).map((team, index) => ({ ...team, rank: index + 1 }));

  } catch (error) {
    console.error('Error fetching teams data:', error);
    return [];
  }
};
