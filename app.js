var MongoClient = require('mongodb').MongoClient;

var chapters = [{'Title': 'Snow Crash', 'Author':'Neal Stephenson'},
                {'Title': 'Snow Crash', 'Author': 'Neal Stephenson'}];

MongoClient.connect('mongodb://localhost:27017/image-uploader', function(err,db) {

  console.log("You are connected to the server correctly!");

  var collection = db.collection('chapters');

  collection.insert(chapters, function(err, result) {

    if (err) {
      console.log("Some error was encountered :(");
    } else {
      console.log("Success: "+result.ops.length+" chapters inserted!");
    }

    db.close();

  });
});
