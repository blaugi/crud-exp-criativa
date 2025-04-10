USE crudexpcriativa;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    anoNascimento INT,
    endereco VARCHAR(255),
    genero VARCHAR(50),
    cpf VARCHAR(20) UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserindo dados de exemplo
INSERT INTO usuarios (nome, anoNascimento, endereco, genero, cpf, email)
VALUES
  ('Matheus Girardi', 1985, 'Rua A, 123', 'Masculino', '123.456.789-00', 'matheus.girardi@example.com'),
  ('Maria Oliveira', 1990, 'Av. B, 456', 'Feminino', '987.654.321-00', 'maria.oliveira@example.com'),
  ('Pedro Santos', 1975, 'Alameda C, 789', 'Masculino', '111.222.333-44', 'pedro.santos@example.com');