from pokeworld.lib.session import web, ajax

import simplejson as json

class WebView:
    @web(template="web/home.tmpl")
    def home(request):
        return {'project' : 'pokeworld'}

    @web(template="web/view_map.tmpl")
    def view_map(request):
        game = request.matchdict['game']
        map_id = request.matchdict['mapid']
        with open("/app/pokeworld/resources/%s/maps/%s.json" % (game, map_id)) as f:
            map_dict = f.read()
        return map_dict
