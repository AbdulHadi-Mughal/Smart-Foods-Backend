"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeBody = void 0;
const mongo_sanitize_1 = __importDefault(require("mongo-sanitize"));
const xss_1 = __importDefault(require("xss"));
const sanitizeRecursive = (obj) => {
    if (typeof obj !== "object" || obj === null) {
        // Only sanitize strings
        return typeof obj === "string" ? (0, mongo_sanitize_1.default)((0, xss_1.default)(obj)) : obj;
    }
    // Handle arrays
    if (Array.isArray(obj)) {
        return obj.map((item) => sanitizeRecursive(item));
    }
    // Handle objects
    const sanitizedObj = {};
    for (const key of Object.keys(obj)) {
        sanitizedObj[key] = sanitizeRecursive(obj[key]);
    }
    return sanitizedObj;
};
const sanitizeBody = (req, _res, next) => {
    req.body = sanitizeRecursive(req.body);
    req.safeQuery = sanitizeRecursive(req.query);
    req.params = sanitizeRecursive(req.params);
    next();
};
exports.sanitizeBody = sanitizeBody;
