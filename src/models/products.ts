import pool from "../config/db";
import { FiltersType, ProductType } from "../utils/types";

// GET PRODUCTS
export const getProductsQuery = async (filters: FiltersType) => {
  const { min_price, max_price, sortBy, order } = filters;
  let query = "SELECT * FROM products WHERE 1=1";
  const queryParams: any[] = [];

  if (min_price) {
    queryParams.push(min_price);
    query += ` AND price >= $${queryParams.length}`;
  }
  if (max_price) {
    queryParams.push(max_price);
    query += ` AND price <= $${queryParams.length}`;
  }
  if (sortBy) {
    query += ` ORDER BY ${sortBy} ${order.toUpperCase()}`;
  }

  const { rows } = await pool.query(query, queryParams);
  return rows;
};

// ADD PRODUCT
export const addProductQuery = async ({
  name,
  description,
  price,
  stock,
}: ProductType) => {
  const { rows } = await pool.query(
    "INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, description, price, stock]
  );
  return rows;
};
