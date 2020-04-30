const express = require("express");
const path = require("path");
const sqlite3 = require('sqlite3');

const app = express();

const adminRoutes = require('./app/admin.js');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const db = new sqlite3.Database("organizzazione.db", function(err) {
    if (err) {
        console.log(err);
        return;
    }

    app.listen(9000); 
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/admin", function (req, res) {
    res.sendFile(path.join(__dirname, "public", "index_admin.html"));
});

app.use('/admin', adminRoutes(db));


app.post("/aggiungi_dipartimento", function(req,res){
   const nome = req.body.nome;
   const sql = "INSERT INTO Dipartimenti (nome) VALUES (?);";
   db.all(sql, [nome], function(err,rows){
       res.redirect("/");
    });
 });

app.use(function (req, res) {
    res.status(404);
    res.sendFile(path.join(__dirname, "public", "404.html"));
});
