// helpers/bpl/google.js
import { google } from "googleapis";

// Initialize the Google Sheets API client with the API key
export const sheets = google.sheets({
  version: "v4",
  auth: process.env.GOOGLE_API_KEY,
});

// Initialize the Google Calendar API client with the API key
export const calendar = google.calendar({
  version: "v3",
  auth: process.env.GOOGLE_API_KEY,
});

export { google };
