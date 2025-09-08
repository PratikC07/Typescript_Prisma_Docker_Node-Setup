import { loginUser, registerUser } from "./auth.service.js";
export const register = async (req, res, next) => {
    try {
        const response = await registerUser(req.body);
        res.status(201).json({
            status: "success",
            data: {
                ...response,
            },
        });
    }
    catch (error) {
        if (error.message.includes("already exists")) {
            return res
                .status(409)
                .json({ status: "fail", message: error.message });
        }
        next(error);
    }
};
export const login = async (req, res, next) => {
    try {
        const response = await loginUser(req.body);
        res.status(200).json({
            status: "success",
            data: {
                ...response,
            },
        });
    }
    catch (error) {
        if (error.message.includes("Invalid email or password")) {
            return res
                .status(401)
                .json({ status: "fail", message: error.message });
        }
        next(error);
    }
};
