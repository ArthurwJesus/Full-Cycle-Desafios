const express = require('express')
const mysql = require('mysql')

const app = express()

const port = 3000

const config = {
    host:'mybd',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const connect = mysql.createConnection(config)

connect.query("DROP TABLE IF EXISTS people;")
const create_sql = "CREATE TABLE people (id int not null auto_increment, name varchar(255), primary key(id));"
connect.query(create_sql)

connect.end()

const listNames =[
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
    "Vanessa"
]

function randomName ()  {
    let result = listNames[Math.floor( Math.random() * listNames.length )]
    console.log(result)
    return result;
}

app.get("/",(req,res) => {

    const connect = mysql.createConnection(config)

    const insert = `INSERT INTO people(name) values("${randomName()}")`
    connect.query(insert)

    connect.query("SELECT * FROM people", function (err,rows){
        if (err) throw err;

        var body = "<h1> Full Cycle Rocks! </h1> <ul>"
        for(let i in rows) body +="<li>" + rows[i].name + "</li>";
        body +="</ul>"

        res.send(body)
    })
    connect.end()
})

app.listen(port,()=>{
    console.log('rodando na porta '+ port)
})