const express = require("express");
const mysql = require("mysql");

const app = express();

const config = {
  host: "bd",
  user: "root",
  password: "root",
  database: "nodedb",
};

const port = 3000;

const connected = mysql.createConnection(config);

const listNames = [
  "João",
  "Maria",
  "Pedro",
  "Ana",
  "José",
  "Mariana",
  "Carlos",
  "Isabela",
  "Paulo",
  "Fernanda",
  "Lucas",
  "Camila",
  "Rafael",
  "Juliana",
  "Daniel",
  "Patrícia",
  "Gustavo",
  "Laura",
  "Rodrigo",
  "Vanessa",
];

function randomName() {
  let result = listNames[Math.floor(Math.random() * listNames.length)];
  console.log(result);
  return result;
}

app.get("/", (req, res) => {
  const insert = `INSERT INTO people(name) values("${randomName()}")`;
  connected.query(insert);

  connected.query("SELECT * FROM people", function (err, rows) {
    if (err) throw err;

    var body = "<h1> Full Cycle Rocks! </h1> <ul>";
    for (let i in rows) body += "<li>" + rows[i].name + "</li>";
    body += "</ul>";

    res.send(body);
  });
});

app.listen(port, () => {
  console.log("rodando na porta " + port);
});
