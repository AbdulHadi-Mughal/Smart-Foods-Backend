import express from "express";

import productRoute from "./routes/products";
import userRoute from "./routes/users";

import connectToDatabase from "./Database/mongoose";

import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";

import mongoose from "mongoose";
import { JwtPayload } from "jsonwebtoken";
import { allowedOrigins, checkOrigin } from "./handlers/validators/checkOrigin";

import { sanitizeBody } from "./handlers/validators/sanitizers";

const app = express();
const port = (process.env.PORT || 3000) as number;

declare module "express-serve-static-core" {
  interface Request {
    cookies: any & {
      AuthToken?: string | JwtPayload;
    };
    user?: {
      email: string | null;
    };
    safeQuery: Query; // Add the safeQuery property to the Request interf
  }
}

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  credentials: true, // only works with specific origins, NOT "*"
};
app.use(cors(corsOptions));

if (process.env.NODE_ENV === "production") {
  app.use(checkOrigin);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// mongoose.set("strictQuery", true);
// mongoose.set("sanitizeFilter", true);

app.use(sanitizeBody);

app.get("/api/warmup", (req, res) => {
  res.send("Server is warm");
});

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

app.listen(
  port,
  process.env.NODE_ENV === "development" ? "192.168.0.193" : "0.0.0.0",
  () => {
    console.log("Server Started in " + process.env.NODE_ENV);
    connectToDatabase();
  }
);

// imagekit ID: vqu9cto3v
