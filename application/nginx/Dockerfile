FROM nginx:1.9.3

RUN apt-get update && apt-get install -y curl

WORKDIR /opt

COPY nginx* ./

RUN curl --location-trusted https://github.com/hashicorp/consul-template/releases/download/v0.10.0/consul-template_0.10.0_linux_amd64.tar.gz | tar -xz

CMD ["./nginx-start.sh"]
