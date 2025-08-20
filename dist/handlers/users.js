"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.validateUpdateField = exports.getUserByToken = exports.handleGetUsers = void 0;
const User_1 = __importDefault(require("../Database/models/User"));
const handleGetUsers = async (req, res) => {
    const users = await User_1.default.find();
    res.status(200).json(users);
};
exports.handleGetUsers = handleGetUsers;
const getUserByToken = async (req, res) => {
    if (!req.user)
        return res.status(401).json({ message: "Unauthorized" });
    const email = req.user.email;
    const user = await User_1.default.findOne({ email }, { hash: 0 }).lean();
    res.status(200).json(user);
};
exports.getUserByToken = getUserByToken;
const validateUpdateField = async (req, res, next) => {
    if (!req.user)
        return res.status(401).json({ message: "Unauthorized" });
    const email = req.user.email;
    const { field, newValue } = req.body;
    const allowedUpdates = [
        "username",
        "city",
        "phoneNumber",
        "restaurant",
        "favouriteSpices",
    ];
    if (!allowedUpdates.includes(field)) {
        console.log("Invalid update:", field);
        return res.status(400).json({ message: "Invalid update" });
    }
    else {
        next();
    }
};
exports.validateUpdateField = validateUpdateField;
const updateUser = async (req, res) => {
    const { field, newValue } = req.body;
    const email = req.user?.email;
    if (!email) {
        console.log("Unauthorized - bypassed validation. req.user:", req.user);
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const user = await User_1.default.findOne({ email }).lean();
        if (!user) {
            console.log("User not found during profile edit:", email);
            return res.status(404).json({ message: "User not found" });
        }
        else {
            const newUser = await User_1.default
                .findOneAndUpdate({ email }, {
                [field]: newValue,
            }, {
                new: true,
                runValidators: true,
            })
                .lean();
            res.status(200).json(newUser);
        }
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(400).json({ message: "Invalid request", error });
    }
};
exports.updateUser = updateUser;
