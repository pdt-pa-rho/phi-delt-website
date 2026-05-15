import { sheets } from "@/lib/google";

export async function getUpcomingEvents() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.CONFIG_SHEET_ID,
    range: "Upcoming Events!A:Z",
  });

  const values = res.data.values ?? []

  if (!values || values.length === 0) return [];

  // Reference sheet for column indices
  return values.slice(1).map((row) => ({
    date: String(row[0] ?? "").trim(),
    endDate: String(row[1] ?? "").trim(),
    title: String(row[2] ?? "").trim(),
    description: String(row[3] ?? "").trim(),
    link: String(row[4] ?? "").trim(),
    linkTitle: String(row[5] ?? "").trim(),
  }))
    .filter((event) => event.title);
}
