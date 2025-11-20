import { getDB } from "../db/db";

export const getAllAccounts = async () => {
  const db = getDB();
  const res = await db.query("SELECT * FROM accounts;");
  return res.values;
};

export const createAccount = async (account) => {
  const db = getDB();
  await db.run(
    "INSERT INTO accounts (name, balance) VALUES (?, ?);",
    [account.name, account.balance]
  );
};
