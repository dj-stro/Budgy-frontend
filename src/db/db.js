import { CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';

let db;

export const initSchema = async () => {
  try {
    const sqlite = new CapacitorSQLite();
    db = await sqlite.createConnection({ database: "budgy_db", version: 1 });

    await db.open();

    // USERS table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY NOT NULL,
        username TEXT NOT NULL
      );
    `);

    // ACCOUNTS table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        balance REAL DEFAULT 0
      );
    `);

    // CATEGORIES table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        type TEXT NOT NULL
      );
    `);

    // TRANSACTIONS table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY NOT NULL,
        userId INTEGER NOT NULL,
        date TEXT NOT NULL,
        categoryId INTEGER,
        accountFromId INTEGER,
        accountToId INTEGER,
        description TEXT,
        amount REAL,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (categoryId) REFERENCES categories(id),
        FOREIGN KEY (accountFromId) REFERENCES accounts(id),
        FOREIGN KEY (accountToId) REFERENCES accounts(id)
      );
    `);

    // Insert default user if none exists
    const users = await db.query(`SELECT * FROM users;`);
    if (users.values.length === 0) {
      await db.run(`INSERT INTO users (username) VALUES (?);`, ["Default User"]);
    }

    console.log("SQLite DB initialized");

  } catch (err) {
    console.error("Failed to initialize SQLite:", err);
  }
};

export const getDb = () => db;
