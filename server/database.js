const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const predefinedProducts = [
  {
    title: "Package 1",
    description: "Desc",
    price: 100.0,
  },
  {
    title: "Package 2",
    description: "Desc",
    price: 200.0,
  },
];

async function openDb() {
  return open({
    filename: "./mydb.sqlite",
    driver: sqlite3.Database,
  });
}

async function initializeDb() {
  const db = await openDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS Product (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      price REAL
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
    );
  `);

  for (const product of predefinedProducts) {
    await db.run("INSERT INTO Product (title, description, price) VALUES (?, ?, ?)", [
      product.title,
      product.description,
      product.price,
    ]);
  }
}

async function addUser(email, hashedPassword) {
  const db = await openDb();
  const result = await db.run("INSERT INTO Users (email, password) VALUES (?, ?)", [email, hashedPassword]);
  return getUser(result.lastID);
}

async function findUserByEmail(email) {
  const db = await openDb();
  return db.get("SELECT * FROM Users WHERE email = ?", email);
}

async function getUser(id) {
  const db = await openDb();
  return db.get("SELECT id, email FROM Users WHERE id = ?", id);
}

async function getProducts() {
  const db = await openDb();
  return db.all("SELECT * FROM Product");
}

async function getProduct(id) {
  const db = await openDb();
  return db.get("SELECT * FROM Product WHERE id = ?", id);
}

module.exports = {
  initializeDb,
  addUser,
  findUserByEmail,
  getProducts,
  getProduct,
};
