from flask import Flask, jsonify, request

app = Flask(__name__)

import ia as i

# Ruta para recibir y procesar texto enviado desde el cliente
@app.route('/send-string', methods=['POST'])
def send_string():
    # Obtiene el JSON enviado desde el cliente
    data = request.get_json()

    # Extrae los campos 'html_content' y 'user_question' del JSON
    html_content = data.get('html_content', '')
    user_question = data.get('user_question', '')

    # Modifica el texto usando la función `respuesta` del módulo `ia`
    modified_text = i.respuesta(html_content, user_question)

    # Devuelve el texto modificado como una respuesta JSON
    return jsonify({'received_text': modified_text})

if __name__ == '__main__':
    app.run(debug=True)
