import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { google } from "googleapis";
import path from "path";

// import the list of books to test against
// https://developers.google.com/workspace/sheets/api/guides/concepts
// https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit?gid=SHEET_ID#gid=SHEET_ID
// https://docs.google.com/spreadsheets/d/1qpAjtltlI9-mqYyJ28xsMeJHZJLp-gBMk4dr56YIcnQ/edit?gid=0#gid=0
const SPREADSHEET_ID = "1qpAjtltlI9-mqYyJ28xsMeJHZJLp-gBMk4dr56YIcnQ";
// SHEET_ID = 0

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "credentials.json"), // Path to your downloaded JSON key
  scopes: ["https://www.googleapis.com/auth/spreadsheets"], // Only Sheets scope needed
});

test("Connect and write to Google Sheet", async () => {
  const sheets = google.sheets({ version: "v4", auth });

  // Test reading a range (e.g. Sheet1!A1:B2)
  const getRes = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1!A1:B2",
  });

  console.log("Sheet Data:", getRes.data.values);
  expect(getRes.status).toBe(200);
});

// ****************************************************
// ****************************************************
// ****************************************************

// create book object (consider putting this in another file)
type Book = {
  title: string;
  // Add the fields needed to find/check a book.
};

// split all books into a list of book objects.
// consdier putting this in same file as sheet downloader utility
const books = JSON.parse(
  readFileSync(
    /* this is wrong, this won't be a readFS */
    new URL("../.test-data/books.json" /* import.meta.url */),
    "utf8",
  ),
) as Book[];

// actual tests.
for (const book of books) {
  test(`catalog contains: ${book.title}`, async ({ page }) => {
    await page.goto(
      // URL should already be the catalog search page with the search term pre-filled.
      // will make helper to build URL from title, possibly with Author
      "https://rcpl.ent.sirsi.net/client/en_US/default/search/results?te=#homerivers",
    );
    // determine availability

    // store availability
  });
}

// after all:
// write availability to sheet, confirming change
// tear down
