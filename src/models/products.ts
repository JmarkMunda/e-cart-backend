import pool from "../config/db";
import { ProductType } from "../utils/types";

export const getProductsQuery = async () => {
  const { rows } = await pool.query("SELECT * FROM products;");
  return rows;
};

export const addProductQuery = async ({
  name,
  description,
  price,
  stock,
}: ProductType) => {
  const { rows } = await pool.query(
    "INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *;",
    [name, description, price, stock]
  );
  return rows;
};
