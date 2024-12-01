import { Router } from "express";
import { authRouter } from "./authRouter";
import videoRouter from "./videoRouter";

export const appRouter = Router();

// Auth Router
appRouter.use("/auth", authRouter);
appRouter.use("/videos", videoRouter);

export default appRouter;
