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

    router.get("/modifica/:id", function(req,res){
        const id = req.params.id;
        sql = "SELECT * FROM Dipartimenti WHERE nome = (?);";
        db.all(sql, [id], function(err,rows){
        const Dipartimento_selezionato = rows[0];
        res.render("modifica", {dipartimenti : Dipartimento_selezionato});
        });
    });
     

    return router;
};
