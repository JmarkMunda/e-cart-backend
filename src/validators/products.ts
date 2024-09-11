import { Request, Response } from "express";
import { body, validationResult } from "express-validator";

const addProducts = body(["name", "description", "price", "stock"])
  .notEmpty()
  .escape();

const checkValidationErrors = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ statusCode: 0, message: "Invalid", errors: errors.array() });
  }
};

export default { addProducts, checkValidationErrors };
