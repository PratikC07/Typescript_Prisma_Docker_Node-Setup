import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../../middlewares/isAuthenticated.js";
import { getUserProfile, updateUserProfile } from "./user.service.js";

export const getMyProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    const userProfile = await getUserProfile(userId!);
    res.status(200).json({
      status: "success",
      data: {
        userProfile,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ status: "fail", message: error.message });
    }
  }
};

export const updateMyProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.userId;
    const updatedUser = await updateUserProfile(userId, req.body);
    res.status(200).json({
      status: "success",
      data: {
        updatedUser,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ status: "fail", message: error.message });
    }
  }
};
