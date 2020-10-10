const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;
const db = require("./db/db.json");
const fs = require("fs");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//routes for html files
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(db);
});

app.post("/api/notes", (req, res) => {
  console.log(req.body);
  db.push(req.body);
  fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
    if (err) throw err;
    res.json("ay!");
  });
});

app.delete("/api/notes/:id", (req, res) => {
  db.splice(req.params.id, 1);
  fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
    if (err) throw err;
    res.json("ay!");
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

//routes for data

app.listen(port, () => console.log("server is running on port ", port));
