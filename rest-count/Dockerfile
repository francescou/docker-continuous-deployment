# DOCKER-VERSION 1.8.3
FROM python:2.7-slim
MAINTAINER Francesco Uliana <francesco@uliana.it>

WORKDIR /app
RUN virtualenv /env
ADD requirements.txt /app/requirements.txt
RUN /env/bin/pip install -r requirements.txt
ADD . /app

EXPOSE 5000

CMD []
ENTRYPOINT ["/env/bin/python", "/app/main.py"]
