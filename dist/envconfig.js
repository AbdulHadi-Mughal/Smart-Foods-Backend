"use strict";
// config.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENT_URL = exports.BCRYPT_SALT_ROUNDS = exports.PORT = exports.MONGO_URI = exports.JWT_SECRET = void 0;
if (process.env.NODE_ENV !== "production") {
    const { configDotenv } = require("dotenv");
    configDotenv();
}
function getEnvVar(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}
exports.JWT_SECRET = getEnvVar("JWT_SECRET");
exports.MONGO_URI = getEnvVar("MONGO_URI");
exports.PORT = Number(getEnvVar("PORT"));
//export const NODE_ENV = getEnvVar("NODE_ENV");
exports.BCRYPT_SALT_ROUNDS = Number(getEnvVar("BCRYPT_SALT_ROUNDS"));
exports.CLIENT_URL = getEnvVar("CLIENT_URL");
