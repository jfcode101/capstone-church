import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.CONNECT_URI);
    console.log(`MongoDB Connected to: ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1); //exit process with failure
  }
};
