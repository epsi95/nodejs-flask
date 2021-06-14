const http = require('http');
const pynode = require('@fridgerator/pynode');

const PORT = 8080;

// setting up pynode
pynode.dlOpen('libpython3.8.so')
pynode.startInterpreter()
pynode.appendSysPath('./')
pynode.appendSysPath('./wsgi_python_venv/lib/python3.8/site-packages')
pynode.openFile('glue')

const requestListener = function (req, res) {
    const env = {
        'REQUEST_METHOD': req.method,
        'SCRIPT_NAME': '',
        'PATH_INFO': req.url.indexOf('?') == -1 ? req.url : req.url.slice(0, req.url.indexOf('?')),
        'QUERY_STRING': req.url.indexOf('?') == -1 ? '' : req.url.slice(req.url.indexOf('?')+1),
        'CONTENT_TYPE': '', // more important POST, PUT request, but we will do only for GET
        'CONTENT_LENGTH': '', // same as above
        'SERVER_NAME': '127.0.0.1',
        'SERVER_PORT': PORT + '',
        'SERVER_PROTOCOL': 'HTTP/1.1',
    }
    for(let k of Object.keys(req.headers)){
        env[`HTTP_${k.toUpperCase()}`] = req.headers[k];
    }
    pynode.call('glue', env, (err, result) => {
        if(err) return res.end('error');
        console.log(result);
        for(let i of result.headers){
            res.setHeader(...i);
        }
        res.statusCode  = +result.status.split(' ')[0];
        res.write(result.message);
        res.end();
    });
}

const server = http.createServer(requestListener);
server.listen(PORT);
