const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use( bodyParser.urlencoded({ extended: false }) );

module.exports = function (db) {
    
    router.get("/dipartimenti", function (req, res) {
        const sql = "SELECT * FROM Dipartimenti;";
        db.all(sql, function (err, rows) {
            res.render("admin-dipartimenti", {
                dipartimenti: rows
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
        sql = "SELECT * FROM Dipartimenti WHERE id = ?;";
        db.get(sql, [id], function (err, dipartimento) {
            res.render("admin-dipartimento", {
                dipartimento: dipartimento
            });
        });
    });

    router.post("/dipartimenti/edit", function (req, res) {
        const sql = "UPDATE Dipartimenti SET nome = ? WHERE id = ?;";
        db.run(sql, [req.body.nome, req.body.id], function () {        
            res.redirect("/admin/dipartimenti");
        });
    });

    return router;
};
