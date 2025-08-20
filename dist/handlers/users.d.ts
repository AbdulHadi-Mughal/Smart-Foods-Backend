import { NextFunction, Request, Response } from "express-serve-static-core";
import { User } from "../types/user.type";
export declare const handleGetUsers: (req: Request, res: Response) => Promise<void>;
export declare const getUserByToken: (req: Request & {
    body: {
        user: User;
    };
}, res: Response) => Promise<Response<any, Record<string, any>, number> | undefined>;
export declare const validateUpdateField: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>, number> | undefined>;
export declare const updateUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>, number> | undefined>;
