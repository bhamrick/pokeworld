from pokeworld.lib.session import web, ajax, data
from pokeworld.constants import PATH_PREFIX

from pyramid.httpexceptions import HTTPMovedPermanently

import os.path
import simplejson as json

class WebView:
    @staticmethod
    def home(request):
        return HTTPMovedPermanently(location='https://www.extratricky.com/pokeworld')

    @staticmethod
    def view_map(request):
        game = request.matchdict['game']
        map_id = request.matchdict['mapid']
        return HTTPMovedPermanently(location='https://www.extratricky.com/pokeworld/%s/%s' % (game, map_id))

    #@web(template="web/home.tmpl")
    #def home(request):
    #    return {'project' : 'pokeworld'}

    #@web(template="web/view_map.tmpl")
    #def view_map(request):
    #    game = request.matchdict['game']
    #    map_id = request.matchdict['mapid']

    #    filename = os.path.join(PATH_PREFIX, 'resources/%s/maps/%s.json' % (game, map_id))
    #    with open(filename) as f:
    #        map_dict = json.loads(f.read())
    #    for w in map_dict['warps']:
    #        w['px_x'] = w['x'] * 16
    #        w['px_y'] = w['y'] * 16
    #    map_dict['use_minimap'] = 'minimap_img' in map_dict
    #    map_dict['game'] = game
    #    return map_dict

    @data(content_type='image/x-icon')
    def favicon(request):
        with open("pokeworld/static/favicon.ico") as f:
            return f.read()
