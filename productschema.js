require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.log("Connection failed:", error);
  });

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    inStock: {type: Boolean, default: true}
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;