# app.py
from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get-string')
def get_string():
    my_string = "Colorado puto"
    return jsonify({'my_string': my_string})

if __name__ == '__main__':
    app.run(debug=True)
