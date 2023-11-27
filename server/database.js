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
    password TEXT,
    companyName TEXT,
    companyDescription TEXT,
    companyCategory TEXT
  );
`);

  await db.exec(`
  CREATE TABLE IF NOT EXISTS Cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    productId INTEGER,
    FOREIGN KEY(userId) REFERENCES Users(id),
    FOREIGN KEY(productId) REFERENCES Product(id)
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
  return db.get("SELECT id, email, companyName, companyDescription, companyCategory FROM Users WHERE id = ?", id);
}

async function updateProfile(userId, companyName, companyDescription, companyCategory) {
  const db = await openDb();
  await db.run(
    `UPDATE Users
     SET companyName = ?, companyDescription = ?, companyCategory = ?
     WHERE id = ?`,
    companyName,
    companyDescription,
    companyCategory,
    userId
  );
  return getUser(userId);
}

async function addToCart(userId, productId) {
  const db = await openDb();
  const result = await db.run(
    `
    INSERT INTO Cart (userId, productId)
    VALUES (?, ?)`,
    userId,
    productId
  );
  const cartId = result.lastID;
  return getCartItem(cartId);
}

async function getCartItem(cartId) {
  const db = await openDb();
  return db.get("SELECT * FROM Cart WHERE id = ?", cartId);
}

async function getCartItemsByUserId(userId) {
  const db = await openDb();
  const query = `
    SELECT p.id, p.title, p.description, p.price
    FROM Cart c
    JOIN Product p ON c.productId = p.id
    WHERE c.userId = ?
  `;
  const products = await db.all(query, userId);
  return products;
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
  updateProfile,
  addToCart,
  getCartItemsByUserId,
  getProducts,
  getProduct,
};
