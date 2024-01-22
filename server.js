const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'facilitajuridicodb',
  port: 5432,
});

app.use(express.json());
app.use(cors()); // Adiciona o middleware cors

app.get('/users', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM users');
  res.json(rows);
});

app.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const { rows } = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
  res.json(rows[0]);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
