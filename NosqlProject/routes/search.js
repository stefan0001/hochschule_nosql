var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/:search', function (req, res) {
    var searchKey = req.params.search;
    
    res.send('Hello');
});

module.exports = router;

