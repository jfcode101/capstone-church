// bring in mongoose library for MongoDB object modeling
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // attempt to connect to the database
    await mongoose.connect(process.env.CONNECT_STRING);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // exit the process with a failure code
    process.exit(1);
  }
};

// Export the connectDB
export default connectDB;
