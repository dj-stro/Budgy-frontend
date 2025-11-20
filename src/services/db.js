import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

// Create the main SQLite connection manager
const sqlite = new SQLiteConnection(CapacitorSQLite);

// Opens (or creates) the database and initializes tables
export async function initDB() {
  const db = await sqlite.createConnection(
    "budgydb",
    false,
    "no-encryption",
    1
  );
  await db.open();

  // Create all tables
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
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
      account_id INTEGER,
      category_id INTEGER,
      amount REAL NOT NULL,
      description TEXT,
      date TEXT NOT NULL,
      FOREIGN KEY (account_id) REFERENCES accounts(id),
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );
  `);

  return db;
}

// Utility: open the existing DB after first creation
export async function getDB() {
  return await sqlite.retrieveConnection("budgydb");
}
