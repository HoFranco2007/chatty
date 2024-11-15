import requests
from flask import Flask, request, jsonify
from bs4 import BeautifulSoup 
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from sentence_transformers import SentenceTransformer
import numpy as np
import google.generativeai as genai
import re

clas_elementos = {}
pregunta = "how i can sign up github"

def encontrar_subetiquetas(elemento, prefijo_padre="", contador_etiquetas=None, nivel=0):
    if contador_etiquetas is None:
        contador_etiquetas = {}
    clases = elemento.get('class', [])
    clases_str = " ".join(clases) if clases else elemento.get('id', None)
    if not clases_str:  
        clases_str = f"posicion_{nivel}"

    contador_etiquetas[clases_str] = contador_etiquetas.get(clases_str, 0) + 1

    clave_clase = f"{clases_str}"

    clave_posicion = f"{contador_etiquetas[clases_str]}"

    if elemento.name not in ["script", "style"] and elemento.string and elemento.string.strip():
        clas_elementos[f"{clave_clase} - {clave_posicion}"] = elemento.string.strip()

    for sub_elemento in elemento.children:
        if sub_elemento.name:
            prefijo_actual = f"{clave_clase} - {clave_posicion}_"
            encontrar_subetiquetas(sub_elemento, prefijo_padre=prefijo_actual, contador_etiquetas=contador_etiquetas, nivel=nivel + 1)


modelo = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

def buscar_identificador(dataset, pregunta):
    similar = True
    textos = list(dataset.values())
    ids = list(dataset.keys())

    embeddings_textos = modelo.encode(textos)
    embedding_pregunta = modelo.encode(pregunta)

    similitudes = cosine_similarity([embedding_pregunta], embeddings_textos)[0]

    indice_mas_similar = np.argmax(similitudes)
    identificador = ids[indice_mas_similar]

    if similitudes[indice_mas_similar] < 0.9:
        similar = False
    else:
        similar = True

    return identificador, similar

def extraer_entre_parentesis(texto):
    patron = r"(.*?)"
    resultado = re.search(patron, texto)
    if resultado:
      return resultado.group(1)
    else:
      return None


app = Flask(__name__)

@app.route('/analizar_html', methods=['POST'])
def analizar_html():
    try:
        data = request.get_json()
        html_content = data.get('html') 

        if not html_content:
            return jsonify({"error": "No HTML content provided"}), 400

        clas_elementos.clear()

        soup = BeautifulSoup(html_content, 'html.parser')

        body = soup.find("body")
        if body:
            print("Contenido del body:", body)
        else:
            print("No se encontró la etiqueta <body> en el HTML.")

        listaSoup = body.find_all(recursive=False) if body else []

        for elemento in listaSoup:
            encontrar_subetiquetas(elemento)

        identificador, similar = buscar_identificador(clas_elementos, pregunta)

        if similar:
            return jsonify({"response": identificador})
        else:
            strList = ["con lo anterior y mostrando solamente la clase que cumpla los requisitos y sin caracteres especiales, y solo entre paréntesis, decime " + pregunta]
            genai.configure(api_key="AIzaSyBzdj7Fi4I7mxwPCg-QvVtfdX93vRgpaFI")
            model = genai.GenerativeModel('gemini-1.5-flash')
            response = model.generate_content([strList])
            texto = response.text
            resultado = extraer_entre_parentesis(texto)
            return jsonify({"response": resultado})



    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
