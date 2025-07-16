import mongoose, { Schema, Document } from "mongoose";

export type IProduct = Document & {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  weight: number;
  price: number;
  category: string;
  instruction: string;
};

const ProductSchema: Schema = new Schema(
  {
    // Example of referencing another schema type:
    // Suppose you have a ReviewSchema and want to reference it in ProductSchema
    // reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],

    id: { type: Number },
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    weight: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    instruction: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
