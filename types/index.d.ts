import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      MONGO_URI: string;
      JWT_SECRET: string;
      NODE_ENV: "development" | "production";
      BCRYPT_SALT_ROUNDS: string; // ✅ ENV vars are always strings!
      CLIENT_URL: string;
    }
  }
}

declare module "express-serve-static-core" {
  interface Request {
    cookies: any & {
      AuthToken?: string | JwtPayload;
    };
    user?: {
      email: string | null;
    };
  }
}

export {}; // ✅ Needed to mark this file as a module
