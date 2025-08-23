import { Router } from "express";
import {
  authorize,
  handleLogin,
  handleLogout,
  handleSignup,
} from "../handlers/auth";
import {
  getUserByToken,
  updateUser,
  validateUpdateField,
} from "../handlers/users";
import { sanitizeBody } from "../handlers/validators/sanitizers";
import {
  addAddress,
  deleteAddress,
  getUserAddresses,
  updateAddress,
} from "../handlers/address";

const router = Router();

// Auth
router.post("/signup", sanitizeBody, handleSignup);

router.post("/login", sanitizeBody, handleLogin);

router.delete("/logout", handleLogout);

router.get("/authorize", sanitizeBody, authorize);

// User Profile

router.get("/me", authorize, getUserByToken);

router.put("/update", sanitizeBody, authorize, validateUpdateField, updateUser);

// Address

router.get("/address", authorize, getUserAddresses);

router.post("/address", authorize, sanitizeBody, addAddress);

router.put("/address/:_id", authorize, sanitizeBody, updateAddress);

router.delete("/address/:_id", authorize, sanitizeBody, deleteAddress);

//router.put("/addField", authorize, validateUpdateField, addField);

export default router;
