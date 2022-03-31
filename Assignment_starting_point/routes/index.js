var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
var Story = require('../models/testDB');

let story = new Story({
    title: 'Test',
    auther: 'LAJ',
    date: Date.now(),
    intro: 'Test DB connection'
});

story.save()
    .then((results)=>{
        console.log("object created in init: "+ JSON.stringify(results));
    })
    .catch((error)=>{
        console.log(JSON.stringify(error));
    })


router.get('/', function(req, res, next) {
    // res.render('homepage');
    Story.find({}, function(err, details){
        if(err){
            console.log(err);
        }
        else{
            res.render('homepage', {test: details});
        }
    });
});

router.get('/index', function(req, res, next) {
    res.render('index', { title: 'Image Browsing' });
});

router.get('/uploadimg', function(req, res, next) {
    res.render('uploadimg', { title: 'Upload Your Image' });
});

module.exports = router;