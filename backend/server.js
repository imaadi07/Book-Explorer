const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
const dotenv = require("dotenv").config();
const connectDB = require("../backend/config/db");

const bookRoutes = require("./routes/books");
const scrapeBooks = require("../scraper/scraper/scraper");

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use("/api", bookRoutes);

cron.schedule("0 0 * * *", async () => {
  console.log("Running scheduled scraper...");
  try {
    await scrapeBooks();
  } catch (err) {
    console.error("Scheduled scraper failed:", err);
  }
});

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
