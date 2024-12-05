import express from "express";
import cookieParser from "cookie-parser";
import { appRouter } from "./router/appRouter";
import { initRedis } from "./services/redis";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

initRedis();

app.get("/api/", appRouter);

app.listen(port, () => console.log("Server is listening on port: ", port));
