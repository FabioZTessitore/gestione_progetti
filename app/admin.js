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
        const nome = (req.body.nome);
        console.log("nome dipartimento: ", nome);
        const sql = "INSERT INTO Dipartimenti (nome) VALUES (?);";
        db.run(sql, [nome], function (err) {
               res.redirect("/");
        });
    });

    return router;
};
