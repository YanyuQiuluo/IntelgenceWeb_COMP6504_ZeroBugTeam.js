var express = require('express');
var router = express.Router();

router.post('/uploadimg', function(req, res, next) {
    let report = req.body;

    //require('/database/mongodb.js');
    //console.log(require('/public/images/cathedral.jpg'));
    let reportloader = require('/database/mongodb.js');
    reportloader(report);
    console.log(report);
});

module.exports = router;