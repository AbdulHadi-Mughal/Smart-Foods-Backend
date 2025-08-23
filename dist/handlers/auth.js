"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.handleLogout = exports.handleLogin = exports.handleSignup = void 0;
const User_1 = __importDefault(require("../Database/models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envconfig_1 = require("../envconfig");
const signupValidator_1 = require("./validators/signupValidator");
//let CSRFtoken: string;
// export const generateCSRFToken = () => {
//   CSRFtoken = crypto.randomUUID();
// };
const isProd = process.env.NODE_ENV === "production";
const invalidCredentials = (res, credentials) => {
    res.status(400).json({ message: credentials });
};
const handleSignup = async (req, res) => {
    const body = (0, signupValidator_1.validateSignup)(req.body);
    if (typeof body === "string") {
        invalidCredentials(res, body);
        return;
    }
    const { username, email, password, phoneNumber, city } = body;
    const existingUser = await User_1.default
        .findOne({
        $or: [{ email: email }, { username: username }],
    })
        .lean();
    if (existingUser) {
        res.status(400).json({ existingUser, message: "User already exists" });
        return;
    }
    try {
        const hash = await bcrypt_1.default.hash(password, envconfig_1.BCRYPT_SALT_ROUNDS);
        const user = await User_1.default.create({
            username,
            email,
            hash,
            phoneNumber,
            city,
        });
        const jwtCookie = jsonwebtoken_1.default.sign({ email }, envconfig_1.JWT_SECRET || "", {
            expiresIn: 1000 * 60 * 60 * 24 * 30,
        });
        res
            .status(201)
            .cookie("AuthToken", jwtCookie, {
            // Expose this cookie to subdomains
            domain: isProd
                ? "." + envconfig_1.CLIENT_URL.replace("www.", "").split("/")[2]
                : undefined, // Replace with your actual domain in production
            httpOnly: isProd, // Always keep this true for security
            secure: isProd, // Only true in production (HTTPS)
            sameSite: "strict", // Must be "none" if frontend is on different origin *and* using HTTPS
            path: "/", // Always specify"
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        })
            .json({ message: "User created successfully", user });
    }
    catch (err) {
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
exports.handleSignup = handleSignup;
const handleLogin = async (req, res) => {
    const Invalid = () => res.status(400).json({ message: "Invalid email or password" });
    const { email, password } = req.body;
    if (!email || !password) {
        Invalid();
        return;
    }
    const prevUser = await User_1.default.findOne({ email });
    if (!prevUser) {
        Invalid();
        return;
    }
    const passwordMatch = await bcrypt_1.default.compare(password.trim(), prevUser?.hash || "");
    if (!prevUser || !passwordMatch || !prevUser.email) {
        Invalid();
        return;
    }
    try {
        const jwtCookie = jsonwebtoken_1.default.sign({ email }, envconfig_1.JWT_SECRET || "");
        res
            .status(201)
            .cookie("AuthToken", jwtCookie, {
            domain: isProd
                ? `.${envconfig_1.CLIENT_URL.replace("www.", "").split("/")[2]}`
                : undefined, // Replace with your actual domain in production
            httpOnly: isProd, // Always keep this true for security
            secure: isProd, // Only true in production (HTTPS)
            sameSite: "strict", // Must be "none" if frontend is on different origin *and* using HTTPS
            path: "/", // Always specify"
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        })
            .json({});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.handleLogin = handleLogin;
const handleLogout = (req, res) => {
    res
        .status(200)
        .clearCookie("AuthToken", {
        domain: isProd
            ? `.${envconfig_1.CLIENT_URL.replace("www.", "").split("/")[2]}`
            : undefined, // Replace with your actual domain in production
        httpOnly: isProd, // Always keep this true for security
        secure: isProd, // Only true in production (HTTPS)
        sameSite: "strict", // Must be "none" if frontend is on different origin *and* using HTTPS
        path: "/", // Always specify"
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    })
        .json({ message: "Logout successful" });
};
exports.handleLogout = handleLogout;
const authorize = (req, res, next) => {
    const token = req.cookies?.AuthToken;
    // Early exit if missing
    if (!token || typeof token !== "string") {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    let decoded = null;
    try {
        const result = jsonwebtoken_1.default.verify(token, envconfig_1.JWT_SECRET);
        if (result === null || typeof result === "string") {
            console.log("Invalid token:", token);
            // Rare case: valid but not an object payload
            return res.status(401).json({ message: "Invalid token" });
        }
        decoded = result; // Safe to use as JwtPayload
    }
    catch (err) {
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
    }
    else {
        console.log("Falling back to unauthorized:", req.cookies);
        return res.status(401).json({ message: "Unauthorized" });
    }
};
exports.authorize = authorize;
