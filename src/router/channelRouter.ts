import { Router } from "express";
import { authenticationMiddleware } from "../middlewares/authenticate";
import {
  createChannel,
  getChannelDetails,
} from "../controllers/channelController";

const channelRouter = Router();

channelRouter.post("/", authenticationMiddleware, createChannel);
channelRouter.get("/:slug", authenticationMiddleware, getChannelDetails);

export default channelRouter;
