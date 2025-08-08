import { Request, Response, NextFunction } from "express";
import sanitize from "mongo-sanitize";
import xss from "xss";

const sanitizeRecursive = (obj: any): any => {
  if (typeof obj !== "object" || obj === null) {
    // Only sanitize strings
    return typeof obj === "string" ? sanitize(xss(obj)) : obj;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeRecursive(item));
  }

  // Handle objects
  const sanitizedObj: any = {};
  for (const key of Object.keys(obj)) {
    sanitizedObj[key] = sanitizeRecursive(obj[key]);
  }
  return sanitizedObj;
};

export const sanitizeBody = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  req.body = sanitizeRecursive(req.body);
  req.safeQuery = sanitizeRecursive(req.query);
  req.params = sanitizeRecursive(req.params);
  next();
};
