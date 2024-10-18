import mongoose from "mongoose";
import Product from "../models/productModel.js";

// controller to get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// controller to create product
export const createProduct = async (req, res) => {
  const product = req.body; // user will send this data

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
};

// controller to update product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body; // user will be able to update the data

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

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
};

// controller to delete product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  //   console.log("id: ", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    await Product.findByIdAndDelete(id); // delete the product
    res.status(200).json({ success: true, message: "Product deleted" }); // send response
  } catch (err) {
    console.log("Error while deleting product", err);
    res.status(500).json({ success: false, message: "Internal Server Error" }); // send response
  }
};
