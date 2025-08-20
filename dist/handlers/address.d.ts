import { Request, Response } from "express-serve-static-core";
import { Address } from "src/types/user.type";
export declare const getUserAddresses: (req: Request, res: Response) => Promise<Response<any, Record<string, any>, number> | undefined>;
export declare const getAddressById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>, number> | undefined>;
export declare const addAddress: (req: Request<{}, {}, Address>, res: Response) => Promise<Response<any, Record<string, any>, number> | undefined>;
export declare const updateAddress: (req: Request<{
    _id: string;
}, {}, Address>, res: Response) => Promise<Response<any, Record<string, any>, number> | undefined>;
export declare const deleteAddress: (req: Request, res: Response) => Promise<Response<any, Record<string, any>, number> | undefined>;
