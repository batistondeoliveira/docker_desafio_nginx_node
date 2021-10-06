const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};

function createtable() {
    const mysql = require('mysql')
    const connection = mysql.createConnection(config)

    const sql = `CREATE TABLE IF NOT EXISTS people (
        id int not null primary key auto_increment,
        name varchar(255)
    )`
    
    connection.query(sql)
    connection.end()
}

function insert(name) {
    const mysql = require('mysql')
    const connection = mysql.createConnection(config)

    const sql = `INSERT INTO people(name) values('${name}')`
    connection.query(sql)
    connection.end()
}

app.get('/', (req,res) => {  
    createtable(); 
    insert('Eliel Batiston');    

    const mysql = require('mysql')
    const connection = mysql.createConnection(config)
    
    const sql = `select * from people`
    let tag = ''

    connection.query(sql, (err, results) => {         
        if (err) throw err

        results.forEach(row => {
            tag += '<li>' + row.name + '</li>';
        });        
        
        res.send(
            '<h1>Full Cycle</h1>'+
            tag
        );
    })  
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})
