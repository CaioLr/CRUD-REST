const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

var app = express();

app.use(express.static('./app/public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "web3"
  });

app.set('view engine', 'ejs');
app.set('views', './app/views');

//HOME

app.get('/', function (req, res){
    let sql = 'SELECT * FROM usuarios;';

    con.query(sql, (err,result)=>{
        if (err) throw err;

        res.render('home', {usuarios: result});
    });
    

});

app.get('/busca', function(req,res){
    
    let busca = req.query.busca;


    sql = `SELECT * FROM usuarios WHERE nome LIKE '%` + busca + `%' ;` ;

    var resultados = [];

    con.query(sql, (err, result)=>{
    if (err) throw err;
    
    
    for (x in result){
        resultados.push(result[x]);
    }
        
        res.send(resultados);

    });
   

});

//CADASTRO

app.get('/cadastro', function (req, res){

    res.render('cadastro');
});

app.post('/cadastro', function (req,res){
    body = req.body;
    
    let sql = 'INSERT INTO usuarios (nome,email) VALUES (' +  mysql.escape(body.nome) + ', ' + mysql.escape(body.email) + ');';

    con.query(sql, (err,result)=>{
        if (err) throw err;

        res.redirect('/');
    });

});

//ATUALIZAR

app.put('/usuario/:id',function(req,res){
    
    const id = req.params.id;
    const body = req.body;
    
    
    let sql = 'UPDATE usuarios SET nome = ' + mysql.escape(body.nome) + ', email =' + mysql.escape(body.email) + 'WHERE id_usuario = ' + id + ';';

    con.query(sql, (err,result)=>{
        if (err) throw err;

        res.send('Usuário atualizado!');
    });

});

    

app.get('/usuario/:id' , function (req, res){
    
    const id = req.params.id;

    let sql = 'SELECT * FROM usuarios WHERE id_usuario = ' + mysql.escape(id) + ';';
    con.query(sql, (err, result)=>{
        if (err) throw err;

        res.render('editar', {usuario: result[0]});
    });

    
});

//DELETE

app.delete('/usuario/:id', function (req,res){

    const id = req.params.id;

    let sql = 'DELETE FROM usuarios WHERE id_usuario = ' + id + ';'

    con.query(sql, (err,result)=>{
        if (err) throw err;

        res.send('Usuário deletado!');
    });
});


module.exports = app;
