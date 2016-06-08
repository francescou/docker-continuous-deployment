FROM nginx:1.11.1

RUN apt-get update \
    && apt-get install -y unzip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /opt
COPY nginx* ./

ENV CONSUL_VERSION 0.14.0
ADD https://releases.hashicorp.com/consul-template/${CONSUL_VERSION}/consul-template_${CONSUL_VERSION}_linux_amd64.zip consultemplate.zip

RUN unzip consultemplate.zip && rm consultemplate.zip

CMD ["./nginx-start.sh"]
