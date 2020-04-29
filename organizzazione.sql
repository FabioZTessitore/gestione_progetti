.header on
.mode column

DROP TABLE IF EXISTS Dipartimento;
CREATE TABLE Dipartimento
(
    id INTEGER PRIMARY KEY,
    nome TEXT
);

INSERT INTO Dipartimento (nome) VALUES ("diocane");
SELECT * FROM Dipartimento;