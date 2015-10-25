import consul
import socket
import logging

HOST='consul'

logging.basicConfig(level=logging.DEBUG)
ip = socket.gethostbyname(socket.gethostname())

def register(port=8080,tags=[]):
        logging.info('tags = ' + str(tags))
	logging.info('application running on %s on port %i' % (ip, port))
	cc = consul.Check.http(interval='5s', url='http://%s:%i/api/v1/health' % (ip, port))
	outcome = consul.Consul(host=HOST).agent.service.register(tags=tags,name='rest-count',address=ip,port=port,service_id='worker-%s' % ip,check=cc)
	logging.info('consul registration ' + ('ok' if outcome else 'ko'))
	return outcome


def deregister():
        logging.info('deregistering')
        return consul.Consul(host=HOST).agent.service.deregister(service_id='worker-%s' % ip)
