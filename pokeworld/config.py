from pokeworld.views.web import WebView

def routes(config):
    config.add_static_view('static', 'static', cache_max_age=3600)

