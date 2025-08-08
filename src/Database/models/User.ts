import { Schema, Document, model } from "mongoose";
import { User } from "../../types/user.type";
import { required } from "zod/v4/core/util.cjs";

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
    phoneNumber: { type: String, required: false },
    restaurant: { type: String, required: false },
    address: [{ type: Schema.Types.ObjectId, ref: "Address", default: [] }],
    favouriteSpices: [{ type: String, default: [] }],
    history: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    _id: { type: Schema.Types.ObjectId, auto: true },
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
