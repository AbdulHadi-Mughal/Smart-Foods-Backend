"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOrigin = exports.allowedOrigins = void 0;
const envconfig_1 = require("../../envconfig");
exports.allowedOrigins = process.env.NODE_ENV === "development"
    ? ["http://192.168.0.193:5173"]
    : [...(envconfig_1.CLIENT_URL ? [envconfig_1.CLIENT_URL] : [])];
const checkOrigin = (req, res, next) => {
    const origin = req.headers.origin || "";
    const referer = req.headers.referer || "";
    // Check Origin first, fall back to Referer if needed
    const isAllowed = exports.allowedOrigins.includes(origin) ||
        exports.allowedOrigins.some((o) => referer.startsWith(o));
    if (!isAllowed) {
        console.log(`Blocked request - Potential CSRF attack. Origin: ${origin}`);
        return res.status(403).json({ error: "Access Denied" });
    }
    next();
};
exports.checkOrigin = checkOrigin;
