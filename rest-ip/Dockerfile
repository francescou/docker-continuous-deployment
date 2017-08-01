FROM node:7-slim

MAINTAINER Francesco Uliana <francesco@uliana.it>

EXPOSE 3000

ADD ./package.json /opt/

WORKDIR /opt/

RUN npm install

ADD ./app.js /opt/

CMD ["node", "app.js"]
