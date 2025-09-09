import { Router } from "express";
import authRouter from "./modules/auth/auth.route.js";
import userRouter from "./modules/user/user.routes.js";
// Import other routers as you create them
// import pollRouter from "./polls/poll.route.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
// router.use("/polls", pollRouter);

export default router;
