import express from "express";
import mongoose from "mongoose";
import Product from "../models/productModel.js";

const router = express.Router();

// get all products
router.get("/", async (req, res) => {
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
router.post("/", async (req, res) => {
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

// update product
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body; // user will be able to update the data
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({
  //     success: false,
  //     message: "No product with that id",
  //   });
  // }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (err) {
    console.log("Error while updating product", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// delete product from db
router.delete("/:id", async (req, res) => {
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

router.get("/", (req, res) => {
  res.send("Product Route");
});



export default router;