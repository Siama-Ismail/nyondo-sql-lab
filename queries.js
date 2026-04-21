const Database = require('better-sqlite3');
const db = new Database('nyondo_stock.db');

// Query A: Get every column of every product
console.log("Query A:", db.prepare('SELECT * FROM products').all());

// Query B: Get only the name and price of all products
console.log("Query B:", db.prepare('SELECT name, price FROM products').all());

// Query C: Get full details of the product with id = 3
console.log("Query C:", db.prepare('SELECT * FROM products WHERE id = 3').all());

// Query D: Find all products whose name contains 'sheet'
console.log("Query D:", db.prepare("SELECT * FROM products WHERE name LIKE '%sheet%'").all());

// Query E: Get all products sorted by price, highest first
console.log("Query E:", db.prepare('SELECT * FROM products ORDER BY price DESC').all());

// Query F: Get only the 2 most expensive products
console.log("Query F:", db.prepare('SELECT * FROM products ORDER BY price DESC LIMIT 2').all());

// Query G: Update the price of Cement (id=1) to 38,000 then SELECT * to confirm
db.prepare('UPDATE products SET price = 38000 WHERE id = 1').run();
console.log("Query G:", db.prepare('SELECT * FROM products').all());
