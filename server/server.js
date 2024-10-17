import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json()); // accept json data in req.body
app.use("api/products", productRoutes); // product route

app.listen(PORT, () => {
  connectDB(); // connect to db
  console.log(`Server running on Port: ${PORT}.
To open in the browser Ctrl + right on this link http://localhost:${PORT}`);
});
