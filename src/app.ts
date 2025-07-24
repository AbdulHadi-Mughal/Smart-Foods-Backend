import express from "express";
import productRoute from "./routes/products";
import mongoose from "mongoose";
import connectToDatabase from "./Database/mongoose";
import { configDotenv } from "dotenv";
import cors from "cors";
configDotenv();

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:5173", // Adjust this to your client URL
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  credentials: true, // Allow sending cookies and HTTP authentication credentials
};
app.use(cors());

app.use(express.json());

app.use("/api/products", productRoute);

app.listen(port, () => {
  console.log("Server Started");
  connectToDatabase();
});

// imagekit ID: vqu9cto3v
