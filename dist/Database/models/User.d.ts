import { Document } from "mongoose";
import { User } from "../../types/user.type";
export type IUser = Document & User;
declare const _default: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, {}> & Document<unknown, any, any, Record<string, any>, {}> & User & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
