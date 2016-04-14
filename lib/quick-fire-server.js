var express = require('express');
var bodyParser = require('body-parser');
var express    = require('express');
var http       = require('http');
var logger     = require('morgan');
var Path       = require('path');
var repository  = require('./quick-fire-repository');

var app = express();

module.exports = app;

// Basic middlewares: static files, logs, form fields
app.use(express.static(process.cwd()));
//app.use(express.static(Path.join(__dirname, '/')));
app.use(logger('dev'));
app.use(bodyParser.json())

app.get('/api/*', function(req, res) {
  if(req.query.search){
    repository.search(req.path,req.query.search,function(data, error){
      if(data) {
        res.json(data);
      } else if (error){
        res.status(400).end(error);
      }
    })
  }
  else {
    repository.get(req.path,function(data, error){
      if(data) {
        res.json(data);
      } else if (error){
        res.status(400).end(error);
      }
    })
 }
});

app.get('/api/search/*', function(req, res) {
  repository.search(req.path,req.params,function(data, error){
    if(data) {
      res.json(data);
    } else if (error){
      res.status(400).end(error);
    }
  })
});

app.post('/api/*', function(req, res) {
  repository.save(req.path, req.body, function(id, error){
    if(id) {
      res.status(201).end(id);
    } else if (error){
      res.status(400).end(error);
    }
  });
})

app.put('/api/*', function(req, res) {
  repository.update(req.path, req.body, function(id, error){
    if(id) {
      res.status(200).end(id);
    } else if (error){
      res.status(400).end(error);
    }
  });
})

app.delete('/api/*', function(req, res) {
  repository.remove(req.path, function(id, error){
    if(id) {
      res.status(200).end(id);
    } else if (error){
      res.status(400).end(error);
    }
  });
})
/*
app.listen(3000, function () {
  console.log('Quickfire listening on port 3000');
});
*/
