'use strict';

var express = require('express');
var os = require('os');
var mongo = require('mongodb');

var app = express();

var PORT = 3000;
var TAGS = process.env.TAGS;

mongo.MongoClient.connect('mongodb://mongo:27017/docker', function(err, db) {

  var access = db.collection('access');

  app.get('/api/v1/ip', function (req, res) {
    var cursor = access.find({}).sort({ _id : -1 } ).limit(1);

    var last = {};

    cursor.each(function(err, doc) {
      if (doc === null) {
        access.insert({ip: req.connection.remoteAddress, time: new Date()});
        res.send({version: '1.0', kind: TAGS, last_ip: last.ip, time: last.time});
      } else {
        last = doc;
      }
    });
  });

  app.get('/api/v1/health', function (req, res) {
    res.send({health: true});
  });

  var server = app.listen(PORT);

});
