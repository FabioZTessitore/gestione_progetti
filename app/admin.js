const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use( bodyParser.urlencoded({ extended: false }) );

module.exports = function (db) {
    
    router.get("/dipartimenti", function (req, res) {
        const sqlDipartimenti = "SELECT * FROM Dipartimenti ORDER BY nome;";
        db.all(sqlDipartimenti,function (err, dipartimenti) {
            res.render("admin-dipartimenti", {
                dipartimenti: dipartimenti
            });
        });
    });

    router.get("/impiegati", function(req, res) {
        const sqlImpiegato = "SELECT * FROM Impiegati ORDER BY cognome, nome;";
        db.all(sqlImpiegato, function(err, impiegati) {
            res.render("admin-impiegati", {
                impiegati: impiegati
            });
        });
    });

    router.get("/progetti", function (req, res) {
        const sqlprogetti = "SELECT * FROM Progetti ORDER BY nome;";
        db.all(sqlprogetti,function (err, progetti) {
            res.render("admin-progetti", {
                progetti: progetti
            });
        });
    });

    router.post("/dipartimenti", function (req, res) {
        const nome = req.body.nome;
        const sql = "INSERT INTO Dipartimenti (nome) VALUES (?);";
        db.run(sql, [nome], function (err) {
               res.redirect("/admin/dipartimenti");
        });
    });


    router.post("/impiegati", function (req, res) {
        const nome = req.body.nome;
        const cognome = req.body.cognome;
        const sql = "INSERT INTO Impiegati (cognome, nome) VALUES (?, ?);";
        db.run(sql, [cognome, nome], function (err) {
               res.redirect("/admin/impiegati");
        });
    });

    router.post("/progetti", function (req, res) {
        const nome = req.body.nome;
        const budjet = req.body.budjet;
        const sql = "INSERT INTO Progetti (nome, budjet) VALUES (?, ?);";
        db.run(sql, [nome, budjet], function (err) {
               res.redirect("/admin/progetti");
        });
    });

    router.get("/dipartimenti/:id", function (req, res) {
        const id = req.params.id;
        sqlDipartimento = "SELECT * FROM Dipartimenti WHERE id = ?;";
        sqlSedi = "SELECT * FROM Sedi;";
        sqlDipartimenti_Sedi = "SELECT D.nome, S.nome, I.indirizzo, I.citta FROM (((Dipartimenti D INNER JOIN Dipartimenti_Sedi Ds ON D.id = Ds.id_Dipartimenti) INNER JOIN Sedi S ON S.id = DS.id_Sedi) INNER JOIN Indirizzo I ON I.id_Sedi = S.id) WHERE D.id = ? ORDER BY S.nome;";
        db.get(sqlDipartimento, [id], function (err, dipartimento) {
            db.all(sqlSedi, function(err, sedi) {
                db.all(sqlDipartimenti_Sedi, [id], function(err, Dipartimenti_Sedi) {
                    res.render("admin-dipartimento", {
                        dipartimento: dipartimento,
                        sedi: sedi,
                        Dipartimenti_Sedi: Dipartimenti_Sedi
                   });
                });
            });
        });
    });

    router.get("/impiegati/:id", function (req, res) {
        const id = req.params.id;
        sqlImpiegato = "SELECT I.id Iid, I.cognome Icognome, I.nome Inome, D.nome Dnome, D.id Did FROM Impiegati I LEFT JOIN Dipartimenti D ON I.id_dipartimento = D.id WHERE I.id = ?;";
        sqlDipartimento = "SELECT * FROM Dipartimenti ORDER BY nome;";
        db.get(sqlImpiegato, [id], function (err, impiegato) {
            db.all(sqlDipartimento, function(err, dipartimenti) {
                res.render("admin-impiegato", {
                    impiegato: impiegato,
                    dipartimenti: dipartimenti,
                });
            });
       });
    });



    router.post("/impiegato/dipartimento", function (req, res) {
        sql = "UPDATE Impiegati SET id_dipartimento = ? WHERE id = ?;";
        db.run(sql, [req.body.dipartimento, req.body.id], function (err) {
            console.log(err);
            res.redirect("/admin/impiegati/"+req.body.id);
        });
    });

    router.get("/progetti/:id", function (req, res) {
        const id = req.params.id;
        sqlprogetto = "SELECT * FROM Progetti WHERE id = ?;";
        sqlimpiegati = "SELECT * FROM Impiegati;";
        sqlpartecipazione = "SELECT P.nome Progetto, I.nome N, I.cognome C FROM ((Progetti P INNER JOIN Partecipazione Par ON P.id = Par.id_progetto) INNER JOIN Impiegati I ON I.id = Par.id_impiegato) WHERE P.id = ? ORDER BY P.nome;";
        db.get(sqlprogetto, [id], function (err, progetto) {
            db.all(sqlimpiegati, function(err, impiegati) {
                db.all(sqlpartecipazione, [id], function(err, partecipazioni) {
                    res.render("admin-progetto", {
                        progetto: progetto,
                        impiegati: impiegati,
                        partecipazioni: partecipazioni
                   });
                });
            });
        });
    });
     

    router.post("/dipartimenti/sedi", function (req, res) {
        sql = "INSERT INTO Dipartimenti_Sedi (id_Dipartimenti, id_Sedi) VALUES (?,?);";
        db.run(sql, [req.body.dipId, req.body.sede], function (err) {
            res.redirect("/admin/dipartimenti/"+req.body.dipId);
        });
    });

    router.post("/dipartimenti/edit", function (req, res) {
        const sql = "UPDATE Dipartimenti SET nome = ? WHERE id = ?;";
        db.run(sql, [req.body.nome, req.body.id], function () {        
            res.redirect("/admin/dipartimenti");
        });
    });

    router.post("/impiegati/edit", function (req, res) {
        const sql = "UPDATE Impiegati SET cognome = ?, nome = ? WHERE id = ?;";
        db.run(sql, [req.body.cognome, req.body.nome, req.body.id], function (err) {
            res.redirect("/admin/impiegati");
        });
    });

    router.post("/progetti/edit", function (req, res) {
        const sql = "UPDATE Progetti SET nome = ?, budjet = ? WHERE id = ?;";
        db.run(sql, [req.body.nome, req.body.budjet, req.body.id], function (err) {
            res.redirect("/admin/progetti");
        });
    });

    router.post("/progetti/impiegati", function (req, res) {
        sql = "INSERT INTO Partecipazione (id_progetto, id_impiegato) VALUES (?,?);";
        db.run(sql, [req.body.nome, req.body.Impiegato], function (err) {
            res.redirect("/admin/progetti/"+req.body.nome);
        });
    });


    router.get("/dipartimenti/:id/sedi", function (req, res) {
        const dipId = req.params.id;
        const sql = "SELECT S.nome, I.indirizzo, I.cap, I.citta FROM (Sedi S INNER JOIN Indirizzo I ON S.id = I.id_sedi) ORDER BY S.nome;";
        db.all(sql, function(err, rows){
            res.render("admin-sedi", {
                sedi: rows,
                dipId: dipId,
            });
        });
    });

    router.post("/sedi", function(req, res){
        const nome = req.body.nome;
        const dipId = req.body.dipId;
        const sqlSedi = "INSERT INTO Sedi (nome) VALUES (?);";
        const sqlIndirizzo = "INSERT INTO Indirizzo (citta, indirizzo, cap, id_sedi) VALUES (?, ?, ?, ?);";
        db.run(sqlSedi, [nome], function (err) {
            const sede_id = this.lastID;            
            db.run(sqlIndirizzo, [req.body.citta, req.body.indirizzo, req.body.cap, sede_id], function(err){
                res.redirect("/admin/dipartimenti/"+dipId+"/sedi");
            });
        });
    });

    return router;
};
