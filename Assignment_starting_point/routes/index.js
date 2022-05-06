var express = require('express');
var router = express.Router();

// add
// var fs = require('fs');
var multer = require('multer');

// var createFolder = function(folder){
//     try{
//         fs.accessSync(folder);
//     }catch(e){
//         fs.mkdirSync(folder);
//     }
// };

// var uploadFolder = './public/upload';
// createFolder(uploadFolder);

var storage = multer.diskStorage({
    // Setting the path of the images uploaded(saved in temporary files inside the project)

    destination: function(req, file, cb){
        //cb(null, '../public/images');
        cb(null, '../Assignment_starting_point/public/images');
    },
    // Setting the file name of images uploaded(randomly)
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});
var upload = multer({
    storage:storage
});

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
    // .post('/uploadimg', uploadStory.insert);
    .post('/uploadimg', upload.single('photo'), function(req, res, next){

        Story.create({
            title: req.body.title,
            auther: req.body.auther,
            date: Date.now(),
            intro: req.body.intro,
            photo: req.file.originalname
        }, function(err){
            if(err){
                return next(err);
            }
            res.redirect('/');
        });
    });
    

module.exports = router;