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