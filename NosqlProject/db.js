var elasticsearch = require('elasticsearch');

var elasticsearchClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'error'
});

module.exports = elasticsearchClient;


