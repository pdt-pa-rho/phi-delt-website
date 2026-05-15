import { sheets } from "@/lib/google";


export async function getRushEvents() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.CONFIG_SHEET_ID,
    range: "Rush!A:Z",
  });

  const values = res.data.values ?? []

  if (!values || values.length === 0) return [];

  // Reference sheet for column indices
  return values.slice(1).map((row) => ({
    date: String(row[0] ?? "").trim(),
    time: String(row[1] ?? "").trim(),
    location: String(row[2] ?? "").trim(),
    title: String(row[3] ?? "").trim(),
    description: String(row[4] ?? "").trim(),
  }))
    .filter((event) => event.title);
}
