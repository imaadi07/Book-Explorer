const axios = require("axios");
const cheerio = require("cheerio");
const connectDb = require("../config/db");
const Book = require("../models/Book");

async function scrapeBooks() {
  try {
    try {
      await connectDb();
      console.log("MongoDB connected!");
    } catch (err) {
      console.error("DB connection failed:", err);
    }

    let page = 1;
    let books = [];

    while (true) {
      const url = `https://books.toscrape.com/catalogue/page-${page}.html`;
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const items = $("article.product_pod");
      if (items.length === 0) break;

      items.each((i, el) => {
        const title = $(el).find("h3 a").attr("title");
        const price = $(el).find(".price_color").text();
        const stock = $(el).find(".availability").text().trim();
        const rating = $(el).find("p.star-rating").attr("class").split(" ")[1];
        const detailUrl = $(el).find("h3 a").attr("href");
        const thumbnail = $(el).find("img").attr("src");

        books.push({
          title,
          price,
          stock,
          rating,
          detailUrl: `https://books.toscrape.com/catalogue/${detailUrl}`,
          thumbnail: `https://books.toscrape.com/${thumbnail}`,
        });
      });

      page++;
    }
    await Book.deleteMany({});
    await Book.insertMany(books);
    console.log("Database refreshed successfully.");
    mongoose.disconnect();
  } catch (err) {
    console.error("Scraper failed:", err);
    throw err;
  }
}

module.exports = scrapeBooks;
