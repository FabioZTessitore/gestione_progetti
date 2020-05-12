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
        sql = "SELECT * FROM Impiegati WHERE id = ?;";
        db.get(sql, [id], function (err, impiegato) {
                    res.render("admin-impiegato", {
                        impiegato: impiegato,
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

    /*router.get("/sedi/:id", function(req, res) {
        const sedId = req.params.id;
        sqlSedi = "SELECT * FROM Sedi WHERE id = ?;";
        db.run(sqlSedi, [sedId], function(err) {
            res.render("admin-sedi_modifica", {
                sedi : sedi,
            });

        });

    });

    router.post("/sedi", function (req, res) {
        const sql = "UPDATE Indirizzo SET indirizzo = ?, citta = ?, cap = ? WHERE id_Sedi = ?;";
        db.run(sql, [req.body.indirizzo req.body.citta req.body.cap req.body.id_Sedi], function (err) {        
            res.redirect("/admin/dipartimenti/sedi");
        });
    });*/


    return router;
};
