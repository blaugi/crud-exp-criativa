require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 9090;

app.use(cors());
app.use(express.json());

// Validação de dados do usuário
const validateUser = (user) => {
  const errors = [];
  if (!user.nome) errors.push('Nome é obrigatório');
  if (!user.email) errors.push('Email é obrigatório');
  if (user.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
    errors.push('Email inválido');
  }
  return errors;
};

// GET - Listar todos os usuários
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuários:', err);
      res.status(500).json({ erro: 'Erro ao buscar usuários' });
    } else {
      res.json(results);
    }
  });
});

// GET - Obter um usuário específico
app.get('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM usuarios WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      res.status(500).json({ erro: 'Erro ao buscar usuário' });
    } else if (results.length === 0) {
      res.status(404).json({ erro: 'Usuário não encontrado' });
    } else {
      res.json(results[0]);
    }
  });
});

// POST - Criar um novo usuário
app.post('/usuarios', (req, res) => {
  const usuario = req.body;
  const errors = validateUser(usuario);
  
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  
  db.query('INSERT INTO usuarios SET ?', usuario, (err, result) => {
    if (err) {
      console.error('Erro ao criar usuário:', err);
      res.status(500).json({ erro: 'Erro ao criar usuário' });
    } else {
      res.status(201).json({ 
        id: result.insertId,
        message: 'Usuário criado com sucesso' 
      });
    }
  });
});

// PUT - Atualizar um usuário existente
app.put('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  const usuario = req.body;
  const errors = validateUser(usuario);
  
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  
  db.query('UPDATE usuarios SET ? WHERE id = ?', [usuario, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar usuário:', err);
      res.status(500).json({ erro: 'Erro ao atualizar usuário' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ erro: 'Usuário não encontrado' });
    } else {
      res.json({ message: 'Usuário atualizado com sucesso' });
    }
  });
});

// DELETE - Remover um usuário
app.delete('/usuarios/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir usuário:', err);
      res.status(500).json({ erro: 'Erro ao excluir usuário' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ erro: 'Usuário não encontrado' });
    } else {
      res.json({ message: 'Usuário excluído com sucesso' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});