import productSchema from "../Database/productSchema";
import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  validateRequest,
} from "../handlers/products";

const router = Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post("/", validateRequest, createProduct);

router.put("/", updateProduct);

export default router;
