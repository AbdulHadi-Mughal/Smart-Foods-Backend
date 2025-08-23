import { NextFunction, Request, Response } from "express-serve-static-core";
import { SignUpForm } from "../types/user.type";
import userModel from "../Database/models/User";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { BCRYPT_SALT_ROUNDS, CLIENT_URL, JWT_SECRET } from "../envconfig";
import { validateSignup } from "./validators/signupValidator";

//let CSRFtoken: string;

// export const generateCSRFToken = () => {
//   CSRFtoken = crypto.randomUUID();
// };

const isProd = process.env.NODE_ENV === "production";

const invalidCredentials = (res: Response, credentials: string) => {
  res.status(400).json({ message: credentials });
};

export const handleSignup = async (
  req: Request<{}, {}, SignUpForm>,
  res: Response
) => {
  const body = validateSignup(req.body);

  if (typeof body === "string") {
    invalidCredentials(res, body);
    return;
  }
  const { username, email, password, phoneNumber, city } = body;

  const existingUser = await userModel
    .findOne({
      $or: [{ email: email }, { username: username }],
    })
    .lean();

  if (existingUser) {
    res.status(400).json({ existingUser, message: "User already exists" });
    return;
  }

  try {
    const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    const user = await userModel.create({
      username,
      email,
      hash,
      phoneNumber,
      city,
    });

    const jwtCookie = jwt.sign({ email }, JWT_SECRET || "", {
      expiresIn: 1000 * 60 * 60 * 24 * 30,
    });

    res
      .status(201)
      .cookie("AuthToken", jwtCookie, {
        // Expose this cookie to subdomains
        domain: isProd
          ? "." + CLIENT_URL.replace("www.", "").split("/")[2]
          : undefined, // Replace with your actual domain in production
        httpOnly: isProd, // Always keep this true for security
        secure: isProd, // Only true in production (HTTPS)
        sameSite: "strict", // Must be "none" if frontend is on different origin *and* using HTTPS
        path: "/", // Always specify"
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      })
      .json({ message: "User created successfully", user });
  } catch (err) {
    console.log("Error during signup process:", err);
    res.status(500).json({
      message: "Internal server error",
      body: {
        username: username.toString().trim(),
        email: email.toString().toLowerCase().trim(),
        password: password.toString().trim(),
        phoneNumber: phoneNumber?.toString().trim(),
        city: city.toString().trim(),
      },
    });
  }
};

export const handleLogin = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response
) => {
  const Invalid = () =>
    res.status(400).json({ message: "Invalid email or password" });
  const { email, password } = req.body;

  if (!email || !password) {
    Invalid();
    return;
  }

  const prevUser = await userModel.findOne({ email });
  if (!prevUser) {
    Invalid();
    return;
  }
  const passwordMatch = await bcrypt.compare(
    password.trim(),
    prevUser?.hash || ""
  );

  if (!prevUser || !passwordMatch || !prevUser.email) {
    Invalid();
    return;
  }

  try {
    const jwtCookie = jwt.sign({ email }, JWT_SECRET || "");

    res
      .status(201)
      .cookie("AuthToken", jwtCookie, {
        domain: isProd
          ? `.${CLIENT_URL.replace("www.", "").split("/")[2]}`
          : undefined, // Replace with your actual domain in production
        httpOnly: isProd, // Always keep this true for security
        secure: isProd, // Only true in production (HTTPS)
        sameSite: "strict", // Must be "none" if frontend is on different origin *and* using HTTPS
        path: "/", // Always specify"
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      })
      .json({});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const handleLogout = (req: Request, res: Response) => {
  res
    .status(200)
    .clearCookie("AuthToken", {
      domain: isProd
        ? `.${CLIENT_URL.replace("www.", "").split("/")[2]}`
        : undefined, // Replace with your actual domain in production
      httpOnly: isProd, // Always keep this true for security
      secure: isProd, // Only true in production (HTTPS)
      sameSite: "strict", // Must be "none" if frontend is on different origin *and* using HTTPS
      path: "/", // Always specify"
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    })
    .json({ message: "Logout successful" });
};

export const authorize = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.AuthToken;

  // Early exit if missing
  if (!token || typeof token !== "string") {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  let decoded: JwtPayload | null = null;

  try {
    const result = jwt.verify(token, JWT_SECRET);
    if (result === null || typeof result === "string") {
      console.log("Invalid token:", token);
      // Rare case: valid but not an object payload
      return res.status(401).json({ message: "Invalid token" });
    }

    decoded = result as JwtPayload; // Safe to use as JwtPayload
  } catch (err) {
    // Handle unexpected errors
    if (err instanceof Error) {
      console.error(`Error verifying JWT token: ${err.message}`);
    }
    console.log("Error verifying JWT token:", token);
    return res.status(401).json({ message: "Invalid token" });
  }
  //  Type-safe and verified token
  if (decoded !== null && decoded.email) {
    req.user = { email: decoded.email };
    next();
  } else {
    console.log("Falling back to unauthorized:", req.cookies);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
