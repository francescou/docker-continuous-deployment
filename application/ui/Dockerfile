FROM python:2.7.11-slim

MAINTAINER Francesco Uliana <francesco@uliana.it>

ADD ./web/ /opt/web/

WORKDIR /opt/web

CMD ["python2", "-m", "SimpleHTTPServer"]
