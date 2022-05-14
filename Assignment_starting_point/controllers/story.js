let Story = require('../models/story');
var Canvas = require('canvas');
var fs = require("fs");

exports.insert = function (req, res, next) {
        var imgData = fs.readFileSync(req.file.path);
        var dataBuffer = new Buffer(imgData).toString('base64');

        Story.create({
            title: req.body.title,
            auther: req.body.auther,
            date: Date.now(),
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