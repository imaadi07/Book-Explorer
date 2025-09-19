const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const Book = require("../models/Book"); 
const connectDb = require("../config/db"); 

// Map ratings from text to number
const ratingMap = { One: 1, Two: 2, Three: 3, Four: 4, Five: 5 };

// Utility: fetch with retries
async function fetchWithRetry(url, retries = 3, delay = 500) {
  for (let i = 0; i < retries; i++) {
    try {
      return await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36'
        },
        timeout: 10000
      });
    } catch (err) {
      if (i === retries - 1) throw err;
      console.log(`Retrying ${url} (${i + 1})...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
}

async function scrapeBooks() {
  try {
    await connectDb();
    console.log("MongoDB connected.");

    let page = 1;
    let books = [];

    while (true) {
      const url = `https://books.toscrape.com/catalogue/page-${page}.html`;
      try {
        const { data } = await fetchWithRetry(url);
        const $ = cheerio.load(data);

        const items = $("article.product_pod");
        if (items.length === 0) break; // no more books

        console.log(`Scraping page ${page}, ${items.length} books found.`);

        items.each((i, el) => {
          const title = $(el).find("h3 a").attr("title");
          const price = parseFloat($(el).find(".price_color").text().replace("£", ""));
          const stock = $(el).find(".availability").text().trim().includes("In stock");
          const ratingText = $(el).find("p.star-rating").attr("class").split(" ")[1];
          const rating = ratingMap[ratingText] || 0;

          // Normalize URLs
          const detailUrl = new URL($(el).find("h3 a").attr("href"), 'https://books.toscrape.com/catalogue/').href;
          const thumbnailUrl = new URL($(el).find("img").attr("src"), 'https://books.toscrape.com/').href;

          books.push({ title, price, stock, rating, detailUrl, thumbnailUrl });
        });

        page++;

        // Optional polite delay between pages
        await new Promise(res => setTimeout(res, 200));
      } catch (err) {
        if (err.response && err.response.status === 404) {
          console.log("No more pages to scrape. Finished!");
          break;
        } else {
          console.error("Scraper failed on page", page, err.message);
          break;
        }
      }
    }

    // Clear old books and insert new
    await Book.deleteMany({});
    await Book.insertMany(books);

    console.log(`Scraping complete! ${books.length} books inserted.`);
  } catch (err) {
    console.error("Scraper failed:", err);
  } finally {
    mongoose.disconnect();
    console.log("MongoDB connection closed.");
  }
}

// Run the scraper
scrapeBooks();
