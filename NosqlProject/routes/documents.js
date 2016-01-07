'use strict';

var express = require('express');
var fs = require('fs');
var db = require('../db');
var router = express.Router();

router.get(['', '/search'], function (req, res) {
    var page = req.query.page ? parseInt(req.query.page) : 0;
    var search = req.query.search;
    var pageSize = 10;

    var criteria = {
        index: 'nosql',
        type: 'document',
        size: pageSize,
        fields: ['title', 'filename', 'type'],
        from: page * pageSize,
        explain: true
    };

    if (search) {
        criteria.body = {
            query: {
                term: {
                    "file.content": search.toLowerCase()
                }
            }
        };

        criteria.body = {
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                "file.content": search.toLowerCase()
                            }
                        }
                    ]
                }
            }
        };

    }
    console.log(JSON.stringify(criteria));

    //perform search
    db.search(criteria).then(function (result) {
        var documents = [];
        var pageCount = result.hits.total ? Math.ceil(result.hits.total / pageSize) : 1;
        console.log(JSON.stringify(result));
        console.log(JSON.stringify(result.hits.hits));
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
            pageCount: pageCount,
            documents: documents
        });
    });
});

router.get('/:id', function (req, res) {
    var id = req.params.id;

    db.get({
        index: 'nosql',
        type: 'document',
        id: id
    }).then(function (result) {
        if (result) {
            res.send({
                id: result._id,
                title: result._source.title,
                filename: result._source.filename,
                type: result._source.type,
            });
        } else {
            res.sendStatus(404);
        }
    });
});

//download
router.get('/:id/file', function (req, res) {
    var id = req.params.id;
    console.log("get file");
    db.get({
        index: 'nosql',
        type: 'document',
        id: id
    }).then(function (result) {
        console.log("result");
        console.log(result);
        if (result) {
            var source = new Buffer(result._source.file._content, 'base64');
            res.writeHead(200, {
                'Content-Type': result._source.file._content_type,
                'Content-Length': source.length
            });
            res.end(source);
        } else {
            res.sendStatus(404);
        }
    });
});

//create
router.post('/', function (req, res) {
    var document = req.body;

    db.create({
        index: 'nosql',
        type: 'document',
        refresh: true,
        body: {
            title: document.title,
            filename: document.filename,
            type: document.type,
            file: {
                _content_type: document.type,
                _content: document.file
            }
        }
    }).then(function (document, error) {
        console.log(document);
        console.log("indexed document");
        res.redirect('/documents/' + document._id)
    });
});

//delete
router.delete('/:id', function (req, res) {
    var id = req.params.id;

    db.delete({
        index: 'nosql',
        type: 'document',
        id: id,
        refresh: true
    }).then(function (result) {
        res.sendStatus(200);
        res.end();
    });
});

module.exports = router;
