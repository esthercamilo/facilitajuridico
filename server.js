const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'facilitajuridicodb',
  password: 'motiva',
  port: 5432,
});

app.use(express.json());
app.use(cors()); // Adiciona o middleware cors

app.get('/users', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM users');
  res.json(rows);
});

app.post('/users', async (req, res) => {
  const { name, email, telefone, coord_x, coord_y } = req.body;
  const { rows } = await pool.query('INSERT INTO users (name, email, telefone, coord_x, coord_y) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, email, telefone, coord_x, coord_y]);
  res.json(rows[0]);
});

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
  
      if (result.rowCount > 0) {
        res.json({ success: true, message: 'Usuário excluído com sucesso.' });
      } else {
        res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      res.status(500).json({ success: false, message: 'Erro interno do servidor.' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
