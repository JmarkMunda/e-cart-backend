import { Request, Response } from "express";
import { findUserByEmailQuery } from "../models/user";
import { registerQuery } from "../models/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

const login = async (req: Request, res: Response) => {
  try {
    // Check if the account exist
    const { email, password } = req.body;
    const user = await findUserByEmailQuery(email);
    if (!user.length) {
      return res
        .status(400)
        .json({ statusCode: 0, message: "Account does not exist" });
    }

    // Validate the password
    const isValid = await bcrypt.compare(password, user[0].password);
    if (!isValid) {
      return res.status(400).json({ statusCode: 0, message: "Wrong password" });
    }

    // Generate a token
    const token = jwt.sign(
      { id: user[0].id },
      process.env.JWT_SECRET! || "secret",
      {
        expiresIn: "1h",
      }
    );
    res
      .status(200)
      .json({ statusCode: 1, message: "Logged In Successfully", token });
  } catch (error) {
    return res
      .status(500)
      .json({ statusCode: 0, message: "Something went wrong", error });
  }
};

export default { register, login };
