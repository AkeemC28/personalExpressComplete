const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

var db, collection;

const url =
  'mongodb+srv://chambersakeem:7eQSIBWSnhdMsI5i@personalexpresscomplete.eujfpjs.mongodb.net/?retryWrites=true&w=majority';

const dbName = 'icecreamflavors';

app.listen(2000, () => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      throw error;
    }
    db = client.db(dbName);
    console.log("Connected to `" + dbName + "`!");
  });
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  db.collection('icecream')
    .find()
    .toArray((err, result) => {
      if (err) return console.log(err);
      res.render('index.ejs', { icecream: result });
    });
});

app.post('/flavors', (req, res) => {
  db.collection('icecream').insert({ flavor1: req.body.flavor1, flavor2: req.body.flavor2 }, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/flavors', (req, res) => {
  db.collection('icecream')
  //what to change
    .update({ flavor1: req.body.flavor1,flavor2: req.body.flavor2}, { //insde the brackets are database fields
      $set: {
        add: req.body.add
      } //how to change it
    }, {
      sort: { _id: -1 },
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
})

app.delete('/flavors', (req, res) => {
  db.collection('icecream').findOneAndDelete({ flavor1: req.body.flavor1, flavor2: req.body.flavor2 
    // add:req.body.add
   }, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})


// use concatanation to mix flavors together to create new name