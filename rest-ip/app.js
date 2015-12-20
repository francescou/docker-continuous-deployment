'use strict';

var consul = require('consul')({host: 'consul'});
var express = require('express');
var _ = require('lodash');
var os = require('os');

var app = express();

var PORT = 3000;
var TAGS = process.env.TAGS;

app.get('/api/v1/ip', function (req, res) {
  res.send({version: 0.1, kind: TAGS, last_ip: '0.0.0.0', time: 'foo'});
});

app.get('/api/v1/health', function (req, res) {
  res.send({health: true});
});

var server = app.listen(PORT);

require('dns').lookup(os.hostname(), function (err, add) {
  console.log('addr: '+add);
  consul.agent.service.register({
    tags: TAGS.split(','),
    name: 'rest-ip',
    address: add,
    port: PORT,
    id: 'worker-' + add,
    check: {
      http: 'http://' + add + ':' + PORT + '/api/v1/health',
      interval: '1s'
    }
  }, function () {
    console.log('registration done');
    process.on('SIGTERM', function() {
    console.log('deregistering');
      consul.agent.service.deregister('worker-' + add, function () {
        console.log('deregistered');
        setTimeout(function() {
          console.log('shutting down server');
          server.close();
        }, 5000);
      });
    });
  });

});


