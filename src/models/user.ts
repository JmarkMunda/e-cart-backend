import pool from "../config/db";

export const findUserByIdQuery = async (id: string) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows;
};

export const findUserByEmailQuery = async (email: string) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows;
};
