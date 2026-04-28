import { sheets } from "@/lib/google";

export async function getAllowedAndrewIDs() {
  const spreadsheetId = process.env.AUTH_SHEET_ID;

  if (!spreadsheetId) {
    throw new Error("AUTH_SHEET_ID is not set");
  }

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "A2:A",
  });

  const rows = response.data.values ?? [];

  return rows
    .map((row) => row[0])
    .filter(Boolean)
    .map((andrewID) => andrewID.trim().toLowerCase());
}

export async function isAllowedAndrewID(andrewID) {
  if (!andrewID) return false;

  const allowedEmails = await getAllowedEmails();
  return allowedEmails.includes(andrewID.trim().toLowerCase());
}
