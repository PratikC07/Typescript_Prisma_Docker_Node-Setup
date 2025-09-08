import { Router } from "express";
import authRouter from "./modules/auth/auth.route.js";
// Import other routers as you create them
// import pollRouter from "./polls/poll.route.js";

const router = Router();

router.use("/auth", authRouter);
// router.use("/polls", pollRouter);

export default router;
