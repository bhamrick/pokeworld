from pokeworld.lib.session import web, ajax

class WebView:
    @web(template="web/home.tmpl")
    def home(request):
        return {'project' : 'pokeworld'}

    @ajax()
    def ajax_test(request):
        return [1, {'a' : 2, 'b' : 4}, 3]
