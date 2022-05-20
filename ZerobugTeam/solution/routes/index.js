var express = require('express');
var router = express.Router();

var multer = require('multer');
var storage = multer.diskStorage({
    // Setting the path of the images uploaded(saved in temporary files inside the project)
    destination: function(req, file, cb){
       cb(null, process.cwd()+'/public/images');
       // cb(null, '../ZerobugTeam/solution/public/images');
    },
    // Setting the file name of images uploaded(randomly)
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});
var upload = multer({
    storage:storage
});

var uploadStory = require('../controllers/story');




router.get('/', uploadStory.find);

router.get('/authorSort_asc', uploadStory.authorSort_asc);

router.get('/authorSort_desc', uploadStory.authorSort_desc);

router.get('/timeSort_asc', uploadStory.timeSort_asc);

router.get('/timeSort_desc', uploadStory.timeSort_desc);

router.get('/index', function(req, res, next) {
    res.render('index', { title: 'Image Browsing' });
});

router
    .get('/uploadimg', function(req, res, next) {
        res.render('uploadimg', { title: 'Upload Your Image' });
    })
    
    .post('/uploadimg', upload.single('photo'), uploadStory.insert);
    

module.exports = router;