# NoSQL WS15/16
---
###Groupname: YeSQL

###Groupmember:
* Stefan Beigel
* Kevin Erdinger


### Requirments
* Nodejs
* NPM
  * Bower
  * Less
* Elasticsearch
  * AttachmentPlugin for ElasticSearch (https://github.com/elastic/elasticsearch-mapper-attachments)

### Setup Elastic Search Index

Create Index:
```
POST localhost:9200/nosql/
{
    "number_of_shards": 1
}
```

Add mapping 
```
PUT localhost:9200/nosql/document/_mapping
{
    "document" : {
        "properties" : {
            "file" :{
                "type": "attachment",
                "fields":{
                    "content": {
                        "type": "string",
                        "norms" : {
                            "enabled" : false
                        } 
                    }
                }
            }
        }
    }
}
```
