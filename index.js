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
});

app.get('/', async function (req, res) {
  var obj = await db.collection('todo').find().toArray();
  res.render('index', {data: obj});
  console.log('Index page request fulfilled');
});

app.post('/createlist', async function (req,res){
  console.log(req.body);
  let data = {"listName":"","complete":false,"tasks":[]};
  data.listName = req.body.listName;
  await db.collection('todo').insert(data);

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
  //search by -id, insert into the tasks.
  var newtask = {"name":req.body.taskname, "complete":false}
  db.collection('todo').update(
    {_id: ObjectID(req.body.location)},
    {$push:{"tasks":newtask }}
  );
  res.redirect('/');
})
app.post('/marklistcomplete', function (req,res){
  console.log(req.body);

  res.redirect('/');
})
app.post('/deletelist', function (req,res){
  console.log(req.body);
  db.collection('todo').remove(
    {_id: ObjectID(req.body.location)});
  res.redirect('/');
})

app.post('/marktaskcomplete', function (req,res){
  console.log(req.body);

  res.redirect('/');
})
app.post('/deletetask', function (req,res){
  console.log(req.body);
  db.collection('todo').update(
    {_id: ObjectID(req.body.location)},
    {$pull:{"tasks":{"name":req.body.taskName} }}
  );
  res.redirect('/');
})




var port = 3000;

app.listen(port);

console.log('listening on port ' + port);
