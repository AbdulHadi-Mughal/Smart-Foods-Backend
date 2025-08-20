import { Request, Response } from "express-serve-static-core";
import { Spice } from "../types/Spice.type";
export declare const getAllProducts: (req: Request, res: Response) => Promise<void>;
export declare const getAllProductsSimple: (req: Request, res: Response) => Promise<void>;
export declare const getProductByName: (req: Request<{
    name: string;
}>, res: Response) => Promise<Response<any, Record<string, any>, number> | undefined>;
export declare const getProductsInBatch: (req: Request, res: Response) => Promise<Response<any, Record<string, any>, number> | undefined>;
export declare const createProduct: (req: Request<{}, {}, Spice>, res: Response) => Promise<void>;
export declare const validatePostRequest: (req: Request<{}, {}, Spice>, res: Response, next: Function) => Response<any, Record<string, any>, number> | undefined;
export declare const updateProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>, number> | undefined>;
export declare const deleteProduct: (req: Request<{
    name: string;
}>, res: Response) => Promise<Response<any, Record<string, any>, number> | undefined>;
