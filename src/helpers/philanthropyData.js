import { sheets } from "@/lib/google";

function parseMoney(value) {
  const text = String(value ?? "").trim();
  const number = Number(text.replace(/[$,]/g, ""));

  return Number.isFinite(number) ? number : 0;
}

export async function getPhilanthropyData() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.CONFIG_SHEET_ID,
    range: "Philanthropy!A:B",
  });

  const rows = res.data.values ?? [];
  const [goal, raised] = rows[1] ?? [];

  return {
    goal: parseMoney(goal),
    raised: parseMoney(raised),
  };
}
