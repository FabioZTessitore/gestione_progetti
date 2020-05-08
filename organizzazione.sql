.header on
.mode column

DROP TABLE IF EXISTS Dipartimenti;
CREATE TABLE Dipartimenti
(
    id INTEGER PRIMARY KEY,
    nome TEXT
);

INSERT INTO Dipartimenti (nome) VALUES ("Dipartimento 1");
INSERT INTO Dipartimenti (nome) VALUES ("Dipartimento 2");
SELECT * FROM Dipartimenti;

DROP TABLE IF EXISTS Sedi;
CREATE TABLE Sedi
(
    id INTEGER PRIMARY KEY,
    nome TEXT
);

INSERT INTO Sedi (nome) VALUES ("Sede 1");
INSERT INTO Sedi (nome) VALUES ("Sede 2");
INSERT INTO Sedi (nome) VALUES ("Sede 3");
SELECT * FROM Sedi;

DROP TABLE IF EXISTS Dipartimenti_Sedi;
CREATE TABLE Dipartimenti_Sedi
(
    id_Dipartimenti INTEGER REFERENCES Dipartimenti(id),
    id_Sedi INTEGER REFERENCES Sedi(id)
);

INSERT INTO Dipartimenti_Sedi (id_Dipartimenti, id_Sedi) VALUES (1,1);
INSERT INTO Dipartimenti_Sedi (id_Dipartimenti, id_Sedi) VALUES (1,2);
INSERT INTO Dipartimenti_Sedi (id_Dipartimenti, id_Sedi) VALUES (2,3);
SELECT D.nome, S.nome FROM ((Dipartimenti D INNER JOIN Dipartimenti_Sedi Ds ON D.id = Ds.id_Dipartimenti) INNER JOIN Sedi S ON S.id = DS.id_Sedi) WHERE D.id = 1;