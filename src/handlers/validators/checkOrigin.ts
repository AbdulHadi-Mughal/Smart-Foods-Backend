// import { RequestHandler } from "express-serve-static-core";
import { CLIENT_URL } from "../../envconfig";

export const allowedOrigins: string[] =
  process.env.NODE_ENV === "development"
    ? ["http://192.168.0.193:5173"]
    : [...(CLIENT_URL ? [CLIENT_URL] : [])];

// export const checkOrigin: RequestHandler = (req, res, next) => {
//   const origin = req.headers.origin || "";
//   const referer = req.headers.referer || "";

//   // Check Origin first, fall back to Referer if needed
//   const isAllowed =
//     allowedOrigins.includes(origin) ||
//     allowedOrigins.some((o) => referer.startsWith(o));

//   if (!isAllowed) {
//     console.log(`Blocked request - Potential CSRF attack. Origin: ${origin}`);
//     return res.status(403).json({ error: "Access Denied" });
//   }
//   next();
// };
