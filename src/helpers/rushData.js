import { sheets } from "@/lib/google";

function findHeaderIndex(headers, names) {
  const index = headers.findIndex((h) =>
    names.some((name) => h?.toLowerCase().includes(name.toLowerCase()))
  );

  if (index === -1) {
    throw new Error(`Missing Rush column: ${names.join(" / ")}`);
  }

  return index;
}

export async function getRushEvents() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.CONFIG_SHEET_ID,
    range: "Rush!A:Z",
  });

  const values = res.data.values ?? []

  if (!values || values.length === 0) return [];

  const headers = values[0];

  const titleIdx = findHeaderIndex(headers, ["title", "event"]);
  const dateIdx = findHeaderIndex(headers, ["date"]);
  const timeIdx = findHeaderIndex(headers, ["time"]);
  const locationIdx = findHeaderIndex(headers, ["location"]);
  const descIdx = findHeaderIndex(headers, ["description", "desc"]);

  return values.slice(1).map((row) => ({
    title: String(row[titleIdx] ?? "").trim(),
    date: String(row[dateIdx] ?? "").trim(),
    time: String(row[timeIdx] ?? "").trim(),
    location: String(row[locationIdx] ?? "").trim(),
    description: String(row[descIdx] ?? "").trim(),
  }))
    .filter((event) => event.title);
}
