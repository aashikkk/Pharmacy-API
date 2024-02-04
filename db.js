const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

// Create tables
db.serialize(() => {
  db.run(`
  CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname VARCHAR(255),
    username VARCHAR(50) UNIQUE,
    password VARCHAR(100),
    is_deleted INTEGER DEFAULT 0,
    role TEXT CHECK(role IN ('Manager', 'Owner', 'Cashier'))
  )
  `);

  db.run(`
  CREATE TABLE IF NOT EXISTS medication (
    med_id INTEGER PRIMARY KEY AUTOINCREMENT,
    med_name VARCHAR(100),
    description TEXT,
    quantity INTEGER,
    is_deleted INTEGER DEFAULT 0
  )
  `);

  db.run(`
  CREATE TABLE IF NOT EXISTS customers (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name VARCHAR(255),
    phone VARCHAR(20),
    nic VARCHAR(15) UNIQUE,
    is_deleted INTEGER DEFAULT 0
  )
  `);
});

module.exports = db;
