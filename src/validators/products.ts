import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const addProduct = body(["name", "description", "price", "stock"])
  .notEmpty()
  .escape();

const editProduct = body(["name", "description", "price", "stock"])
  .notEmpty()
  .escape();

export default { addProduct, editProduct };
