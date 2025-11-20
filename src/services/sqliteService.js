import { Capacitor } from "@capacitor/core";
import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";

const sqlite = new SQLiteConnection(CapacitorSQLite);

let db;
const DB_NAME = "budgy.db";

export const initDb = async () => {
  try {
    if (Capacitor.getPlatform() === "web") {
      db = await sqlite.createConnection(DB_NAME, false, "no-encryption", 1);
    } else {
      await sqlite.initWebStore(); // Web fallback
      db = await sqlite.createConnection(DB_NAME, false, "no-encryption", 1);
    }

    await db.open();

    // Create tables
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        balance REAL DEFAULT 0
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );
    `);

    await db.execute(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        date TEXT NOT NULL,
        categoryId INTEGER,
        accountFromId INTEGER,
        accountToId INTEGER,
        description TEXT,
        amount REAL,
        FOREIGN KEY(userId) REFERENCES users(id),
        FOREIGN KEY(categoryId) REFERENCES categories(id),
        FOREIGN KEY(accountFromId) REFERENCES accounts(id),
        FOREIGN KEY(accountToId) REFERENCES accounts(id)
      );
    `);

    console.log("SQLite (Capacitor) initialized!");
  } catch (err) {
    console.error("SQLite init failed:", err);
  }
};

// Execute query helper
const execute = async (sql, values = []) => {
  const res = await db.execute(sql, values);
  return res.values || [];
};

// Example CRUD functions
export const getUsers = async () => execute("SELECT * FROM users");
export const addUser = async (username) =>
  execute("INSERT INTO users (username) VALUES (?)", [username]);

export const getAccounts = async () => execute("SELECT * FROM accounts");
export const addAccount = async (name, balance = 0) =>
  execute("INSERT INTO accounts (name, balance) VALUES (?, ?)", [
    name,
    balance,
  ]);

export const getCategories = async () => execute("SELECT * FROM categories");
export const addCategory = async (name) =>
  execute("INSERT INTO categories (name) VALUES (?)", [name]);

export const getTransactions = async () =>
  execute(`SELECT t.*, c.name as categoryName, aFrom.name as accountFromName, aTo.name as accountToName
          FROM transactions t
          LEFT JOIN categories c ON t.categoryId = c.id
          LEFT JOIN accounts aFrom ON t.accountFromId = aFrom.id
          LEFT JOIN accounts aTo ON t.accountToId = aTo.id`);

export const getTransactionsByUserIds = async (userIds = []) => {
  if (userIds.length === 0) return [];
  const placeholders = userIds.map(() => "?").join(",");
  return execute(
    `SELECT t.*, c.name as categoryName, aFrom.name as accountFromName, aTo.name as accountToName
     FROM transactions t
     LEFT JOIN categories c ON t.categoryId = c.id
     LEFT JOIN accounts aFrom ON t.accountFromId = aFrom.id
     LEFT JOIN accounts aTo ON t.accountToId = aTo.id
     WHERE t.userId IN (${placeholders})`,
    userIds
  );
};

export const addTransaction = async ({
  userId,
  date,
  categoryId,
  accountFromId,
  accountToId,
  description,
  amount,
}) =>
  execute(
    `INSERT INTO transactions (userId, date, categoryId, accountFromId, accountToId, description, amount)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [userId, date, categoryId, accountFromId, accountToId, description, amount]
  );
