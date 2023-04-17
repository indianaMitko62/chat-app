var mysql = require('mysql');
var cors = require('cors');
var express = require('express');
var bodyParser = require('body-parser');
const { dirname } = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors());

const db = mysql.createConnection({
  host: "192.168.1.40",
  port: "3306",
  user : "root",
  password : "mitko123",
  database : "chat"
})

app.get("/", (req, res)=> {
  res.json("hello this is the backend")
})

app.get("/chat", (req, res)=> {
  return res.sendFile(__dirname + "/chat.html");
})

app.get('/messages', (req, res) => {
  const q = "select message, sent_at, Users.name as name from Message left join Users on Users.id = Message.sender;"
  db.query(q, (err, data) => 
  {
    if(err) return console.log('error',err);
    return res.send(data)
  })
})

app.get('/messages/:user', (req, res) => 
{
  const userId = req.params.user;
  const newLocal = "select message, Users.name as name from Message left join Users on Users.id = Message.sender;";
  const q = newLocal

  db.query(q, [userId], (err, data) => 
  {
    if(err) return console.log('error', err);
    return res.send(data)
  })
})

app.post("/chat", (req, res) => 
{
  var q = "select Users.id from Users where Users.name = (?)";
  db.query(q, [req.body.name], (err, data) => 
  {
    if(null == data[0] || typeof data[0] === 'undefined')
    {
      let query = "insert into Users (`name`) values (?)";
      db.query(query, [req.body.name], (err, data) => {
        if(err)
        {
          console.log('error', err);
        }
        else
        {
          // io.emit('message', req.body);
          return console.log("User added successfully");
        }
      })
    } 
  })
})

app.post("/messages", (req, res) => 
{
  var q = "select Users.id from Users where Users.name = (?)";
  let idaa;
  db.query(q, [req.body.name], (err, data) => 
  {
    if(err) return console.log('error',err);
    if(typeof data[0] === 'undefined') return console.log('no such user');
    if("" == req.body.message) return console.log('no message');
    idaa = data[0].id;
    console.log("1 - " + data[0].id);
    console.log("2 - " + idaa);
    let query = "insert into Message (`message`, `sender`, `sent_at`) values (?, ?, NOW())"; 
    const values = [
      req.body.message,
      idaa
    ]
    console.log("4 - " + idaa);
    db.query(query, values, (err, data) => {
      if(err)
      {
        console.log('error', err);
      }
      else
      {
        io.emit('message', {...req.body, sent_at: new Date()}); 
        return console.log("Message added successfully");
      }
    })
  })
  console.log("3 - " + idaa);
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
