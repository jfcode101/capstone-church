// bring in requirements
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
// bring in user + post routes
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
// bring in the function that will make the connection to the database
import connectDB from "./config/db.js";

// dotenv
dotenv.config();

// create an instance of the app
const app = express();
app.use(cors);
app.use(express.json);

// database connection
mongoose
  .connect(process.env.CONNECT_STRING)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// use routes
app.use("/api/users", userRoutes);
app.use("/api/posts", authMiddleware, postRoutes); // protect post routes
app.use("/api/events", authMiddleware, eventRoutes); // Protect event routes

const PORT = process.env.PORT || 5050; // create port

// set up our server to listen to the port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // connect to the db
  connectDB;
});
