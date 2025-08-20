import mongoose, { Document } from "mongoose";
import { Spice } from "../../types/Spice.type";
export type IProduct = Document & Spice;
declare const _default: mongoose.Model<IProduct, {}, {}, {}, mongoose.Document<unknown, {}, IProduct, {}, {}> & mongoose.Document<unknown, any, any, Record<string, any>, {}> & Spice & Required<{
    _id: mongoose.FlattenMaps<unknown>;
}> & {
    __v: number;
}, any>;
export default _default;
