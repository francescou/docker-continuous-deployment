# DOCKER-VERSION 1.8.3
FROM node:4.2.2-slim
MAINTAINER Francesco Uliana <francesco@uliana.it>

EXPOSE 3000

ADD ./app.js /opt/

RUN npm install mongodb express consul lodash

CMD ["node", "/opt/app.js"]
