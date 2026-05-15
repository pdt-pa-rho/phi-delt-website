import { sheets } from "@/lib/google";

const SHEET_RANGE = "'Course Catalog'!A1:ZZ500";

function slugifyHeader(h, used) {
  let base = String(h ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
  if (!base) base = "column";

  let key = base;
  let n = 1;
  while (used.has(key)) {
    key = `${base}_${n}`;
    n += 1;
  }
  used.add(key);
  return key;
}

/**
 * Reads the "Course Catalog" tab from the website config spreadsheet.
 * Row 1 = headers; each subsequent row is one form submission.
 */
export async function getCourseCatalogFromSheet() {
  const spreadsheetId = process.env.CONFIG_SHEET_ID;

  if (!spreadsheetId) {
    throw new Error("CONFIG_SHEET_ID is not set");
  }

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: SHEET_RANGE,
  });

  const rows = res.data.values ?? [];
  if (rows.length < 2) {
    return { columns: [], entries: [] };
  }

  const headerRow = rows[0];
  const used = new Set();
  const columns = headerRow.map((label) => ({
    key: slugifyHeader(label, used),
    label: String(label ?? "").trim() || "Field",
  }));

  const entries = [];

  for (let r = 1; r < rows.length; r += 1) {
    const row = rows[r];
    const obj = {};

    let any = false;
    for (let c = 0; c < columns.length; c += 1) {
      const val = row?.[c];
      const text = val !== undefined && val !== null ? String(val).trim() : "";
      obj[columns[c].key] = text;
      if (text) any = true;
    }

    if (any) entries.push(obj);
  }

  return { columns, entries };
}
