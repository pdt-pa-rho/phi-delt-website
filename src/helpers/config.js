import { sheets } from "@/lib/google";

const CONFIG_CACHE_TTL_MS = 60_000; // refresh at most once per minute

let cachedConfig = null;
let cachedAt = 0;
let inFlightConfigPromise = null;

function parseConfigValue(value) {
  const text = String(value ?? "").trim();

  if (text === "") return "";

  if (/^(true|false)$/i.test(text)) {
    return text.toLowerCase() === "true";
  }

  if (/^-?\d+(\.\d+)?$/.test(text)) {
    return Number(text);
  }

  return text;
}

export async function getWebsiteConfig({ forceRefresh = false } = {}) {
  const now = Date.now();

  if (
    !forceRefresh &&
    cachedConfig &&
    now - cachedAt < CONFIG_CACHE_TTL_MS
  ) {
    return cachedConfig;
  }

  if (!forceRefresh && inFlightConfigPromise) {
    return inFlightConfigPromise;
  }

  inFlightConfigPromise = sheets.spreadsheets.values
    .get({
      spreadsheetId: process.env.CONFIG_SHEET_ID,
      range: "Config!A:B",
    })
    .then((response) => {
      const rows = response.data.values ?? [];
      const config = {};

      for (const row of rows) {
        const key = String(row[0] ?? "").trim();

        if (!key || key.startsWith("#")) continue;

        config[key] = parseConfigValue(row[1]);
      }

      cachedConfig = config;
      cachedAt = Date.now();

      return config;
    })
    .finally(() => {
      inFlightConfigPromise = null;
    });

  return inFlightConfigPromise;
}
