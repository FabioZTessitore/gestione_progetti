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

    return router;
};
