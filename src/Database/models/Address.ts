import { Schema, Document, model } from "mongoose";
import { Address } from "../../types/user.type";

export type IAddress = Document & Address;

const AddressSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    area: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IAddress>("Address", AddressSchema);
