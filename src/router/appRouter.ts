import { Router } from "express";
import { authRouter } from "./authRouter";
import videoRouter from "./videoRouter";
import channelRouter from "./channelRouter";

export const appRouter = Router();

// Auth Router
appRouter.use("/auth", authRouter);
appRouter.use("/videos", videoRouter);
appRouter.use("/channels", channelRouter);

export default appRouter;
