FROM nginx:1.9.11

RUN apt-get update \
    && apt-get install -y \
    curl \
    unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /opt
COPY nginx* ./

ENV CONSUL_VERSION 0.11.1
RUN curl --location-trusted https://releases.hashicorp.com/consul-template/${CONSUL_VERSION}/consul-template_${CONSUL_VERSION}_linux_amd64.zip -o temp.zip \
    && unzip temp.zip \
    && rm temp.zip

CMD ["./nginx-start.sh"]
