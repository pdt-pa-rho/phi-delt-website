import { getSheetValues, teamFromSeedRow } from "@/helpers/bpl/sheetData";
import { nameEqual } from "@/helpers/bpl/names";

export async function getBracketData() {
  const [seedingValues, bracketValues] = await Promise.all([
    getSheetValues("Seeding", "A:J"),
    getSheetValues("Bracket", "A:H"),
  ]);

  const config = readBracketConfig(seedingValues);

  if (!config.showBracket) {
    return {
      enabled: false,
      config,
      rounds: [],
    };
  }

  const teams = seedingValues
    .slice(1)
    .map(teamFromSeedRow)
    .filter(Boolean)
    .sort((a, b) => a.seed - b.seed);

  const bracketRows = parseBracketRows(bracketValues, teams);
  const bracketSize = config.bracketSize ?? 16;

  const rounds = buildBracketRounds({
    teams,
    bracketRows,
    bracketSize,
  });

  return {
    enabled: true,
    config,
    rounds,
  };
}

function buildBracketRounds({ teams, bracketRows, bracketSize }) {
  const roundCount = Math.log2(bracketSize);

  if (!Number.isInteger(roundCount)) {
    throw new Error(`Invalid bracket size: ${bracketSize}`);
  }

  const bracketSeedOrder = generateBracketSeedOrder(bracketSize);
  const firstRoundMatches = [];

  for (let i = 0; i < bracketSeedOrder.length; i += 2) {
    const matchIndex = i / 2;

    firstRoundMatches.push({
      id: `r1-m${matchIndex + 1}`,
      round: 1,
      roundLabel: getRoundLabel(1, roundCount),
      matchIndex,
      team1: findTeamBySeed(teams, bracketSeedOrder[i]),
      team2: findTeamBySeed(teams, bracketSeedOrder[i + 1]),
      result: null,
      winner: null,
    });
  }

  const rounds = [
    {
      round: 1,
      roundLabel: getRoundLabel(1, roundCount),
      matches: firstRoundMatches,
    },
  ];

  for (let round = 2; round <= roundCount; round++) {
    const previousRound = rounds[round - 2];
    const matchCount = previousRound.matches.length / 2;

    rounds.push({
      round,
      roundLabel: getRoundLabel(round, roundCount),
      matches: Array.from({ length: matchCount }, (_, matchIndex) => {
        const sourceA = previousRound.matches[matchIndex * 2];
        const sourceB = previousRound.matches[matchIndex * 2 + 1];

        return {
          id: `r${round}-m${matchIndex + 1}`,
          round,
          roundLabel: getRoundLabel(round, roundCount),
          matchIndex,
          team1: sourceA.winner,
          team2: sourceB.winner,
          result: null,
          winner: null,
          sourceMatchIds: [sourceA.id, sourceB.id],
        };
      }),
    });
  }

  for (let i = 0; i < rounds.length; i++) {
    overlayBracketRows(rounds, bracketRows);
    propagateWinners(rounds);
  }

  return rounds;
}

function overlayBracketRows(rounds, bracketRows) {
  for (const row of bracketRows) {
    const roundGroup = rounds.find((round) => round.round === row.round);
    if (!roundGroup) continue;

    const match = roundGroup.matches[row.matchIndex];
    if (!match) continue;

    match.team1 = row.team1 ?? match.team1;
    match.team2 = row.team2 ?? match.team2;
    match.result = row.result ?? match.result;
    match.winner = inferWinner(match.team1, match.team2, match.result);
  }
}

function propagateWinners(rounds) {
  for (let roundIndex = 0; roundIndex < rounds.length - 1; roundIndex++) {
    const currentRound = rounds[roundIndex];
    const nextRound = rounds[roundIndex + 1];

    currentRound.matches.forEach((match, matchIndex) => {
      if (!match.winner) return;

      const nextMatchIndex = Math.floor(matchIndex / 2);
      const nextMatch = nextRound.matches[nextMatchIndex];

      if (!nextMatch) return;

      if (matchIndex % 2 === 0) {
        nextMatch.team1 ??= match.winner;
      } else {
        nextMatch.team2 ??= match.winner;
      }
    });
  }
}

