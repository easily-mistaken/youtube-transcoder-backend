import { Router } from "express";
import {
  getVideoDetails,
  getVideoFeed,
  updateTimestamp,
  uploadVideo,
} from "../controllers/videoController";
import { authenticationMiddleware } from "../middlewares/authenticate";

const videoRouter = Router();

videoRouter.get("/feed", getVideoFeed);
videoRouter.get("/upload", authenticationMiddleware, uploadVideo);
videoRouter.get(":videoId", authenticationMiddleware, getVideoDetails);
videoRouter.put("/videoId/time", authenticationMiddleware, updateTimestamp);

export default videoRouter;
