var express = require('express');
var router = express.Router();

// GET home page
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


router.get('/createDocument', function (req, res, next) {
    res.render('create_document', {title: 'Express'});
});

module.exports = router;
