var express = require('express');
var router = express.Router();

var Story = require('../models/story');
var uploadStory = require('../controllers/story');

// test data
// let story = new Story({
//     title: 'Test',
//     auther: 'LAJ',
//     date: Date.now(),
//     intro: 'Test DB connection'
// });

// story.save()
//     .then((results)=>{
//         console.log("object created in init: "+ JSON.stringify(results));
//     })
//     .catch((error)=>{
//         console.log(JSON.stringify(error));
//     })




router.get('/', function(req, res, next) {
    // res.render('homepage');
    Story.find({}, function(err, details){
        if(err){
            console.log(err);
        }
        else{
            res.render('homepage', {story: details});
        }
    });
});

router.get('/index', function(req, res, next) {
    res.render('index', { title: 'Image Browsing' });
});

router
    .get('/uploadimg', function(req, res, next) {
        res.render('uploadimg', { title: 'Upload Your Image' });
    })
    .post('/uploadimg', uploadStory.insert);
    // .post('/uploadimg', function(req, res, next) {
    //     // res.render('uploadimg', { title: 'Upload Your Image' });
    //     res.setHeader('Content-Type', 'application/json');

    //     let title = req.body.title;
    //     let auther = req.body.auther;
    //     let intro = req.body.intro;

    //     let report = {
    //         title: title,
    //         auther: auther,
    //         date: Date.now(),
    //         intro: intro
    //     }
    //     reportloader = router;
    // });

module.exports = router;