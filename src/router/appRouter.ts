import { Router } from "express";
import { authRouter } from "./authRouter";

export const appRouter = Router();

appRouter.use("/auth", authRouter);

export default appRouter;
