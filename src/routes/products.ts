import productSchema from "../Database/models/Product";
import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductByName,
  updateProduct,
  validatePostRequest,
} from "../handlers/products";

const router = Router();

router.get("/", getAllProducts);

router.get("/:name", getProductByName);

router.post("/", validatePostRequest, createProduct);

router.put("/:id", validatePostRequest, updateProduct);

router.delete("/:name", deleteProduct);

export default router;
