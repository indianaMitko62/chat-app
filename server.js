var mysql = require('mysql');
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
  const q = "select message, Users.name as name from Message left join Users on Users.id = Message.sender;"
  //const q = '';
  db.query(q, (err, data) => 
  {
    if(err) return console.log('error',err);
    return res.send(data)
  })
})

app.get('/messages/:user', (req, res) => 
{
  const userId = req.params.user;
  const newLocal = "select message, Users.name as name from Message left join Users on Users.id = Message.sender;"; //////////////
  //const newLocal = "";
  const q = newLocal

  db.query(q, [userId], (err, data) => 
  {
    if(err) return console.log('error', err);
    return res.send(data)
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
    idaa = data[0].id;
    console.log("1 - " + data[0].id);
    console.log("2 - " + idaa);
    let query = "insert into Message (`sender`, `message`) values (?)"
    const values = [
      idaa,
      req.body.message
    ]
    console.log("4 - " + idaa);
    db.query(query, [values], (err, data) => {
      if(err)
      {
        console.log('error', err);
      }
      else
      {
        io.emit('message', req.body);
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