import { Schema, Document, model } from "mongoose";
import { User } from "../../types/user.type";

export type IUser = Document & User;

const UserSchema: Schema = new Schema(
  {
    // Example of referencing another schema type:
    // Suppose you have a ReviewSchema and want to reference it in ProductSchema
    // reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],

    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    city: { type: String, required: true },
    restaurant: String,
    address: [{ type: String }],
    favouriteSpices: [{ type: String }],
    history: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
