import { JwtPayload } from "jsonwebtoken";
declare module "express-serve-static-core" {
    interface Request {
        cookies: any & {
            AuthToken?: string | JwtPayload;
        };
        user?: {
            email: string | null;
        };
        safeQuery: Query;
    }
}
