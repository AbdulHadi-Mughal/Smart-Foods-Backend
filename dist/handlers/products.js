"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.validatePostRequest = exports.createProduct = exports.getProductsInBatch = exports.getProductByName = exports.getAllProductsSimple = exports.getAllProducts = void 0;
const Product_1 = __importDefault(require("../Database/models/Product"));
const getAllProducts = async (req, res) => {
    try {
        const products = await Product_1.default.find().lean();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching products" });
    }
};
exports.getAllProducts = getAllProducts;
const getAllProductsSimple = async (req, res) => {
    try {
        const products = await Product_1.default
            .find({}, {
            name: 1,
            imageUrl: 1,
            weight: 1,
            price: 1,
            category: 1,
            shortDescription: 1,
            _id: 1,
        })
            .lean();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
};
exports.getAllProductsSimple = getAllProductsSimple;
const getProductByName = async (req, res) => {
    const { name } = req.params;
    try {
        const product = await Product_1.default
            .findOne({ name: name.replaceAll("-", " ") })
            .lean();
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching product", error });
    }
};
exports.getProductByName = getProductByName;
const getProductsInBatch = async (req, res) => {
    // Safely extract and validate `batch` query param
    const batchParam = req.safeQuery?.batch?.trim();
    if (!batchParam) {
        console.log("Missing batch parameter");
        return res.status(400).json({ error: "Missing 'batch' query parameter" });
    }
    // Convert batch string into array of names
    const batchArray = batchParam
        .replaceAll("-", " ")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    if (batchArray.length === 0) {
        return res.status(200).json({});
    }
    try {
        // Find all products that match any of the batch names
        const products = await Product_1.default
            .find({ name: { $in: batchArray } })
            .lean();
        if (products.length === 0) {
            console.log("No products found for batch");
            return res.status(400).json({ message: "No products found" });
        }
        res.status(200).json(products);
    }
    catch (error) {
        console.error("Error fetching batch products", error);
        res.status(500).json({ message: "Error fetching products" });
    }
};
exports.getProductsInBatch = getProductsInBatch;
const createProduct = async (req, res) => {
    try {
        const { name, description, imageUrl, price, category, instruction, weight, } = req.body;
        const id = Date.now();
        // Create and save the new product
        const newProduct = new Product_1.default({
            id,
            name,
            description,
            imageUrl,
            price,
            weight,
            category,
            instruction,
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.createProduct = createProduct;
const validatePostRequest = (req, res, next) => {
    const { name, description, imageUrl, price, category, instruction, weight } = req.body;
    // Basic type and presence checks
    if (!name ||
        !description ||
        !imageUrl ||
        !price ||
        !category ||
        !instruction ||
        !weight) {
        return res.status(400).json({ message: "All fields are required." });
    }
    // Description length and price validation
    if (description.length < 10 || typeof price !== "number" || price <= 0) {
        return res.status(400).json({ message: "Invalid description or price." });
    }
    next();
};
exports.validatePostRequest = validatePostRequest;
const updateProduct = async (req, res) => {
    const { name, shortDescription } = req.body;
    // Add shortDescription property to the update payload
    if (!shortDescription ||
        typeof shortDescription !== "string" ||
        shortDescription.length < 5) {
        return res
            .status(400)
            .json({ message: "Invalid or missing shortDescription." });
    }
    try {
        const updatedProduct = await Product_1.default.findOneAndUpdate({ name }, { $set: { shortDescription } }, { new: true, runValidators: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    const { name } = req.params;
    try {
        const deletedProduct = await Product_1.default.findOneAndDelete({ name });
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
};
exports.deleteProduct = deleteProduct;
