from pyramid.config import Configurator

from .config import routes

import signal
import sys

def sigterm_handler(signum, frame):
    sys.exit(0)

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    config = Configurator(settings=settings)
    config.include(routes)
    signal.signal(signal.SIGTERM, sigterm_handler)
    return config.make_wsgi_app()

