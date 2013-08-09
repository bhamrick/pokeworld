from pokeworld.views.web import WebView

route_count = 0
def connect(config, path, view):
    global route_count
    route_name = 'route%d' % route_count
    route_count += 1
    config.add_route(route_name, path)
    config.add_view(view, route_name)

def routes(config):
    config.add_static_view('static', 'static', cache_max_age=3600)

    connect(config, '', WebView.home)
    connect(config, '/{game}/{mapid}', WebView.view_map)
