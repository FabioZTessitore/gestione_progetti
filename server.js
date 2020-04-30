const express = require("express");
const path = require("path");
// const ejs = require("ejs");
// const sqlite3 = require('sqlite3');

const app = express();

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
// 
// const db = new sqlite3.Database("organizzazione.db", function(err){
//     app.listen(9000);
// });

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/admin", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index_admin.html"));
});

// app.post("/aggiungi_dipartimento", function(req,res){
//     const nome = req.body.nome;
//     const sql = "INSERT INTO Dipartimento (nome) VALUES (?)";
//     db.run(sql, [nome], function(err,rows){});
// });

app.use(function (req, res) {
    res.status(404);
    res.send('Page Not Found');
});

app.listen(9000);
