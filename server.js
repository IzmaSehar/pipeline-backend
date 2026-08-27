const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: 'root',
  password: process.env.DB_PASSWORD || 'mypassword123',
  database: process.env.DB_NAME || 'testdb'
});

app.get('/', (req, res) => {
  pool.query('SHOW DATABASES', (err, rows) => {
    if (err) return res.send('Database Error: ' + err.message);
    res.send('Connected to MySQL! Databases: ' + rows.map(r => r.Database).join(', '));
  });
});

app.listen(5000, () => console.log('Backend listening on port 5000'));
