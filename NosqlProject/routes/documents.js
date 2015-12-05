'use strict';

var express = require('express');
var db = require('../db');
var router = express.Router();

router.get(['/?page=:page', '/'], function (req, res) {
    var page = req.params.page ? req.params.page : 0;
    var pageSize = 2;

    db.search({
        index: 'test',
        type: 'test',
        size: pageSize,
        fields: ['title'],
        from: page * pageSize,
        sort: 'title'
    }).then(function (result) {
        var documents = [];
        
        result.hits.hits.forEach(function(document){
            documents.push({
                id: document._id,
                title: document.fields.title[0]
            });
        });
        
        res.send({
            page: page,
            pageCount: result.hits.total / pageSize,
            documents: documents
        });
    });
});


router.get('/:id', function (req, res) {
    
});

//download
router.get('/:id/file', function (req, res) {

});

//create
router.post('/', function (req, res) {
    
});

//delete
router.delete('/:id', function (req, res) {

});

module.exports = router;
