const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use( bodyParser.urlencoded({ extended: false }) );

module.exports = function (db) {
    
    router.get("/dipartimenti", function (req, res) {
        const sqlDipartimenti = "SELECT * FROM Dipartimenti;";
        db.all(sqlDipartimenti,function (err, dipartimenti) {
            res.render("admin-dipartimenti", {
                dipartimenti: dipartimenti
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

    router.get("/dipartimenti/:id", function (req, res) {
        const id = req.params.id;
        sqlDipartimento = "SELECT * FROM Dipartimenti WHERE id = ?;";
        sqlSedi = "SELECT * FROM Sedi;";
        sqlDipartimenti_Sedi = "SELECT D.nome, S.nome FROM ((Dipartimenti D INNER JOIN Dipartimenti_Sedi Ds ON D.id = Ds.id_Dipartimenti) INNER JOIN Sedi S ON S.id = DS.id_Sedi) WHERE D.id = ?;";
        db.get(sqlDipartimento, [id], function (err, dipartimento) {
            db.all(sqlSedi, function(err, sedi) {
                db.all(sqlDipartimenti_Sedi, [id], function(err, Dipartimenti_Sedi) {
                    console.log(Dipartimenti_Sedi);
                res.render("admin-dipartimento", {
                    dipartimento: dipartimento,
                    sedi : sedi,
                    Dipartimenti_Sedi : Dipartimenti_Sedi
                   })
                });
            });
        });
    });

        router.post("/dipartimenti/sedi", function(req,res) {
            sql = "INSERT INTO Dipartimenti_Sedi (id_Dipartimenti, id_Sedi) VALUES (?,?);";
            db.all(sql, [req.body.dipartimenti.id], [req.body.sedi.id] function(err,rows){
                ;
            });
            
        });
        

    router.post("/dipartimenti/edit", function (req, res) {
        const sql = "UPDATE Dipartimenti SET nome = ? WHERE id = ?;";
        db.run(sql, [req.body.nome, req.body.id], function () {        
            res.redirect("/admin/dipartimenti");
        });
    });

    router.get("/dipartimenti/:id/sedi", function (req, res) {
        const dipId = req.params.id;
        const sql = "SELECT nome FROM Sedi;";
        db.all(sql, function(err, rows){
            res.render("admin-sedi", {
                sedi: rows,
                dipId: dipId
            });
        });
    });

    router.post("/sedi", function(req, res){
        const nome = req.body.nome;
        const dipId = req.body.dipId;
        const sql = "INSERT INTO Sedi (nome) VALUES (?);";
        db.run(sql, [nome], function (err) {
            res.redirect("/admin/dipartimenti/"+dipId+"/sedi");
        });

    });

    return router;
};
