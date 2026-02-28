import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const dburl = process.env.DATABASE_URL as string;

    if (!dburl) {
      throw new Error("DATABASE_URL is not defined in environment variables");
    }

    await mongoose.connect(dburl);

    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log("Database connection failed" + error);
    process.exit(1);
  }
};

export default dbConnect;
