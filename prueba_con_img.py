import requests
from flask import Flask, request, jsonify
from bs4 import BeautifulSoup
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import re
import cv2
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.models import load_model

# Inicializa el modelo de detección visual
modelo_cnn = MobileNetV2(weights="imagenet")

# Inicializa Flask
app = Flask(__name__)

# Función para procesar la captura de pantalla
def procesar_imagen(imagen_b64):
    import base64
    from io import BytesIO
    from PIL import Image

    # Decodificar la imagen
    imagen_bytes = base64.b64decode(imagen_b64)
    imagen = Image.open(BytesIO(imagen_bytes)).convert("RGB")
    imagen = imagen.resize((224, 224))
    imagen_array = img_to_array(imagen)
    imagen_preprocesada = preprocess_input(imagen_array)
    return np.expand_dims(imagen_preprocesada, axis=0)

# Analiza el HTML
def analizar_html(html):
    clas_elementos = {}
    soup = BeautifulSoup(html, 'html.parser')
    body = soup.find("body")
    if not body:
        return clas_elementos

    def encontrar_subetiquetas(elemento, nivel=0):
        if elemento.name not in ["script", "style"]:
            clases = elemento.get('class', []) or elemento.get('id', None) or f"posicion_{nivel}"
            clas_elementos[f"{clases}"] = elemento.text.strip() if elemento.text else "NoText"
        for sub_elemento in elemento.children:
            if sub_elemento.name:
                encontrar_subetiquetas(sub_elemento, nivel + 1)

    encontrar_subetiquetas(body)
    return clas_elementos

# Combinar información visual y textual
def buscar_selector(html_dict, imagen_pred, pregunta):
    textos = list(html_dict.values())
    ids = list(html_dict.keys())

    # Crear TF-IDF para los textos
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(textos + [pregunta])
    
    # Calcular similitudes
    similitudes = cosine_similarity(tfidf_matrix[-1:], tfidf_matrix[:-1])[0]
    max_similitud = np.argmax(similitudes)

    # Validación con predicción visual
    if ids[max_similitud] in imagen_pred:
        return ids[max_similitud]
    return None

@app.route('/analizar', methods=['POST'])
def analizar():
    try:
        data = request.json
        imagen_b64 = data.get("imagen")
        html = data.get("html")
        pregunta = data.get("pregunta")

        if not imagen_b64 or not html or not pregunta:
            return jsonify({"error": "Missing data"}), 400

        # Procesar la imagen
        imagen_preprocesada = procesar_imagen(imagen_b64)
        predicciones = modelo_cnn.predict(imagen_preprocesada)

        # Análisis del HTML
        html_dict = analizar_html(html)

        # Buscar selector más relevante
        selector = buscar_selector(html_dict, predicciones, pregunta)

        if selector:
            return jsonify({"selector": selector})
        else:
            return jsonify({"error": "No selector found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
