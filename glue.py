from app import app

def glue(env):
    # adding additional parameters to env
    env['wsgi.version'] = (1,0)
    env['wsgi.url_scheme']  = 'http'
    env['wsgi.input'] = ''
    env['wsgi.errors'] = ''
    env['wsgi.multithread'] = False
    env['wsgi.multiprocess'] = True
    env['wsgi.run_once'] = False

    g_status = None
    g_headers = None

    def start_response(status, response_headers):
        nonlocal g_headers, g_status
        g_status = status
        g_headers = [list(i) for i in response_headers]

    response = app(env, start_response)

    data = {'status': g_status, 
            'headers': g_headers, 
            'message': ''.join(list(map(lambda x: x.decode(), response)))
    }

    return data