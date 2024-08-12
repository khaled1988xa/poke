const mysql = require('mysql2/promise');

// Create the connection pool
const pool = mysql.createPool({
  host: '34.28.128.58',
  user: 'khaled',
  password: 'Khaled0934443933',
  database: 'pokedex',
  port: 3306
});

module.exports = pool;
