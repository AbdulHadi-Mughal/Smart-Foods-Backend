import productSchema from "../Database/productSchema";
import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  validateRequest,
} from "../handlers/products";

const router = Router();

router.get("/", getAllProducts);

router.get("/:id", getProductById);

router.post("/", validateRequest, createProduct);

export default router;
