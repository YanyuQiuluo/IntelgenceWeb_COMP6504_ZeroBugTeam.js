let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";
//let story = {title: "title", name: "Jeffery", story: "unlimited"};

module.exports = function (report) {
    MongoClient.connect(url, function (err, db) {
        console.log(111);
        if (err) throw err;
        let dbo = db.db("mongo");
        dbo.collection("site").insertOne(report, function (err, res) {
            if (err) throw err;
            console.log("insert success");
            console.log(report);
            console.log(dbo);
            db.close();
        });
    });
}

