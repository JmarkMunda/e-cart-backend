import { Request, Response } from "express";
import { findUserByEmailQuery } from "../models/user";
import { registerQuery } from "../models/auth";
import bcrypt from "bcrypt";

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, profile_picture, password } = req.body;
    // Check if user already exists
    const result = await findUserByEmailQuery(email);
    if (result.length) {
      return res
        .status(400)
        .json({ statusCode: 0, message: "User already exists" });
    }
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Perform a query
    const values = { name, profile_picture, email, password: hashedPassword };
    const data = await registerQuery(values);
    return res
      .status(201)
      .json({ statusCode: 1, message: "Account created", data });
  } catch (error) {
    return res
      .status(500)
      .json({ statusCode: 0, message: "Something went wrong", error });
  }
};

export default { register };
