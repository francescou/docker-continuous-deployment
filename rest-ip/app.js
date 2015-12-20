'use strict';

var consul = require('consul')({host: 'consul'});
var express = require('express');
var _ = require('lodash');

var app = express();

var PORT = 3000;

var os = require('os');
var ifaces = os.networkInterfaces();

var x = _.filter(ifaces, function (o, item) {
  return item !== 'lo';
});

var y = _.filter(x[0], function (el) {
  return el.family === 'IPv4';
});

var HOST = y[0].address;

var TAGS = process.env.TAGS;
var tags = TAGS.split(',');

consul.agent.service.register({
  tags: tags,
  name: 'rest-ip',
  address: HOST,
  port: PORT,
  id: 'worker-' + HOST,
  check: {
    http: 'http://' + HOST + ':' + PORT + '/api/v1/health',
    interval: '1s'
  }
});


app.get('/api/v1/ip', function (req, res) {
  res.send({version: 2.1, kind: TAGS, last_ip: '0.0.0.0', time: 'foo'});
});

app.get('/api/v1/health', function (req, res) {
  res.send({health: true});
});

var server = app.listen(PORT);

process.on('SIGTERM', function() {
  consul.agent.service.deregister('worker-' + HOST, function (a,b,c) {
    setTimeout(function() {
      process.exit(0);
    }, 5000);
  });
});
