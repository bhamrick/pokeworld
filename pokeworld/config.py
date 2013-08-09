from pokeworld.views.web import WebView

def routes(config):
    config.add_static_view('static', 'static', cache_max_age=3600)

    config.add_route('root', '')
    config.add_view(WebView.home, route_name='root')

    config.add_route('view_map', '/{game}/{mapid}')
    config.add_view(WebView.view_map, route_name='view_map')
