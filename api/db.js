const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'blog',
  password: 'Kelvin8907!'
});


module.exports = db;