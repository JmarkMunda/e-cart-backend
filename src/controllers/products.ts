import { Request, Response } from "express";
import { getAllProducts } from "../models/products";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = getAllProducts();
    return res
      .status(200)
      .json({ statusCode: 1, message: "Success", data: products });
  } catch (error) {
    return res.status(500).json({
      statusCode: 0,
      message: "Something went wrong",
      error: "Server Error",
    });
  }
};

export const getProductById = async () => {};

export const addProduct = async () => {};

export const editProduct = async () => {};

export const deleteProduct = async () => {};
