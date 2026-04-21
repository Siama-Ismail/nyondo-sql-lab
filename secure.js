const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

// Secure search function using parameters
function searchProduct(name) {
  const stmt = db.prepare('SELECT * FROM products WHERE name LIKE ?');
  return stmt.all(`%${name}%`);
}

// Secure login function using parameters
function login(username, password) {
  const stmt = db.prepare('SELECT * FROM users WHERE username = ? AND password = ?');
  return stmt.all(username, password);
}

// Test: normal login
console.log("Secure Login (alice):", login("alice", "password123"));

// Test: injection attempt should fail
console.log("Injection attempt:", login("alice", "' OR '1'='1"));

// Test: safe search
console.log("Secure Search:", searchProduct("sheet"));

// Test: injection attempt should fail
console.log("Injection attempt search:", searchProduct("' OR '1'='1"));
