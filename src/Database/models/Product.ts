import mongoose, { Schema, Document } from "mongoose";
import { Spice } from "../../types/Spice.type";

export type IProduct = Document & Spice;

const ProductSchema: Schema = new Schema(
  {
    // Example of referencing another schema type:
    // Suppose you have a ReviewSchema and want to reference it in ProductSchema
    // reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],

    name: { type: String, required: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    weight: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    instruction: { type: String, required: true },
    inStock: { type: Boolean, default: true }, // Added inStock field
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
