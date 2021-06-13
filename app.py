from flask import Flask, render_template, jsonify, request
app = Flask(__name__)

@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/query')
def hajji():
    return jsonify(request.args)
