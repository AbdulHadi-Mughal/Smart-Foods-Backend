import { Document } from "mongoose";
import { Order } from "../../types/user.type";
export type IOrder = Document & Order;
declare const _default: import("mongoose").Model<IOrder, {}, {}, {}, Document<unknown, {}, IOrder, {}, {}> & Document<unknown, any, any, Record<string, any>, {}> & Order & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
