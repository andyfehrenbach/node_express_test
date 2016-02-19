var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var randomNumber = require('./random_Number');

//get randomNumber
var num = randomNumber(1,100);
console.log(num);

//set up pg
var connectionString = '';
if (process.env.DATABASE_URL !== undefined) {
  connectionString = process.env.DATABASE_URL + 'ssl'; //<---required for heroku
} else {
  connectionString = 'postgres://localhost:5432/node_express_test'; //<--end of path is the name of the database.
}

///handle a post
router.post('/', function (req, res){

  var num = randomNumber(1,100);
  console.log(num);

  var addAnimal = {
    animal: req.body.animalName,
    qty: num
  };
console.log(addAnimal.animal);
  pg.connect(connectionString, function(err, client) {
      client.query('INSERT INTO zoo_animals (animal, qty) VALUES ($1, $2)',
      [addAnimal.animal, addAnimal.qty],
        function(err, result, done) {
          if (err) {
            console.log('error inserting data: ', err);
            res.send(false);
          } else {
            res.send(result);
          }
        });
    });
  });

///handle a get
router.get('/', function(req, res) {
  var results = [];
    pg.connect(connectionString, function (err,client, done){
        var query = client.query ('SELECT * FROM zoo_animals;');

        query.on('row', function (row){
            results.push(row);
        });

        query.on ('end', function () {
           client.end();
            return res.json(results);
        });

        if (err) {
            console.log(err);
        }
    });
});


module.exports = router;
