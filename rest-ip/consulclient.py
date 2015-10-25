"""
module to register and deregister services on consul
"""

import consul
import socket
import logging

HOST = 'consul'

logging.basicConfig(level=logging.DEBUG)
IP = socket.gethostbyname(socket.gethostname())

def register(port=8080, tags=None):
    """
    register service to consul
    """
    if tags is None:
        tags = []
    logging.info('tags = ' + str(tags))
    logging.info('application running on %s on port %i', IP, port)
    check = consul.Check.http(interval='5s', url='http://%s:%i/api/v1/health' % (IP, port))
    outcome = consul.Consul(host=HOST).agent.service.register(tags=tags, \
      name='rest-ip', address=IP, port=port, service_id='worker-%s' % IP, check=check)
    logging.info('consul registration ' + ('ok' if outcome else 'ko'))
    return outcome


def deregister():
    """
    deregister service from consul
    """
    logging.info('deregistering')
    return consul.Consul(host=HOST).agent.service.deregister(service_id='worker-%s' % IP)
