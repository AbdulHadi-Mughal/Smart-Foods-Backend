import mongoose from "mongoose";

const connectToDatabase = async () => {
  const MONGO_URI =
    (await process.env.MONGO_URI) || "mongodb://localhost:27017/thesmartfoods";
  await mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => {
      console.error("MongoDB connection error:", error);
    });
};

export default connectToDatabase;
