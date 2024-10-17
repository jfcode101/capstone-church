import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/productModel.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json()); // accept json data in req.body

// get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    console.log("Error while fetching products", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

//  add product to the db
app.post("/api/products", async (req, res) => {
  const product = req.body; // user will send the data  in the body

  if (
    !product.name ||
    !product.price ||
    !product.image ||
    !product.description
  ) {
    return res.status(400).json({
      success: false,
      message: "Missing data, please check all fields.",
    });
  }
  //  new product
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (err) {
    console.log("Error while creating product", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// delete product from db
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  console.log("id: ", id);
  try {
    await Product.findByIdAndDelete(id); // delete the product
    res.status(200).json({ success: true, message: "Product deleted" }); // send response
  } catch (err) {
    console.log("Error while deleting product", err);
    res.status(404).json({ success: false, message: "Product not found" }); // send response
  }
});

app.listen(PORT, () => {
  connectDB(); // connect to db
  console.log(`Server running on Port: ${PORT}.
To open in the browser Ctrl + right on this link http://localhost:${PORT}`);
});
