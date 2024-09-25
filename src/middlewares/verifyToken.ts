import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const bearerToken = req.headers["authorization"];
  const token = bearerToken?.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ statusCode: 0, message: "Token not provided" });

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!); // will throw an error if invalid
    (req as any).user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ statusCode: 0, message: "Invalid token" });
  }
};

export default verifyToken;
