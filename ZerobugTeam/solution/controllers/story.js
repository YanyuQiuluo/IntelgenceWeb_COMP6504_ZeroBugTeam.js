let Story = require('../models/story');
var fs = require("fs");
var moment = require("moment");

exports.find = function(req, res, next) {
    Story.find({}, function(err, details){
        if(err){
            console.log(err);
        }
        else{
            res.render('homepage', {story: details});
        }
    })
}

exports.authorSort_asc = function(req, res, next) {
    Story.find({}, function(err, details){
        if(err){
            console.log(err);
        }
        else{
            res.render('homepage', {story: details});
        }
    }).sort({"author": 1})
}

exports.authorSort_desc = function(req, res, next) {
    Story.find({}, function(err, details){
        if(err){
            console.log(err);
        }
        else{
            res.render('homepage', {story: details});
        }
    }).sort({"author": -1})
}

exports.timeSort_asc = function(req, res, next) {
    Story.find({}, function(err, details){
        if(err){
            console.log(err);
        }
        else{
            res.render('homepage', {story: details});
        }
    }).sort({"date": 1})
}

exports.timeSort_desc = function(req, res, next) {
    Story.find({}, function(err, details){
        if(err){
            console.log(err);
        }
        else{
            res.render('homepage', {story: details});
        }
    }).sort({"date": -1})
}

exports.insert = function (req, res, next) {
        var imgData = fs.readFileSync(req.file.path);
        var dataBuffer = new Buffer(imgData).toString('base64');

        Story.create({
            title: req.body.title,
            author: req.body.author,
            date: moment(Date.now()).format('DD-MM-YYYY HH:mm:ss'),
            intro: req.body.intro,
            photo: req.file.originalname,
            base64: dataBuffer
        }, function(err){
            if(err){
                return next(err);
            }
            res.redirect('/');
        });
}