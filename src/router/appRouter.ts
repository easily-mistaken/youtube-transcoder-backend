import { Router } from "express";
import { authRouter } from "./authRouter";

export const appRouter = Router();

// Auth Router
appRouter.use("/auth", authRouter);

export default appRouter;
