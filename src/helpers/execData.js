import { sheets } from "@/lib/google";

export async function getExecData() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.CONFIG_SHEET_ID,
    range: "Exec!A:D",
  });

  const rows = res.data.values ?? [];

  return rows
    .slice(1)
    .map((row) => ({
      role: String(row[0] ?? "").trim(),
      name: String(row[1] ?? "").trim(),
      picture: String(row[2] ?? "").trim(),
      link: String(row[3] ?? "").trim(),
    }))
    .filter((officer) => officer.role && officer.name);
}
