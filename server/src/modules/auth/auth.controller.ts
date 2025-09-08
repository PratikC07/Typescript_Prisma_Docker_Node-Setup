import type { NextFunction, Request, Response } from "express";
import type { LoginSchema, RegisterSchema } from "./auth.types.js";
import { loginUser, registerUser } from "./auth.service.js";

export const register = async (
  req: Request<{}, {}, RegisterSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await registerUser(req.body);

    res.status(201).json({
      status: "success",
      data: {
        ...response,
      },
    });
  } catch (error: any) {
    if (error.message.includes("already exists")) {
      return res
        .status(409)
        .json({ status: "fail", message: error.message as string });
    }
    next(error);
  }
};

export const login = async (
  req: Request<{}, {}, LoginSchema>,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await loginUser(req.body);

    res.status(200).json({
      status: "success",
      data: {
        ...response,
      },
    });
  } catch (error: any) {
    if (error.message.includes("Invalid email or password")) {
      return res
        .status(401)
        .json({ status: "fail", message: error.message as string });
    }
    next(error);
  }
};
