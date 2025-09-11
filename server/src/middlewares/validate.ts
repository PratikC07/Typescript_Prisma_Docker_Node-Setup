import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodObject } from "zod";

export const validate = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("🔍 VALIDATION MIDDLEWARE:");
      console.log("  - req.method:", req.method);
      console.log("  - req.url:", req.url);
      console.log("  - req.params:", req.params);
      console.log("  - req.body:", req.body);
      console.log("  - req.query:", req.query);

      const dataToValidate = {
        body: req.body,
        query: req.query,
        params: req.params,
      };

      await schema.parseAsync(dataToValidate);

      return next();
    } catch (error) {
      console.log("  ❌ Validation failed:");
      if (error instanceof ZodError) {
        console.log("  - Zod validation errors:", error.issues);
        return res.status(400).json({
          status: "fail",
          errors: error.issues.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
      }
      console.log("  - Non-Zod error:", error);
      return next(error);
    }
  };
};
