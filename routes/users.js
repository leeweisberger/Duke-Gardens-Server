var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://root:bitnami@localhost/admin/');
db.on('open', function () { console.log("opened"); });
db.on('error', function (err) { console.log("error connecting " + err); });

db.once('open', function() {
	console.log("ready to do some db stufffff!");
    var poiSchema = new mongoose.Schema({
        name: String,
        prefix: String,
        lat: Number,
        lng: Number,
        description: String,
        summary: String,
        category: String,
        location: String,
        image: String
    
    });
    var Poi = db.model('Poi', poiSchema);
    var testPoi = new Poi({
        name: "hey",
        prefix: "pre",
        lat: 4,
        lng: 5,
        description: "yo",
        summary: "suck it",
        category: "cat",
        location: "loc",
        image: "boo"
    });
    testPoi.save(function (err) {
if (err) 
    console.log ('Error on save!')
else{console.log('saved!')}
} );

    Poi.find({}, function(err, pois){
        if(err){
            console.log(err.errors);
        }
        else{
            console.log("closing db");
            mongoose.connection.close();
            console.log(pois);
        }
    });

});
  res.send('respond with a resource');
});

module.exports = router;
