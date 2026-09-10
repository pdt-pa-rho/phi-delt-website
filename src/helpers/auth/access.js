import { sheets } from "@/lib/google";

export async function getAllowedEmails() {
  const accessList = await getAccessList();
  return accessList.map((entry) => entry.email);
}

export async function getAccessList() {
  const spreadsheetId = process.env.CONFIG_SHEET_ID;

  if (!spreadsheetId) {
    throw new Error("CONFIG_SHEET_ID is not set");
  }

  const andrewIds = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: "Access!A2:C",
  });

  const rows = andrewIds.data.values ?? [];

  return rows
    .flatMap((row) => {
      const andrewId = row[0]?.trim();
      const customEmail = row[1]?.trim();
      const alumnEmail = row[2]?.trim();

      return [
        andrewId
          ? { email: `${andrewId}@andrew.cmu.edu`, alumn: false }
          : null,
        customEmail
          ? { email: customEmail, alumn: false }
          : null,
        alumnEmail
          ? { email: alumnEmail, alumn: true }
          : null,
      ];
    })
    .filter(Boolean)
    .map((entry) => ({
      ...entry,
      email: entry.email.toLowerCase(),
    }));
}

export async function getAccessForEmail(email) {
  if (!email) return null;

  const normalizedEmail = email.trim().toLowerCase();
  const accessList = await getAccessList();
  return accessList.find((entry) => entry.email === normalizedEmail) ?? null;
}

export async function isAllowedEmail(andrewID) {
  if (!andrewID) return false;

  const access = await getAccessForEmail(andrewID);
  return Boolean(access);
}
