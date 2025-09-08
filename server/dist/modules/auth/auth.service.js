import bcrypt from "bcryptjs";
import prisma from "../../lib/prisma.js";
import jwt from "jsonwebtoken";
export const registerUser = async (input) => {
    const { email, password, name } = input;
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new Error("User with this email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });
    const accessToken = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    const { password: _, ...userWithoutPassword } = newUser;
    return {
        token: accessToken,
        user: userWithoutPassword,
    };
};
export const loginUser = async (input) => {
    const { email, password } = input;
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error("Invalid email or password");
    }
    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    const { password: _, ...userWithoutPassword } = user;
    return {
        token: accessToken,
        user: userWithoutPassword,
    };
};
