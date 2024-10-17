import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/productModel.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json()); // accep json data in req.body

app.post("api/products", async (req, res) => {
  const product = req.body; // user inputs this data

  if (
    !product.name ||
    !product.price ||
    !product.image ||
    !product.description
  ) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }
  // new product
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error" + err.message,
    });
  }
});

app.listen(PORT, () => {
  connectDB(); // connect to db
  console.log(`Server running on Port: ${PORT}.
To open in the browser Ctrl + right on this link http://localhost:${PORT}`);
});
