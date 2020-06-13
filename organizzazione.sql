.header on
.mode column

DROP TABLE IF EXISTS Dipartimenti;
CREATE TABLE Dipartimenti
(
    id INTEGER PRIMARY KEY,
    nome TEXT
);

INSERT INTO Dipartimenti (nome) VALUES ("Dipartimento B");
INSERT INTO Dipartimenti (nome) VALUES ("Dipartimento C");
INSERT INTO Dipartimenti (nome) VALUES ("Dipartimento A");
INSERT INTO Dipartimenti (nome) VALUES ("Dipartimento D");
INSERT INTO Dipartimenti (nome) VALUES ("Dipartimento G");
INSERT INTO Dipartimenti (nome) VALUES ("Dipartimento H");
INSERT INTO Dipartimenti (nome) VALUES ("Dipartimento L");
INSERT INTO Dipartimenti (nome) VALUES ("Dipartimento M");

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
INSERT INTO Sedi (nome) VALUES ("Sede D");
INSERT INTO Sedi (nome) VALUES ("Sede U");
INSERT INTO Sedi (nome) VALUES ("Sede O");
INSERT INTO Sedi (nome) VALUES ("Sede P");
INSERT INTO Sedi (nome) VALUES ("Sede E");

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

DROP TABLE IF EXISTS Impiegati;
CREATE TABLE Impiegati
(
    id INTEGER PRIMARY KEY,
    cognome TEXT,
    nome TEXT,
    id_dipartimento INTEGER DEFAULT 0 REFERENCES Dipartimenti(id)
);

INSERT INTO Impiegati (cognome, nome, id_Dipartimento) VALUES ("Legnante", "Antonio", 1);
INSERT INTO Impiegati (cognome, nome, id_Dipartimento) VALUES ("Celardo", "Carlo", 1);
INSERT INTO Impiegati (cognome, nome, id_Dipartimento) VALUES ("Sorgiacomo", "Pasquale", 2);
INSERT INTO Impiegati (cognome, nome) VALUES ("Miele", "Francesco");

SELECT * FROM Impiegati;
select '';

SELECT I.cognome, D.nome FROM (Impiegati I INNER JOIN Dipartimenti D ON I.id_Dipartimento = D.id);
select '';
SELECT I.id Iid, I.cognome Icognome, I.nome Inome, D.nome Dnome, D.id Did FROM Impiegati I LEFT JOIN Dipartimenti D ON I.id_dipartimento = D.id WHERE I.id = 1;
select '';

SELECT * FROM Impiegati;

DROP TABLE IF EXISTS Progetti;
CREATE TABLE Progetti
(
    id INTEGER PRIMARY KEY,
    nome TEXT,
    budjet INTEGER
);

INSERT INTO Progetti (nome, budjet) VALUES ("Progetto 1", 100000);
INSERT INTO Progetti (nome, budjet) VALUES ("Progetto 2", 100000);
INSERT INTO Progetti (nome, budjet) VALUES ("Progetto 3", 100000);
INSERT INTO Progetti (nome, budjet) VALUES ("Progetto 4", 100000);
INSERT INTO Progetti (nome, budjet) VALUES ("Progetto 5", 100000);
INSERT INTO Progetti (nome, budjet) VALUES ("Progetto 6", 100000);


SELECT * FROM Progetti;

DROP TABLE IF EXISTS Partecipazione;
CREATE TABLE Partecipazione
(
    id INTEGER PRIMARY KEY,
    id_progetto INTEGER REFERENCES Progetti(id),
    id_impiegato INTEGER REFERENCES Impiegati(id)
);

INSERT INTO Partecipazione (id_progetto, id_impiegato) VALUES (1, 1);
INSERT INTO Partecipazione (id_progetto, id_impiegato) VALUES (1, 2);

SELECT P.nome, I.nome, I.cognome FROM ((Progetti P INNER JOIN Partecipazione Par ON P.id = Par.id_progetto) INNER JOIN Impiegati I ON I.id = Par.id_impiegato);

