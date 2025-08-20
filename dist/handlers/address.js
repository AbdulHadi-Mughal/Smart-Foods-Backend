"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddress = exports.updateAddress = exports.addAddress = exports.getAddressById = exports.getUserAddresses = void 0;
const User_1 = __importDefault(require("../Database/models/User"));
const Address_1 = __importDefault(require("../Database/models/Address"));
const addressValidator_1 = require("./validators/addressValidator");
const getUserAddresses = async (req, res) => {
    const email = req.user?.email;
    if (!email) {
        console.log("Unauthorized - bypassed validation. req.user:", req.user);
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const user = await User_1.default.findOne({ email }, { _id: 1 }).lean();
        if (!user) {
            console.log("User not found during profile edit:", email);
            return res.status(404).json({ message: "User not found" });
        }
        const addresses = await Address_1.default.find({ userId: user._id }).lean();
        res.status(200).json(addresses);
    }
    catch (error) {
        console.error("Error getting address:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getUserAddresses = getUserAddresses;
const getAddressById = async (req, res) => {
    const email = req.user?.email;
    if (!email) {
        console.log("Unauthorized - bypassed validation. req.user:", req.user);
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { _id } = req.params;
    try {
        const address = await Address_1.default.findById(_id).lean();
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }
        res.status(200).json(address);
    }
    catch (error) {
        console.error("Error getting address:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAddressById = getAddressById;
const addAddress = async (req, res) => {
    const email = req.user?.email;
    if (!email) {
        console.log("Unauthorized - bypassed validation. req.user:", req.user);
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            console.log("User not found during profile edit:", email);
            return res.status(404).json({ message: "User not found" });
        }
        const body = (0, addressValidator_1.validateAddress)(req.body);
        if (typeof body === "string") {
            return res.status(400).json({ message: body });
        }
        const { house_building, street_area, city, province, postalCode } = body;
        const address = await Address_1.default.create({
            house_building,
            street_area,
            city,
            province,
            postalCode,
            userId: user._id,
        });
        user.address.push(address._id);
        await user.save();
        res.status(201).json(address);
    }
    catch (error) {
        console.error("Error creating address:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.addAddress = addAddress;
const updateAddress = async (req, res) => {
    const email = req.user?.email;
    if (!email) {
        console.log("Unauthorized - bypassed validation. req.user:", req.user);
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            console.log("User not found during profile edit:", email);
            return res.status(404).json({ message: "User not found" });
        }
        const body = (0, addressValidator_1.validateAddress)(req.body);
        if (typeof body === "string") {
            return res.status(400).json({ message: body });
        }
        const { _id } = req.params;
        const address = await Address_1.default.findByIdAndUpdate(_id, { ...body, userId: user._id }, { new: true });
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }
        res.status(200).json(address);
    }
    catch (error) {
        console.error("Error updating address:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateAddress = updateAddress;
const deleteAddress = async (req, res) => {
    const email = req.user?.email;
    if (!email) {
        console.log("Unauthorized - bypassed validation. req.user:", req.user);
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            console.log("User not found during profile edit:", email);
            return res.status(404).json({ message: "User not found" });
        }
        const { _id } = req.params;
        const address = await Address_1.default.findByIdAndDelete(_id);
        user.address = user.address.filter((id) => id !== _id);
        await user.save();
        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }
        res.status(200).json(address);
    }
    catch (error) {
        console.error("Error deleting address:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.deleteAddress = deleteAddress;
