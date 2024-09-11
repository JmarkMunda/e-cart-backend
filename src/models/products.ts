import pool from "../config/db";

export const getAllProducts = async () => {
  const { rows } = await pool.query("SELECT * FROM products");
  return rows;
};
