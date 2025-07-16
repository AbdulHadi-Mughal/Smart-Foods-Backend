import express from "express";
import productRoute from "./routes/products";
import mongoose from "mongoose";
import connectToDatabase from "./Database/mongoose";
import { configDotenv } from "dotenv";
configDotenv();

console.log(Date.now());

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/products", productRoute);

app.listen(port, () => {
  console.log("Server Started");
  connectToDatabase();
});

// imagekit ID: vqu9cto3v
