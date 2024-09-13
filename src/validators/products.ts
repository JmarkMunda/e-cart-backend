import { body, param } from "express-validator";

const addProduct = body(["name", "description", "price", "stock"])
  .notEmpty()
  .escape();

const editProduct = body(["name", "description", "price", "stock"])
  .notEmpty()
  .escape();

export default { addProduct, editProduct };
