const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pug = require('pug');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

let app = express();
var jsonParser = bodyParser.json()
var db;

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

//Environment variable wizardry below.
MongoClient.connect(process.env.DB_URL ? process.env.DB_URL : 'mongodb://localhost', (err, client) => {
  if (err) throw err;
  db = client.db(process.env.DB_NAME ? process.env.DB_NAME : 'todo');
  db.collection('todo').find();
  // that was getting obnoxious.
});

// The below chunk of code will connect you to the base page and render the todo list.
app.get('/', async function (req, res) {
  var obj = await db.collection('todo').find().toArray();
  res.render('index', {data: obj});
  console.log('Index page request fulfilled');
});

app.post('/createlist', function (req,res){
  console.log(req.body);

  res.redirect('/');
})
app.post('/clearcompletelists', function (req,res){
  console.log(req.body);

  res.redirect('/');
})
app.post('/clearcompletetasks', function (req,res){
  console.log(req.body);

  res.redirect('/');
})

app.post('/addtask', function (req,res){
  console.log(req.body);

  res.redirect('/');
})
app.post('/marklistcomplete', function (req,res){
  console.log(req.body);

  res.redirect('/');
})
app.post('/deletelist', function (req,res){
  console.log(req.body);

  res.redirect('/');
})

app.post('/marktaskcomplete', function (req,res){
  console.log(req.body);

  res.redirect('/');
})
app.post('/deletetask', function (req,res){
  console.log(req.body);

  res.redirect('/');
})




var port = 3000;

app.listen(port);

console.log('listening on port ' + port);
