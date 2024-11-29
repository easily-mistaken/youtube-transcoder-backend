import { Request, Response } from "express";
import { ZodError } from "zod";
import { signupSchema } from "../schemas/auth";

// User Registration
export const registerUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    // Validate request body using Zod
    const validateData = signupSchema.parse(req.body);

    const { email, password, username } = validateData;

    // Check if user or email already exists
    // const existingUser = await prisma.user.findFirst({
    //   where: {
    //     OR: [{ email }, { username }],
    //   },
    // });

    // if (existingUser) {
    //   res.sendStatus(409).json({ message: "Username or email already exists" });
    // }
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
