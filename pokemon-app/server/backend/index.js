const express = require('express');
const pool = require('./db');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const registerRouter = require('./auth/register');
const loginRouter = require('./auth/login');
const authMiddleware = require('./auth/middleware');

const app = express();
const port = 3000; // Ensure this port is different from 3306

app.use(cors());
app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.json({ limit: '50mb' })); // Increase the body size limit
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const db = mysql.createConnection({
  host: '34.28.128.58',
  user: 'khaled',
  password: 'Khaled0934443933',
  database: 'pokedex',
  port: 3306
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Use routers
app.use('/auth', registerRouter);
app.use('/auth', loginRouter);

app.get('/pokemon/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM pokemon WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Database query failed:', err);
      res.status(500).send({ error: err.message });
    } else {
      if (result.length > 0) {
        const pokemon = result[0];
        console.log('Sending data:', pokemon);
        res.json(pokemon);
      } else {
        res.status(404).send({ error: 'Pokemon not found' });
      }
    }
  });
});

app.post('/pokemon', (req, res) => {
  const { id, name, image, abilities, moves, weight, height, types, base_experience } = req.body;
  const sql = `INSERT INTO pokemon (id, name, image, abilities, moves, weight, height, types, base_experience)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    id,
    name,
    image,
    JSON.stringify(abilities),
    JSON.stringify(moves),
    weight,
    height,
    JSON.stringify(types),
    base_experience
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Insert query failed:', err);
      res.status(500).send(err);
    } else {
      console.log('Pokemon added:', result);
      res.status(201).send('Pokemon added successfully');
    }
  });
});

app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: `Hello user ${req.userId}, you have access to this route!` });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
