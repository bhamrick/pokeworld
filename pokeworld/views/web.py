from pokeworld.lib.session import web, ajax
from pokeworld.constants import PATH_PREFIX

import os.path
import simplejson as json

class WebView:
    @web(template="web/home.tmpl")
    def home(request):
        return {'project' : 'pokeworld'}

    @web(template="web/view_map.tmpl")
    def view_map(request):
        game = request.matchdict['game']
        map_id = request.matchdict['mapid']
        filename = os.path.join(PATH_PREFIX, 'resources/%s/maps/%s.json' % (game, map_id))
        with open(filename) as f:
            map_dict = json.loads(f.read())
        map_dict['use_minimap'] = 'minimap_img' in map_dict
        return map_dict
