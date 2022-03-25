var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('homepage', { title: 'Welcome!' });
});

router.get('/index', function(req, res, next) {
    res.render('index', { title: 'Image Browsing' });
});

router.get('/uploadimg', function(req, res, next) {
    res.render('uploadimg', { title: 'Upload Your Image' });
});

module.exports = router;