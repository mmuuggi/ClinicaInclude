CREATE TABLE IF NOT EXISTS consultas(
    id SERIAL NOT NULL UNIQUE PRIMARY KEY,
    email TEXT NOT NULL,
    nome_paciente TEXT NOT NULL,
    data_consulta TEXT NOT NULL,
    hora_consulta TEXT NOT NULL,
    nome_medico TEXT NOT NULL,
    especialidade TEXT NOT NULL,
    descricao_paciente TEXT,
    descricao_medico TEXT
)