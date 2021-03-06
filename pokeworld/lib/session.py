from pyramid.response import Response
import jinja2

import simplejson as json

env = jinja2.Environment(loader=jinja2.FileSystemLoader('pokeworld/templates'))

def web(template=None, content_type='text/html', *args, **kwargs):
    """
    Decorator for web routes
    """
    def decorator(f):
        def wrapper(request):
            body = ''
            data = f(request)
            if template is not None:
                tmpl = env.get_template(template)
                body = tmpl.render(data)
            else:
                body = data
            return Response(body, content_type=content_type)
        return staticmethod(wrapper)
    return decorator

def ajax(*args, **kwargs):
    """
    Decorator for ajax routes

    Returns a response with a JSON version of the return value of f
    """
    def decorator(f):
        def wrapper(request):
            retval = f(request)
            return Response(
                    body=json.dumps(retval),
                    content_type='application/json'
                    )
        return staticmethod(wrapper)
    return decorator

def data(content_type='application/octet-stream', *args, **kwargs):
    """
    Decorator for file routes

    Returns a response with the contents of the specified content type
    """
    def decorator(f):
        def wrapper(request):
            retval = f(request)
            return Response(
                    body=retval,
                    content_type=content_type
                    )
        return staticmethod(wrapper)
    return decorator
