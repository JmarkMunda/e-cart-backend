import { Request, Response } from "express";
import {
  addProductQuery,
  editProductQuery,
  getProductQuery,
  getProductsQuery,
} from "../models/products";
import { FiltersType } from "../utils/types";

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

const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await getProductQuery(id);
    return res.status(200).json({ statusCode: 1, message: "Success", data });
  } catch (error) {
    return res
      .status(500)
      .json({ statusCode: 0, message: "Something went wrong", error });
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    // Perform query
    const data = await addProductQuery(req.body);
    return res.status(201).json({ statusCode: 1, message: "Added", data });
  } catch (error) {
    return res.status(500).json({
      statusCode: 0,
      message: "Something went wrong",
      error,
    });
  }
};

const editProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Check if the product exist
    const product = await getProductQuery(id);
    if (!product.length) {
      return res
        .status(200)
        .json({ statusCode: 0, message: "Product does not exist" });
    }
    // Perform a query
    const data = await editProductQuery(id, req.body);
    return res.status(200).json({ statusCode: 1, message: "Success", data });
  } catch (error) {
    return res.status(500).json({
      statusCode: 0,
      message: "Something went wrong",
      error,
    });
  }
};

const deleteProduct = async () => {};

export default {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  deleteProduct,
};
