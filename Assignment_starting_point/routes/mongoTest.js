var express = require('express');
var router = express.Router();

router.post('/uploadimg', function(req, res, next) {
    let report = {aaa:"Aaa"};

    let reportloader = require('/database/mongodb.js');
    reportloader(report);
});

module.exports = router;