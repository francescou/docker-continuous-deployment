
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {

  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    '$status $body_bytes_sent "$http_referer" '
    '"$http_user_agent" "$http_x_forwarded_for" $request_time';

  access_log  /var/log/nginx/access.log  main;

  upstream restcount {
    {{range service "primary.rest-count"}}
    server {{.Address}}:{{.Port}};
    {{end}}
    {{range service "backup.rest-count"}}
    server {{.Address}}:{{.Port}} {{if gt (len (service "primary.rest-count")) 0}}backup{{end}};
    {{end}}
  }

  upstream restip {
    {{range service "primary.rest-ip"}}
    server {{.Address}}:{{.Port}};
    {{end}}
    {{range service "backup.rest-ip"}}
    server {{.Address}}:{{.Port}} {{if gt (len (service "primary.rest-ip")) 0}}backup{{end}};
    {{end}}
  }

  upstream ui {
    server ui:8000;
  }

  server {
    listen 80;

    location / {
      proxy_pass http://ui;
    }
    location /api/v1/count {
      proxy_pass http://restcount;
    }
    location /api/v1/ip {
      proxy_pass http://restip;
    }
  }

}
