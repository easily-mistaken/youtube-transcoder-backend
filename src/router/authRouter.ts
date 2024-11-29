import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authControllers";

export const authRouter = Router();

// User Registyration Route
authRouter.post("/signup", registerUser);

// UserLogin Route
authRouter.post("/login", loginUser);
