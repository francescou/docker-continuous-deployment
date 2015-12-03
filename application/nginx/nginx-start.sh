#! /bin/bash

service nginx start

/opt/consul-template -consul consul:8500 -template '/opt/nginx.conf.tpl:/etc/nginx/nginx.conf:service nginx reload'
