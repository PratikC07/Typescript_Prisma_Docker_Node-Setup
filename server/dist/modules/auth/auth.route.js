import { Router } from "express";
import { login, register } from "./auth.controller.js";
import { validate } from "../../middlewares/validate.js";
import { loginBodySchema, registerBodySchema } from "./auth.types.js";
const router = Router();
router.post("/register", validate(registerBodySchema), register);
router.post("/login", validate(loginBodySchema), login);
export default router;
