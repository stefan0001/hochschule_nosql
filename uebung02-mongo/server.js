var express = require('express');
var mongodb = require('mongodb');
var bodyParser = require('body-parser')
var MongoClient = mongodb.MongoClient;
var app = express();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({// to support URL-encoded bodies
    extended: true
}));

// Connection URL 
var url = 'mongodb://localhost:27017/catsdb';
// Use connect method to connect to the Server 

MongoClient.connect(url, function(err, db){
    app.get('/cats', function (request, response) {
        var getAllCats = db.collection('cats').find().toArray();
        
        getAllCats.then(function(allCats){
            response.send(allCats);
        })
    });
    
    
    app.get('/cats/name\::name', function (request, response) {
        var name = request.params.name;
        var getAllWithName = db.collection('cats').find({name: name}).toArray();
        
        getAllWithName.then(function(cats){
            response.send(cats);
        })
    });
    
    app.post('/cats/create', function(request, response){
        var cat = {
            name: request.body.name,
            age: request.body.age,
            color: request.body.color,
            gender: request.body.gender,
            height: request.body.height,
            weight: request.body.weight 
        };
        console.log(cat);
        
        db.collection('cats').insert(cat, function(){
            response.send(cat);
        });
    });
    
    var server = app.listen(8081, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log("Example app listening at http://%s:%s", host, port)
    });
});