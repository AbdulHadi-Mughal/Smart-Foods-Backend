// config.ts
import { configDotenv } from "dotenv";

if (process.env.NODE_ENV !== "production") {
  configDotenv();
}

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const JWT_SECRET = getEnvVar("JWT_SECRET");
export const MONGO_URI = getEnvVar("MONGO_URI");
export const PORT = Number(getEnvVar("PORT"));
//export const NODE_ENV = getEnvVar("NODE_ENV");
export const BCRYPT_SALT_ROUNDS = Number(getEnvVar("BCRYPT_SALT_ROUNDS"));
export const CLIENT_URL = getEnvVar("CLIENT_URL");
