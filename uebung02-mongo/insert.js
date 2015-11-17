var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

// Connection URL 
var url = 'mongodb://localhost:27017/catsdb';
// Use connect method to connect to the Server 

MongoClient.connect(url, function (err, db) {
    console.log("Connected correctly to server");
    
    var cats = db.collection('cats');
    cats.insert([
        {
            name: "Coco",
            age: 5,
            gender: "female"
        }, {
            name: "Lili",
            age: 6,
            gender: "female"
        }, {
            name: "Sunny",
            age: 7,
            gender: "female"
        }, {
            name: "Luna",
            age: 5,
            gender: "female"
        }, {
            name: "Mimi",
            age: 6,
            gender: "female"
        }, {
            name: "Tiger",
            age: 7,
            gender: "male"
        }, {
            name: "Mo",
            age: 8,
            gender: "male"
        }, {
            name: "Sammy",
            age: 9,
            gender: "male"
        }, {
            name: "Caesar",
            age: 7,
            gender: "male"
        }, {
            name: "Felix",
            age: 7,
            gender: "male"
        }
    ], function(){
        db.close();
    });
});
