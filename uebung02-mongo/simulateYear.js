var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

// Connection URL 
var url = 'mongodb://localhost:27017/catsdb';
// Use connect method to connect to the Server 

MongoClient.connect(url, function (err, db) {
    console.log("Connected correctly to server");
    
    var cats = db.collection('cats');
    cats.update({}, {$inc: {age: 1}}, {multi: true}).then(function(){
        db.close();
    }); 
});
