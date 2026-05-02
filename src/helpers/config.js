// helpers/config.js
import { sheets } from "@/lib/google";

let configPromise = null;

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

export async function getWebsiteConfig() {
  if (configPromise) return configPromise;

  configPromise = sheets.spreadsheets.values
    .get({
      spreadsheetId: process.env.CONFIG_SHEET_ID,
      range: "Config!A:B",
    })
    .then((response) => {
      const rows = response.data.values ?? {};
      const config = {};

      for (const row of rows) {
        const key = String(row[0] ?? "").trim();

        if (!key || key.startsWith("#")) continue;

        config[key] = parseConfigValue(row[1]);
      }

      return config;
    });

  return configPromise;
}
