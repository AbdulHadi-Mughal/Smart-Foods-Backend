import { Schema, Document, model } from "mongoose";
import { Order, User } from "../../types/user.type";

export type IOrder = Document & Order;

const OrderSchema: Schema = new Schema(
  {
    // Example of referencing another schema type:
    // Suppose you have a ReviewSchema and want to reference it in ProductSchema
    // reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    userEmail: { type: String, required: true },
    orderedSpices: [
      {
        userID: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        spiceName: { type: String },
        weight: { type: Number },
        quantity: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

export default model<IOrder>("Order", OrderSchema);
