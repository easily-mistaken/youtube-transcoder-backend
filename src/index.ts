import express from "express";
import cookieParser from "cookie-parser";
import { appRouter } from "./router/appRouter";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.get("/api/", appRouter);

app.listen(port, () => console.log("Server is listening on port: ", port));
