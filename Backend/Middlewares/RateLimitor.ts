/**
 * Rate Limitor Middleware
 */

import rateLimit from "express-rate-limit";
import express, { Request, Response, NextFunction} from "express";

// define basic rateLimitor
export const apiRateLimitor = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 50, // max allowed requests per user
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many requests from this Ip, address try again"
    },
    handler: (res: Request, req: Response, next:NextFunction, options) => {
        res.status(429).json({
            options.message
        })
    },
    skipFailedRequests: true,
});

// Usage in App.ts 
const app = express()
app.use(apiRateLimitor);