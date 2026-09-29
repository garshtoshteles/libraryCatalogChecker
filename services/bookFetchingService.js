const { mkdirSync, writeFileSync } = require("node:fs");
const path = require("node:path");
const { google } = require("googleapis");

const SPREADSHEET_ID = "1qpAjtltlI9-mqYyJ28xsMeJHZJLp-gBMk4dr56YIcnQ";
const outputPath = path.join(__dirname, "..", "test-data", "books.json");

async function fetchBooks() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, "..", "credentials.json"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1!A2:C355",
  });

  const books = (response.data.values ?? [])
    .filter((row) => typeof row[0] === "string" && row[0].trim())
    .map(([title, author = "", inRPL = ""]) => ({
      title: title.trim(),
      author: String(author).trim(),
      inRPL: String(inRPL).toLowerCase() === "true",
    }));

  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, JSON.stringify(books, null, 2));
  console.log(`Loaded ${books.length} books from the spreadsheet.`);
}

fetchBooks().catch((error) => {
  console.error("Could not load books from Google Sheets:", error);
  process.exitCode = 1;
});