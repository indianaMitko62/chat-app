import express from "express"
import mysql from "mysql"


var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

const db = mysql.createConnection({
  host:"localhost",
  port: "3306",
  user : "root",
  password : "mitko123",
  database : "chat"
})

app.get("/", (req, res)=> {
  res.json("hello this is the backend")
})

app.get('/messages', (req, res) => {
  //const q = "select message, Users.name as name from Message left join Users on Users.id = Message.sender;"
  const q = '';
  db.query(q, (err, data) => 
  {
    if(err) return console.log('error',err);
    return res.send(data)
  })
})

app.get('/messages/:user', (req, res) => 
{
  const userId = req.params.user;
  //const newLocal = "select message, Users.name as name from Message left join Users on Users.id = Message.sender;";
  const newLocal = "";
  const q = newLocal

  db.query(q, [userId], (err, data) => 
  {
    if(err) return console.log('error', err);
    return res.send(data)
  })
})

app.post("/messages", (req, res) => {
  const q = "insert into messages (`sender`, `reciever`, `message`) values (?)"
  const values = [
    req.body.sender,
    req.body.reciever,
    req.body.message
  ]
  db.query(q, [values], (err, data) => {
    if(err) 
    {
      console.log('error', err);
    }
    else
    {
      io.emit('message', req.body);
      return  console.log("Message added successfully");
    }
  })
})

app.delete("/messages/:id", (req, res) => 
{ 
    const flightId = req.params.id;
    const q = "DELETE FROM messages WHERE id = ?"

    db.query(q, [flightId], (err, data) => {
      if(err) return console.log('error',err);
      return  console.log("Message deleted successfully");
    })
})



io.on('connection', () =>{
  console.log('a user is connected')
})

var server = http.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});
