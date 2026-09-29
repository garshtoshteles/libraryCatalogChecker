import { readFileSync } from "node:fs";
import { test } from "@playwright/test";

// import the list of books to test against
// https://developers.google.com/workspace/sheets/api/guides/concepts

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
