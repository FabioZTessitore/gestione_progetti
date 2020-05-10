.header on
.mode column

DROP TABLE IF EXISTS Dipartimenti;
CREATE TABLE Dipartimenti
(
    id INTEGER PRIMARY KEY,
    nome TEXT
);

INSERT INTO Dipartimenti (nome) VALUES ("Dipartimento B");
INSERT INTO Dipartimenti (nome) VALUES ("Dipartimento A");
SELECT * FROM Dipartimenti;
select '';

DROP TABLE IF EXISTS Sedi;
CREATE TABLE Sedi
(
    id INTEGER PRIMARY KEY,
    nome TEXT
);

INSERT INTO Sedi (nome) VALUES ("Sede B");
INSERT INTO Sedi (nome) VALUES ("Sede A");
INSERT INTO Sedi (nome) VALUES ("Sede C");
SELECT * FROM Sedi;
select '';

DROP TABLE IF EXISTS Dipartimenti_Sedi;
CREATE TABLE Dipartimenti_Sedi
(
    id_Dipartimenti INTEGER REFERENCES Dipartimenti(id),
    id_Sedi INTEGER REFERENCES Sedi(id)
);

INSERT INTO Dipartimenti_Sedi (id_Dipartimenti, id_Sedi) VALUES (1,1);
INSERT INTO Dipartimenti_Sedi (id_Dipartimenti, id_Sedi) VALUES (1,2);
INSERT INTO Dipartimenti_Sedi (id_Dipartimenti, id_Sedi) VALUES (1,3);
INSERT INTO Dipartimenti_Sedi (id_Dipartimenti, id_Sedi) VALUES (2,1);
INSERT INTO Dipartimenti_Sedi (id_Dipartimenti, id_Sedi) VALUES (2,3);

SELECT D.nome, S.nome FROM ((Dipartimenti D INNER JOIN Dipartimenti_Sedi Ds ON D.id = Ds.id_Dipartimenti) INNER JOIN Sedi S ON S.id = DS.id_Sedi) WHERE D.id = 1;
select '';

DROP TABLE IF EXISTS Indirizzo;
CREATE TABLE Indirizzo
(
    id INTEGER PRIMARY KEY,
    citta TEXT,
    indirizzo TEXT,
    cap TEXT,
    id_sedi INTEGER REFERENCES Sedi(id)
);

INSERT INTO Indirizzo (citta, indirizzo, cap, id_sedi) VALUES ("Cardito", "Via Napoli 5", "80024", 1);
INSERT INTO Indirizzo (citta, indirizzo, cap, id_sedi) VALUES ("non lo so", "Via Gattini", "80024 Gatto", 2);
INSERT INTO Indirizzo (citta, indirizzo, cap, id_sedi) VALUES ("non so", "Via non so", "800 non so", 3);

SELECT * FROM Indirizzo;
select '';

SELECT S.nome, I.indirizzo, I.citta FROM (Indirizzo I INNER JOIN Sedi S ON I.id_sedi = S.id);
select '';

SELECT D.nome, S.nome, I.indirizzo, I.citta FROM (((Dipartimenti D INNER JOIN Dipartimenti_Sedi Ds ON D.id = Ds.id_Dipartimenti) INNER JOIN Sedi S ON S.id = DS.id_Sedi) INNER JOIN Indirizzo I ON I.id_sedi = S.id) WHERE D.id = 1;
select '';
