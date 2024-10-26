import { Request, Response } from "express";
import { findUserByEmailQuery } from "../models/user";
import {
  registerQuery,
  resetPasswordQuery,
  setTokenStatusQuery,
  storeResetTokenQuery,
  validateResetTokenQuery,
} from "../models/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { nanoid } from "nanoid";

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

// Request an email for the user then add resetToken to be used to reset the password
const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmailQuery(email);
    if (!user.length) {
      return res.status(404).json({
        statusCode: 0,
        message: "No user found with this email address",
      });
    }

    // GENERATE A TOKEN
    const token = nanoid();
    const expiry = new Date(Date.now() + 3600000).toISOString(); // 1hr

    // STORE IT IN THE DATABASE
    await storeResetTokenQuery(user[0].id, token, expiry);

    // Handle Sending Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jmmunda26@gmail.com",
        pass: "lezm wehb psbg fazv",
      },
    });
    const webResetLink = `${process.env.BASE_URL}/reset-password/${token}`;
    const mobileResetLink = "";
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      text: `We received a request to reset your password. To securely proceed, please select the appropriate link below based on your device:\n\n
    For web user: ${webResetLink}\n
    For mobile user: ${mobileResetLink}\n
    If you did not request this, please disregard this email.
    `,
    });
    return res.status(200).json({
      statusCode: 1,
      message: "Success! Reset password link has been sent",
    });
  } catch (error) {
    console.log("Forgot password", error);
    return res
      .status(500)
      .json({ statusCode: 0, message: "Something went wrong", error });
  }
};

// Handles resetting of password in the database
const resetPassword = async (req: Request, res: Response) => {
  try {
    const { resetToken, newPassword } = req.body;
    // Validate reset token
    const result = await validateResetTokenQuery(resetToken);
    if (result.length === 0)
      return res.status(400).json({ statusCode: 0, message: "Invalid token" });

    // Perform reset password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await resetPasswordQuery(result[0].user_id, hashedPassword);

    // Mark token as used
    await setTokenStatusQuery(resetToken);
    return res.status(200).json({
      statusCode: 1,
      message: "Password has been updated successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ statusCode: 0, message: "Something went wrong", error });
  }
};

export default { register, login, forgotPassword, resetPassword };
