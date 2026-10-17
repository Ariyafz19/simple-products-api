const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.log("Connection failed:", error);
  });

const productSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: [3, "Too short"], maxlength: [99, "Too long"], trim: true},
    price: {type: Number, required: true, min: [1, "Price must be at least 1"]},
    category: {type: String, required: true, trim: true, enum: ["Electronics", "Video Games", "Books", "Glasses"]},
    inStock: {type: Boolean, default: true}
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;