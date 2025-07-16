import { Request, Response } from "express-serve-static-core";
import productSchema from "../Database/productSchema";
import { Spice } from "../types/Spice.type";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productSchema.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const product = await productSchema.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

export const createProduct = async (
  req: Request<{}, {}, Spice>,
  res: Response
) => {
  try {
    const {
      name,
      description,
      imageUrl,
      price,
      category,
      instruction,
      weight,
    } = req.body;

    const id: number = Date.now();

    // Create and save the new product
    const newProduct = new productSchema({
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
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const validateRequest = (
  req: Request<{}, {}, Spice>,
  res: Response,
  next: Function
) => {
  const { name, description, imageUrl, price, category, instruction, weight } =
    req.body;
  // Basic type and presence checks
  if (
    !name ||
    !description ||
    !imageUrl ||
    !price ||
    !category ||
    !instruction ||
    !weight
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Description length and price validation
  if (description.length < 10 || typeof price !== "number" || price <= 0) {
    return res.status(400).json({ message: "Invalid description or price." });
  }

  next();
};
