"""
Flask webapp, registered as a consul client
"""

from flask import Flask, jsonify
import logging
import os
from consulclient import register, deregister
from redis import StrictRedis
import time

PORT = 8000

API_V1 = '/api/v1/'

logging.basicConfig(level=logging.DEBUG)
app = Flask(__name__, static_url_path='')

register(PORT, os.environ['TAGS'].split(',') if os.environ.has_key('TAGS') else None)

REDIS = StrictRedis(host='redis', port=6379, db=0)

# REST endpoints
@app.route(API_V1 + "health", methods=['GET'])
def health():
    """
    healthcheck endpoint
    """
    return jsonify(health=True)

@app.route(API_V1 + "count")
def index():
    """
    RESTful web service
    """
    count = REDIS.get('count')
    count = int(count) + 1 if count else 1
    REDIS.set('count', count)
    return jsonify(version='1.0', \
        kind=os.environ['TAGS'], \
        count=count)

@app.errorhandler(Exception)
def handle_generic_error(err):
    """
    default exception handler
    """
    return 'error: ' + str(err), 500

if __name__ == "__main__":
    try:
        app.run(host='0.0.0.0', debug=True, threaded=True, port=PORT)
    finally:
        deregister()
        time.sleep(15)
        logging.warn('shutting down')
