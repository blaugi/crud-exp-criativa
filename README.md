# CRUD Experiência Criativa

Este projeto é uma aplicação CRUD (Create, Read, Update, Delete) completa com frontend em React e backend em Node.js.

## Requisitos

- Node.js 
- MySQL
- NPM 

## Estrutura do Projeto

O projeto está dividido em duas partes principais:
- `/backend`: API REST em Node.js/Express
- `/frontend`: Interface de usuário em React com Vite

## Configuração do Banco de Dados

1. Acesse o MySQL e execute os comandos do arquivo `db.sql` para criar o banco de dados e a tabela:

```sql
CREATE DATABASE IF NOT EXISTS crudexpcriativa;
USE crudexpcriativa;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    anoNascimento INT,
    endereco VARCHAR(255),
    genero VARCHAR(50),
    cpf VARCHAR(20) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
2. Backend
     ```bash cd backend```
- Instale as dependências
     ```bash npm install```
- Altere o arquivo .env.test com suas informações do banco SQL e remova .test do nome
- Inicie o backend com:
  ```bash npm start```

3. Frontend
   ```bash cd ../frontend```
 - Instale as dependências
   ```bash npm install```
- Inicie o frontend com:
   ```bash npm run dev```

O aplicativo ficará dispoível em `http://localhost:5173`
