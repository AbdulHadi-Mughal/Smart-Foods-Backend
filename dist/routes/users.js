"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../handlers/auth");
const users_1 = require("../handlers/users");
const sanitizers_1 = require("../handlers/validators/sanitizers");
const address_1 = require("../handlers/address");
const router = (0, express_1.Router)();
// Auth
router.post("/login", sanitizers_1.sanitizeBody, auth_1.handleLogin);
router.post("/signup", sanitizers_1.sanitizeBody, auth_1.handleSignup);
router.get("/authorize", sanitizers_1.sanitizeBody, auth_1.authorize);
// User Profile
router.get("/me", auth_1.authorize, users_1.getUserByToken);
router.put("/update", sanitizers_1.sanitizeBody, auth_1.authorize, users_1.validateUpdateField, users_1.updateUser);
// Address
router.get("/address", auth_1.authorize, address_1.getUserAddresses);
router.post("/address", auth_1.authorize, sanitizers_1.sanitizeBody, address_1.addAddress);
router.put("/address/:_id", auth_1.authorize, sanitizers_1.sanitizeBody, address_1.updateAddress);
router.delete("/address/:_id", auth_1.authorize, sanitizers_1.sanitizeBody, address_1.deleteAddress);
//router.put("/addField", authorize, validateUpdateField, addField);
exports.default = router;
