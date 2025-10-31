/**
 * Types of Middlewares we Used
     - Built In Middlewares : body-parser, cookie-parser, CORS
     - Security : Rate limitor, helmet
     - Logging middlewares
     - Validation Middlewares - Zod
     - Auth Middlewares - extract and verify Token
     - Error Handling Middleware
     
*/

/**
 * Request Parsing: express.json(), express.urlencoded();
 * Security: cors(), helmet()
 * Logging: Morgan
 * Validation: Zod
 * Authentication: jwt Token
 * Autorization: Role-based-access
 * RateLimiting Middleware
 * Error Handling:
 */

/**
 * Logger Middleware
 * src/utils/logger.ts
 */

import { Request, Response, NextFunction } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  // Calculate Start time
  const start = Date.now();
  // listen finish event
  res.on("finish", () => {
    // calculate a start - finish time
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${req.statusCode} ${ms},ms`);
  });

  next();
};




