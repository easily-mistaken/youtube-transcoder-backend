import { Router } from "express";
import {
  getVideoDetails,
  getVideoFeed,
  uploadVideo,
} from "../controllers/videoController";

const videoRouter = Router();

videoRouter.get("/feed", getVideoFeed);
videoRouter.get("/upload", uploadVideo);
videoRouter.get("/api/video/:video_id", getVideoDetails);

export default videoRouter;
