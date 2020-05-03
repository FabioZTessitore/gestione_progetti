.header on
.mode column

DROP TABLE IF EXISTS Dipartimenti;
CREATE TABLE Dipartimenti
(
    id INTEGER PRIMARY KEY,
    nome TEXT
);

INSERT INTO Dipartimenti (nome) VALUES ("Dipartimento 1");
SELECT * FROM Dipartimenti;

DROP TABLE IF EXISTS Sedi;
CREATE TABLE Sedi
(
    id INTEGER PRIMARY KEY,
    nome TEXT
);

INSERT INTO Sedi (nome) VALUES ("Sede 1");
SELECT * FROM Sedi;