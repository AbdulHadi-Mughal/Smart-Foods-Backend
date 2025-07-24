import { Request, Response } from "express-serve-static-core";
import productSchema from "../Database/models/Product";
import { Spice, SpiceCardInfo } from "../types/Spice.type";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productSchema.find().lean();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getAllProductsSimple = async (req: Request, res: Response) => {
  try {
    const products: SpiceCardInfo[] = await productSchema
      .find(
        {},
        {
          id: 1,
          name: 1,
          imageUrl: 1,
          weight: 1,
          price: 1,
          category: 1,
          shortDescription: 1,
          _id: 0, // Exclude MongoDB's default _id field
        }
      )
      .lean();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

export const getProductByName = async (
  req: Request<{ name: string }>,
  res: Response
) => {
  const { name } = req.params;
  try {
    setTimeout(async () => {
      const product = await productSchema
        .findOne({ name: name.replaceAll("-", " ") })
        .lean();
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    }, 3000); // Simulate a delay for demonstration purposes
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
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

export const validatePostRequest = (
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

export const updateProduct = async (req: Request, res: Response) => {
  const { name, shortDescription } = req.body;
  // Add shortDescription property to the update payload
  if (
    !shortDescription ||
    typeof shortDescription !== "string" ||
    shortDescription.length < 5
  ) {
    return res
      .status(400)
      .json({ message: "Invalid or missing shortDescription." });
  }
  try {
    const updatedProduct = await productSchema.findOneAndUpdate(
      { name },
      { $set: { shortDescription } },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

export const deleteProduct = async (
  req: Request<{ name: string }>,
  res: Response
) => {
  const { name } = req.params;
  try {
    const deletedProduct = await productSchema.findOneAndDelete({ name });
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};
