import requests
from flask import Flask, request, jsonify
from bs4 import BeautifulSoup 
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from sentence_transformers import SentenceTransformer
import numpy as np


clas_elementos = {}

# Función para encontrar subetiquetas dentro del HTML
def encontrar_subetiquetas(elemento, prefijo_padre="", contador_etiquetas=None, nivel=0):
    if contador_etiquetas is None:
        contador_etiquetas = {}

    # Obtener la clase o id del elemento, o usar la posición
    clases = elemento.get('class', [])
    clases_str = " ".join(clases) if clases else elemento.get('id', None)
    if not clases_str:  # Si no hay clase ni id, usar "posicion_X" local al nivel
        clases_str = f"posicion_{nivel}"

    # Crear un contador local para la posición en este nivel
    contador_etiquetas[clases_str] = contador_etiquetas.get(clases_str, 0) + 1

    # Clave basada en la clase, id o posición
    clave_clase = f"{clases_str}"

    # Separar la posición del resto de la clave
    clave_posicion = f"{contador_etiquetas[clases_str]}"

    # Si el elemento tiene contenido, agregarlo al diccionario
    if elemento.name not in ["script", "style"] and elemento.string and elemento.string.strip():
        clas_elementos[f"{clave_clase} - {clave_posicion}"] = elemento.string.strip()

    # Recorrer las subetiquetas recursivamente
    for sub_elemento in elemento.children:
        if sub_elemento.name:
            prefijo_actual = f"{clave_clase} - {clave_posicion}_"
            encontrar_subetiquetas(sub_elemento, prefijo_padre=prefijo_actual, contador_etiquetas=contador_etiquetas, nivel=nivel + 1)


# Cargar el modelo de SentenceTransformer
modelo = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

# Función para buscar el identificador más similar usando similitud coseno
def buscar_identificador(dataset, pregunta):
    similar = True
    textos = list(dataset.values())  # Todos los textos en el dataset
    ids = list(dataset.keys())  # Las claves (ID o clases)

    # Vectorizamos los textos del dataset y la pregunta
    embeddings_textos = modelo.encode(textos)
    embedding_pregunta = modelo.encode(pregunta)

    # Calculamos similitudes coseno
    similitudes = cosine_similarity([embedding_pregunta], embeddings_textos)[0]

    # Encontramos el índice del texto más similar
    indice_mas_similar = np.argmax(similitudes)
    identificador = ids[indice_mas_similar]  # La clave (ID o clase) más similar

    if similitudes[indice_mas_similar] < 0.9:
        similar = False
    else:
        similar = True

    return identificador, similar



# Crear la aplicación Flask
app = Flask(__name__)

@app.route('/analizar_html', methods=['POST'])
def analizar_html():
    try:
        # Recibimos los datos en formato JSON
        data = request.get_json()
        html_content = data.get('html')  # Extraemos el HTML de la solicitud

        # Verificamos si el contenido HTML fue recibido
        if not html_content:
            return jsonify({"error": "No HTML content provided"}), 400
        
        # Limpiamos el diccionario global antes de procesar nuevo HTML
        clas_elementos.clear()

        # Analizar el contenido HTML
        soup = BeautifulSoup(html_content, 'html.parser')

        # Verifica que el contenido del body no esté vacío
        body = soup.find("body")
        if body:
            print("Contenido del body:", body)
        else:
            print("No se encontró la etiqueta <body> en el HTML.")

        # Encontrar solo los elementos directos dentro del cuerpo
        listaSoup = body.find_all(recursive=False) if body else []

        # Iterar sobre los elementos de nivel superior
        for elemento in listaSoup:
            encontrar_subetiquetas(elemento)

        # Llamamos a la función de búsqueda de identificador
        identificador, similar = buscar_identificador(clas_elementos, "how i can sign up github")

        # Si se encontró un identificador similar, lo devolvemos
        if similar:
            # Solo devolver el primer identificador relevante
            return jsonify({"response": identificador})  # Devolvemos solo el identificador

        else:
            return jsonify({"error": "No se encontró un identificador relevante."}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)
