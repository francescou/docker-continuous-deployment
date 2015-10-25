#! /bin/bash

service nginx start

/opt/consul-template_0.10.0_linux_amd64/consul-template -consul consul:8500 -template '/opt/nginx.conf.tpl:/etc/nginx/nginx.conf:service nginx reload'
