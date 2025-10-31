/**
 * Validation Middleware Using ZOD
 *  - createUserSchema
 *  - validate - Zod validation schema middleware
 */
// import {Request, Response, NextFunction} from "express";
import { success, ZodObject } from "zod";

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      // Aggregate a body, params, and query
      const data = { body: req.body, params: req.params, query: req.query };
      schema.parse(data);

      next();
    } catch (error) {
      console.error("Unable to validate schema", error);
      return res.status(400).json({
        success: false,
        message: "Unable to validate Schema",
      });
    }
  };

import { z } from "zod";
import { Router } from "express";
import createUser from "./user.controller";

const createUserSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

// Route Usage Example
const router = Router();
router.post("/api/users", validate(createUserSchema), createUser);

