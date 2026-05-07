import { sheets } from "@/lib/google";

export async function getAllowedEmails() {
  const spreadsheetId = process.env.CONFIG_SHEET_ID;

  if (!spreadsheetId) {
    throw new Error("CONFIG_SHEET_ID is not set");
  }

  const andrewIds = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Access!A2:B",
  });

  const rows = andrewIds.data.values ?? [];


  return rows
    .flatMap((row) => {
      const andrewId = row[0]?.trim();
      const customEmail = row[1]?.trim();

      return [
        andrewId ? `${andrewId}@andrew.cmu.edu` : null,
        customEmail || null,
      ];
    })
    .filter(Boolean)
    .map((email) => email.toLowerCase());
}

export async function isAllowedEmail(andrewID) {
  if (!andrewID) return false;

  const allowedEmails = await getAllowedEmails();
  return allowedEmails.includes(andrewID.trim().toLowerCase());
}
