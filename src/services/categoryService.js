import { getDB } from "../db/db";

export const getAllCategories = async () => {
  const db = getDB();
  const res = await db.query("SELECT * FROM categories;");
  return res.values; // array of categories
};

export const createCategory = async (category) => {
  const db = getDB();
  await db.run("INSERT INTO categories (name, type) VALUES (?, ?);", [
    category.name,
    category.type,
  ]);
};
