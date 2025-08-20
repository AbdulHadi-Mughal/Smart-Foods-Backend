"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("../handlers/products");
const router = (0, express_1.Router)();
// GET Product
router.get("/", products_1.getAllProductsSimple);
router.get("/batch", products_1.getProductsInBatch);
router.get("/:name", products_1.getProductByName);
router.post("/", products_1.validatePostRequest, products_1.createProduct);
router.put("/:id", products_1.validatePostRequest, products_1.updateProduct);
router.delete("/:name", products_1.deleteProduct);
exports.default = router;
