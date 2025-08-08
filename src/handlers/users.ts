import { NextFunction, Request, Response } from "express-serve-static-core";
import { SignUpForm, User } from "../types/user.type";
import userModel from "../Database/models/User";
import addressModel from "../Database/models/Address";
import { BCRYPT_SALT_ROUNDS, JWT_SECRET } from "../envconfig";

export const handleGetUsers = async (req: Request, res: Response) => {
  const users = await userModel.find();
  res.status(200).json(users);
};

export const getUserByToken = async (
  req: Request & { body: { user: User } },
  res: Response
) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  const email = req.user.email;
  const user = await userModel.findOne({ email }, { hash: 0 }).lean();
  res.status(200).json(user);
};

export const validateUpdateField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) return res.status(401).json({ message: "Unauthorized" });
  const email = req.user.email;
  const { field, newValue } = req.body;
  const allowedUpdates = [
    "username",
    "city",
    "phoneNumber",
    "restaurant",
    "favouriteSpices",
  ];

  if (!allowedUpdates.includes(field)) {
    console.log("Invalid update:", field);
    return res.status(400).json({ message: "Invalid update" });
  } else {
    next();
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { field, newValue } = req.body;
  const email = req.user?.email;
  if (!email) {
    console.log("Unauthorized - bypassed validation. req.user:", req.user);
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const user = await userModel.findOne({ email }).lean();

    if (!user) {
      console.log("User not found during profile edit:", email);
      return res.status(404).json({ message: "User not found" });
    } else {
      const newUser = await userModel
        .findOneAndUpdate(
          { email },
          {
            [field]: newValue,
          },
          {
            new: true,
            runValidators: true,
          }
        )
        .lean();
      res.status(200).json(newUser);
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ message: "Invalid request", error });
  }
};
