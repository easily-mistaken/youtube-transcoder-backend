import { Request, Response } from "express";
import { ZodError } from "zod";
import bcrypt from "bcrypt";

import { signupSchema } from "../schemas/auth";
import prisma from "../db/prisma";
import { saltRounds } from "../config/constants";
import { generateToken } from "../utils/helper";

// User Registration
export const registerUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    // Validate request body using Zod
    const validateData = signupSchema.parse(req.body);

    const { email, password, username } = validateData;

    // Check if user or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      res.sendStatus(409).json({ message: "Username or email already exists" });
      return;
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //Create New User
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });

    res.status(201).json({ message: "User successfully registered" });
    return;
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      console.error(error.errors || error.message);
      res.status(400).json({
        message: "Invalid Inputs",
        error: error.errors.map((error) => error.message),
      });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
    return;
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    // Validate request body using Zod
    const validateData = signupSchema.parse(req.body);

    const { email, password } = validateData;

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Check Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Generate JWT Token
    const token = generateToken(user);

    // Set JWT Token as HTTPonly Cookie
    res.cookie("access-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure flag in production
      sameSite: "strict",
    });

    res.status(200).json({
      access_token: token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
    return;
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      res
        .status(400)
        .json({ message: "Error during login", error: error.message });
    } else {
      res.status(500).json({
        message: "Error during login",
        error: "Intrenal Server Error",
      });
    }
    return;
  }
};
