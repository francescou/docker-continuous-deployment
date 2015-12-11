# DOCKER-VERSION 1.8.3
FROM node:4.2.2-slim
MAINTAINER Francesco Uliana <francesco@uliana.it>

EXPOSE 3000

ADD ./app.js /opt/

ADD ./package.json /opt/

WORKDIR /opt/

RUN npm install

CMD ["node", "app.js"]
