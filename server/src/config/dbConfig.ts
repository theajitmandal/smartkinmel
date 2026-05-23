import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const dbConnect = async (): Promise<void> => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    // console.log(connection);
    if (connection) console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default dbConnect;