function parseBracketRows(values, teams) {
  if (!values?.length) return [];

  const headerRowIndex = values.findIndex(
    (row) => String(row?.[0] ?? "").trim().toLowerCase() === "round"
  );

  if (headerRowIndex === -1) {
    console.log("Bracket sheet first rows:", values.slice(0, 8));
    throw new Error("Missing bracket header row with 'Round' in column A");
  }

  const col = {
    round: 0,
    homePlayers: 1,
    homeTeam: 2,
    awayPlayers: 4,
    awayTeam: 5,
    result: 7,
  };

  return values
    .slice(headerRowIndex + 1)
    .map((row, rowOffset) => {
      const round = Number(row[col.round]);
      if (!round) return null;

      const team1Name = String(row[col.homeTeam] ?? "").trim();
      const team2Name = String(row[col.awayTeam] ?? "").trim();

      if (!team1Name && !team2Name) return null;

      const absoluteRowIndex = headerRowIndex + 1 + rowOffset;

      return {
        round,
        matchIndex: getMatchIndexWithinRound(
          values,
          absoluteRowIndex,
          round,
          col.round,
          headerRowIndex
        ),
        team1: team1Name
          ? hydrateTeam(team1Name, row[col.homePlayers], teams)
          : null,
        team2: team2Name
          ? hydrateTeam(team2Name, row[col.awayPlayers], teams)
          : null,
        result: parseResult(row[col.result]),
      };
    })
    .filter(Boolean);
}

function getMatchIndexWithinRound(
  values,
  absoluteRowIndex,
  round,
  roundCol,
  headerRowIndex
) {
  let index = 0;

  for (let i = headerRowIndex + 1; i < absoluteRowIndex; i++) {
    if (Number(values[i]?.[roundCol]) === round) {
      index++;
    }
  }

  return index;
}

function hydrateTeam(name, playersText, teams) {
  const seededTeam = teams.find((team) => nameEqual(team.name, name));

  return {
    seed: seededTeam?.seed ?? null,
    name,
    players:
      playersText
        ?.split("|")
        .map((player) => player.trim())
        .filter(Boolean) ??
      seededTeam?.playersText
        ?.split("|")
        .map((player) => player.trim())
        .filter(Boolean) ??
      [],
    abbreviation: seededTeam?.abbreviation ?? null,
    strictName: seededTeam?.strictName ?? name,
  };
}

function parseResult(value) {
  if (!value) return null;

  const match = String(value).match(/(\d+)\s*-\s*(\d+)(?:\s*([+-]?\d+))?/);
  if (!match) return null;

  return {
    raw: String(value),
    team1Score: Number(match[1]),
    team2Score: Number(match[2]),
    differential: match[3] ? Number(match[3]) : null,
  };
}

function inferWinner(team1, team2, result) {
  if (!team1 || !team2 || !result) return null;

  if (result.team1Score > result.team2Score) return team1;
  if (result.team2Score > result.team1Score) return team2;

  return null;
}

function generateBracketSeedOrder(size) {
  if (size === 1) return [1];

  const previous = generateBracketSeedOrder(size / 2);
  return previous.flatMap((seed) => [seed, size + 1 - seed]);
}

function findTeamBySeed(teams, seed) {
  const team = teams.find((team) => team.seed === seed);
  if (!team) return null;

  return {
    seed: team.seed,
    name: team.name,
    players: String(team.playersText ?? "")
      .split("|")
      .map((player) => player.trim())
      .filter(Boolean),
    abbreviation: team.abbreviation,
    strictName: team.strictName,
  };
}

function getRoundLabel(round, roundCount) {
  if (round === roundCount) return "Final";
  if (round === roundCount - 1) return "Semifinal";

  const teamsRemaining = 2 ** (roundCount - round + 1);
  return `Round of ${teamsRemaining}`;
}

function readBracketConfig(values) {
  const config = {
    topSeeds: 8,
    playIns: 16,
    bracketSize: 16,
    showBracket: false,
  };

  for (const row of values) {
    const key = row[7];
    const value = row[8];

    if (key === "TOP_SEEDS") config.topSeeds = Number(value);
    if (key === "PLAY_INS") config.playIns = Number(value);
    if (key === "BRACKET_SIZE") config.bracketSize = Number(value);
    if (key === "SHOW_BRACKET") {
      config.showBracket =
        value === true || String(value).toLowerCase() === "true";
    }
  }

  return config;
}
