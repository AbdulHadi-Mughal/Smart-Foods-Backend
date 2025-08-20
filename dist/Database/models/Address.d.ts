import { Document } from "mongoose";
import { Address } from "../../types/user.type";
export type IAddress = Document & Address;
declare const _default: import("mongoose").Model<IAddress, {}, {}, {}, Document<unknown, {}, IAddress, {}, {}> & Document<unknown, any, any, Record<string, any>, {}> & Address & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
export default _default;
