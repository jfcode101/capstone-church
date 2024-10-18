import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts); // get all products
router.post("/", createProduct); // add product to the db
router.put("/:id", updateProduct); // update product
router.delete("/:id", deleteProduct); // delete product from db

export default router;
