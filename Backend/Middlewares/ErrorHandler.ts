/**
 * Error Handler using asyncHandler and more things
 */

// AppError.ts
export class AppError extends Error {
  public statusCode: number;
  public success: boolean;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Error Middleware
// import {AppError} from "./AppError.ts"
import { Request, Response, NextFunction } from "express";

export const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  console.error(`❌ Error: ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
  });
};


// asyncHandler
export const asyncHandler = (fn: Function) => (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  Promise.resolve(fn(req, res, next)).catch(next);
}

// apiResponse.ts
export const apiResponse = (res: any, data: any=null, message="Success", statusCode=200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  })
}

// AuthController.ts
const users = [{ email: "user@test.com", password: "123456", id: "1" }];

import jwt from "jsonwebtoken";

export const login = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
  // take email password
  const {email, password} = req.body;

  if (!email || !password) {
    throw new AppError("Email and password is required", 400)
  }

  // find user and match password
  const user = users.find((it) => {
    it.email == email && it.password == password
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Generate jwt token
  const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"});


  apiResponse(res, )
})
