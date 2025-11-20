import { getDB } from "../db/db";

export const getAllTransactions = async () => {
  const db = getDB();
  const res = await db.query(`
    SELECT t.id, t.amount, t.date, t.description,
           c.name AS categoryName, a.name AS accountName
    FROM transactions t
    LEFT JOIN categories c ON t.category_id = c.id
    LEFT JOIN accounts a ON t.account_id = a.id
    ORDER BY t.date DESC;
  `);
  return res.values;
};

export const createTransaction = async (transaction) => {
  const db = getDB();
  await db.run(
    "INSERT INTO transactions (account_id, category_id, amount, date, description) VALUES (?, ?, ?, ?, ?);",
    [
      transaction.account_id,
      transaction.category_id,
      transaction.amount,
      transaction.date,
      transaction.description
    ]
  );
};
