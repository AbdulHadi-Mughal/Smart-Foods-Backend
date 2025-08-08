import { Request, Response } from "express-serve-static-core";

import userModel from "../Database/models/User";
import addressModel from "../Database/models/Address";
import { validateAddress } from "./validators/addressValidator";
import { Address } from "src/types/user.type";

export const getUserAddresses = async (req: Request, res: Response) => {
  const email = req.user?.email;
  if (!email) {
    console.log("Unauthorized - bypassed validation. req.user:", req.user);
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const user = await userModel.findOne({ email }, { _id: 1 }).lean();

    if (!user) {
      console.log("User not found during profile edit:", email);
      return res.status(404).json({ message: "User not found" });
    }

    const addresses = await addressModel.find({ userId: user._id }).lean();
    res.status(200).json(addresses);
  } catch (error) {
    console.error("Error getting address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAddressById = async (req: Request, res: Response) => {
  const email = req.user?.email;
  if (!email) {
    console.log("Unauthorized - bypassed validation. req.user:", req.user);
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { _id } = req.params;
  try {
    const address = await addressModel.findById(_id).lean();
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json(address);
  } catch (error) {
    console.error("Error getting address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addAddress = async (
  req: Request<{}, {}, Address>,
  res: Response
) => {
  const email = req.user?.email;
  if (!email) {
    console.log("Unauthorized - bypassed validation. req.user:", req.user);
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("User not found during profile edit:", email);
      return res.status(404).json({ message: "User not found" });
    }

    const body = validateAddress(req.body);

    if (typeof body === "string") {
      return res.status(400).json({ message: body });
    }
    const { area, street, city, province, postalCode } = body;

    const address = await addressModel.create({
      area,
      street,
      city,
      province,
      postalCode,
      userId: user._id,
    });

    user.address.push(address._id);
    await user.save();

    res.status(201).json(address);
  } catch (error) {
    console.error("Error creating address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAddress = async (
  req: Request<{ _id: string }, {}, Address>,
  res: Response
) => {
  const email = req.user?.email;
  if (!email) {
    console.log("Unauthorized - bypassed validation. req.user:", req.user);
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("User not found during profile edit:", email);
      return res.status(404).json({ message: "User not found" });
    }

    const body = validateAddress(req.body);

    if (typeof body === "string") {
      return res.status(400).json({ message: body });
    }

    const { _id } = req.params;
    const address = await addressModel.findByIdAndUpdate(
      _id,
      { ...body, userId: user._id },
      { new: true }
    );

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json(address);
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
