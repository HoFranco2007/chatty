from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

# Variable global para almacenar el texto enviado
user_text = ""

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get-string')
def get_string():
    my_string = "Variable python"
    return jsonify({'my_string': my_string})

@app.route('/send-string', methods=['POST'])
def send_string():
    global user_text
    data = request.get_json()
    user_text = data.get('text', '')
    return jsonify({'received_text': user_text})

if __name__ == '__main__':
    app.run(debug=True)
