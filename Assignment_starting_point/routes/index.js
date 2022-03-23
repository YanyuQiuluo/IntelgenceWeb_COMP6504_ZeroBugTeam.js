var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/imagebrowsing', function(req, res, next) {
    res.render('index', { title: 'Image Browsing' });
});

router.get('/uploadimg', (req, res, next) => {
    res.render('uploadimg', { title: 'Upload Your Image' });
})

module.exports = router;