# nodejs-flask

<img src="./image/flask_node.png" alt="flask-node">

Since Flask is WSGI compatible web-framework which can run on top of any WSGI compatible webservers like Gunicorn, mod_wsgi etc (<a href="https://wsgi.readthedocs.io/en/latest/servers.html">full list</a>), I was thinking why not make node.js server WSGI complient. 

This is my small effort, not efficient in any way, but I was trying to see whether I can run a Flask app on node.js server or not.

And it worked! So now any WSGI complient web app like Django will run on this.

I worked this code in `Ubuntu 20.04.2 LTS`, `node v14.17.0`, `python 3.8.5` not quite sure about other operating systems. Check PyNode docs if any issue regarding running python code.

```
# set up virtual environment
$ python -m venv wsgi_python_venv

$ source ./wsgi_python_venv/bin/activate

# install python packages
(wsgi_python_venv)$ pip install -r requirements.txt

# set up pynode
# https://github.com/fridgerator/PyNode#installation

(wsgi_python_venv)$ git clone https://github.com/nodejs/gyp-next

(wsgi_python_venv)$ cd gyp-next

(wsgi_python_venv)/gyp-next$ python setup.py install

(wsgi_python_venv)/gyp-next$ cd ..

(wsgi_python_venv)$ npm init -y

# install node modules
(wsgi_python_venv)$ npm i
```

---

Referances:

1. <a href="https://www.python.org/dev/peps/pep-3333/">PEP 333(3)</a>

2. <a href="https://github.com/fridgerator/PyNode">PyNode</a>
3. <a href="https://nodejs.dev/learn/the-nodejs-http-module">node http module</a>
