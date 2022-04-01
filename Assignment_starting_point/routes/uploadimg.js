var express = require('express');
var router = express.Router();
//const axios = require('axios');
let reportloader = require('../database/mongodb');

/*router.get('/', function(req, res, next) {
    res.end('respond with a resource');
});*/

router.post('/upimage', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    let title = req.body.title;
    let name = req.body.name;
    let intro = req.body.intro;
    let imgOne = req.body.imgOne;

    let report = {
        title:title,
        name:name,
        intro:intro,
        imgOne:imgOne
    }
    reportloader(report);
});

module.exports = router;