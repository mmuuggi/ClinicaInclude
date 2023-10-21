CREATE TABLE IF NOT EXISTS users(
    id SERIAL NOT NULL UNIQUE,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    cpf TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL,
    especialidade TEXT
);