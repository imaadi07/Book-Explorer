const {Schema, model} = require("mongoose");

const bookSchema = new Schema({
  title: String,
  price: Number,
  stock: Boolean,
  rating: Number,
  detailUrl: String,
  thumbnailUrl: String
});

module.exports = model("Book", bookSchema);
