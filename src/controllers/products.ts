import { Request, Response } from "express";
import { addProductQuery, getProductsQuery } from "../models/products";
import { FiltersType } from "../utils/types";
import productValidators from "../validators/products";

const getProducts = async (req: Request, res: Response) => {
  try {
    const queryParams = req.query as unknown as FiltersType;
    const products = await getProductsQuery(queryParams);
    return res
      .status(200)
      .json({ statusCode: 1, message: "Success", data: products });
  } catch (error) {
    return res.status(500).json({
      statusCode: 0,
      message: "Something went wrong",
      error,
    });
  }
};

const getProductById = async () => {};

const addProduct = async (req: Request, res: Response) => {
  try {
    // Validate
    productValidators.checkValidationErrors(req, res);
    // Perform query
    const result = await addProductQuery(req.body);
    return res
      .status(201)
      .json({ statusCode: 1, message: "Added", data: result });
  } catch (error) {
    return res.status(500).json({
      statusCode: 0,
      message: "Something went wrong",
      error,
    });
  }
};

const editProduct = async () => {};

const deleteProduct = async () => {};

export default {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct,
};
