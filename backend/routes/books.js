const express = require("express");
const router = express.Router();
const Book = require("../models/Books");
const scrapeBooks = require("../../scraper/scraper/scraper");

router.get("/books", async (req, res) => {
  try {
    const { page = 1, limit = 10, rating, minPrice, maxPrice, inStock, search } = req.query;

    const query = {};
    if (rating) query.rating = rating;
    if (inStock) query.stock = inStock === "true" ? /In stock/ : /Out of stock/;
    if (search) query.title = { $regex: search, $options: "i" };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = `£${minPrice}`;
      if (maxPrice) query.price.$lte = `£${maxPrice}`;
    }

    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const count = await Book.countDocuments(query);

    res.json({
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
      books,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

router.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch book" });
  }
});

router.post("/refresh", async (req, res) => {
  try {
    await scrapeBooks();
    res.json({ message: "Database refreshed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to refresh database" });
  }
});

module.exports = router;
