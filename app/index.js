const express = require('express');
const faker = require('faker/locale/pt_BR');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host: 'nodedb',
    user: 'root',
    password: 'pass',
    database: 'nodedb'
});

connection.connect();
connection.query('CREATE TABLE IF NOT EXISTS people (id int AUTO_INCREMENT PRIMARY KEY, name varchar(50) NOT NULL)');


app.get('/', (req, res) => {
    connection.query('INSERT INTO people (name) VALUES ( ? )', [faker.name.findName()], function (error, results, fields) {
        if (error) throw error;
        console.log(results.insertId);
        connection.query('SELECT name FROM people', function (error, results, fields) {
            if (error) throw error;
    
            console.log(results)
            let result = '<h1>Full Cycle Rocks!</h1>';
            result += '<ul>'
            results.forEach(element => {
                result += `<li>${element.name}</li>`
            });
            result += '</ul>'
            res.send(result)
        });
    });
});

app.listen(3000, () => console.log('Server is up and running'));