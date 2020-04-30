const express = require('express');
const router = express.Router();

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

        // la seguente riga non dovrebbe stampare il nome
        // del dipartimento perche' il server non e'
        // in grado di accettare il corpo delle richieste POST
        // Cosa manca?
        console.log("nome dipartimento: ", nome);
        // const sql = "INSERT INTO Dipartimenti (nome) VALUES (?);";
        // db.run(sql, [nome], function (err) {
               res.redirect("/");
        // });
    });

    return router;
};
