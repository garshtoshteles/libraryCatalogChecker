import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import path from "path";

class Book {
  constructor(
    public title: string,
    public author: string,
    public inRPL: boolean,
  ) {}
  getSearchURL(): string {
    const baseURL =
      "https://rcpl.ent.sirsi.net/client/en_US/default/search/results?qu=";
    return `${baseURL}${encodeURIComponent(this.title)}`;
  }
}

const books = (
  JSON.parse(
    readFileSync(path.join(__dirname, "..", "test-data", "books.json"), "utf8"),
  ) as { title: string; author: string; inRPL: boolean }[]
).map(({ title, author, inRPL }) => new Book(title, author, inRPL));

for (const book of books) {
  test(`Presence of ${book.title}`, async ({ page }) => {
    await page.goto(book.getSearchURL());
    await page.screenshot({ path: `screenshots/${book.title}.png` });
  });
}

// after all:
// write availability to sheet, confirming change
// tear down
