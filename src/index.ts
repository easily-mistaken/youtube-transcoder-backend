import express from "express";
import cookieParser from "cookie-parser";
import { appRouter } from "./router/appRouter";
import { initRedis } from "./services/redis";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

// Middlewares
app.use(limiter);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Initialize Redis Client
initRedis();

// App Router
app.get("/api", appRouter);

app.listen(port, () => console.log("Server is listening on port: ", port));
