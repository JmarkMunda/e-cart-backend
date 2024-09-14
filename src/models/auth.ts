import pool from "../config/db";
import { UserType } from "../utils/types";

export const registerQuery = async (user: UserType) => {
  const { name, email, profile_picture, password } = user;
  const { rows } = await pool.query(
    "INSERT INTO users (name, email, profile_picture, password) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, email, profile_picture, password]
  );
  return rows;
};

export const loginQuery = async () => {};
