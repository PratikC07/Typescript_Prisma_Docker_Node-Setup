import prisma from "../../lib/prisma.js";
import type { UpdateUserSchema } from "./user.types.js";

export const getUserProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      photoUrl: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const updateUserProfile = async (
  userId: string,
  data: UpdateUserSchema,
  file: Express.Multer.File | undefined
) => {
  const updateData: any = {};

  if (data.name !== undefined) {
    updateData.name = data.name;
  }
  if (file !== undefined) {
    updateData.photoUrl = file.path;
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: updateData,
    select: {
      id: true,
      name: true,
      email: true,
      photoUrl: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!updatedUser) {
    throw new Error("Failed to update user profile");
  }

  return updatedUser;
};
