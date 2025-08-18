import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProductsSimple,
  getProductByName,
  getProductsInBatch,
  updateProduct,
  validatePostRequest,
} from "../handlers/products";

const router = Router();

// GET Product

router.get("/", getAllProductsSimple);

router.get("/batch", getProductsInBatch);

router.get("/:name", getProductByName);

router.post("/", validatePostRequest, createProduct);

router.put("/:id", validatePostRequest, updateProduct);

router.delete("/:name", deleteProduct);

export default router;
