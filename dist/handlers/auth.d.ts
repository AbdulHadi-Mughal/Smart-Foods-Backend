import { NextFunction, Request, Response } from "express-serve-static-core";
import { SignUpForm } from "../types/user.type";
export declare const handleSignup: (req: Request<{}, {}, SignUpForm>, res: Response) => Promise<void>;
export declare const handleLogin: (req: Request<{}, {}, {
    email: string;
    password: string;
}>, res: Response) => Promise<void>;
export declare const handleLogout: (req: Request, res: Response) => void;
export declare const authorize: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>, number> | undefined;
