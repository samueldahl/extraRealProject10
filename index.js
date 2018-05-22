const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
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
MongoClient.connect(process.env.DB_URL, (err, client) => {
  if (err) throw err;
  db = client.db(process.env.DB_NAME);
  console.log(db);
});

// The below chunk of code will connect you to the base page and render the todo list.
app.get('/', async function (req, res) {
  var obj = await db.collection('todo').find().toArray();
  res.render('index', {data: obj});
  console.log('Index page request fulfilled');
});



var port = 3000;

app.listen(port);

console.log('listening on port ' + port);
