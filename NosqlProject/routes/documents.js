'use strict';

var express = require('express');
var fs = require('fs');
var db = require('../db');
var router = express.Router();

router.get(['/search/:search/page/:page', '/search/:search', '/page/:page', '/', '/search/'], function (req, res) {
    var page = req.params.page ? req.params.page : 0;
    var search = req.params.search;
    var pageSize = 10;

    var criteria = {
        index: 'test',
        type: 'test',
        size: pageSize,
        fields: ['title', 'filename','type'],
        from: page * pageSize
    };
    
    if (search) {
        criteria.body = {
            query: {
                query_string: {
                    query: search + '*'
                }
            }
        };
    }
    console.log(JSON.stringify(criteria));

    //perform search
    db.search(criteria).then(function (result) {
        var documents = [];
        console.log(JSON.stringify(result));
        //mapping
        result.hits.hits.forEach(function (document) {
            documents.push({
                id: document._id,
                title: document.fields.title ? document.fields.title[0] : null,
                filename: document.fields.filename ? document.fields.filename[0] : null,
                type: document.fields.type ? document.fields.type[0] : null
            });
        });

        //send result
        res.send({
            page: page,
            pageCount: Math.ceil(result.hits.total / pageSize),
            documents: documents
        });
    });
});

router.get('/:id', function (req, res) {
    var id = req.params.id;

    db.get({
        index: 'test',
        type: 'test',
        id: id
    }).then(function (result) {
        res.send({
            id: result._id,
            title: result._source.title,
            filename: result._source.filename,
            content: result._source.content
        });
    });
});

//download
router.get('/:id/file', function (req, res) {
    
});

//create
router.post('/', function (req, res) {
    var document = req.body;
    var fileContent = new Buffer(document.file, 'base64').toString('utf-8');

    db.create({
        index: 'test',
        type: 'test',
        refresh: true,
        body: {
            title: document.title,
            filename: document.filename,
            content: fileContent,
            type: document.type
        }
    }).then(function (document, error) {
        fs.writeFile('./pool/' + document._id, fileContent, function (error, data) {
            console.log('wrote file');
            //res.redirect('/' + document._id);
            res.send('test');
        });
    });
});

//delete
router.delete('/:id', function (req, res) {

});

module.exports = router;
