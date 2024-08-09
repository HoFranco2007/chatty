import os
import google.generativeai as genai
import re
import dataColector as dt

genai.configure(api_key="AIzaSyBzdj7Fi4I7mxwPCg-QvVtfdX93vRgpaFI")


data_content = dt.data

content_list = data_content.astype(str).values.flatten().tolist()

def respuesta(inputUsu: str):
    textoref = "usando el codigo html proporcionado antes"
    textodef = "pasame info general para"
    textodef = textoref + textodef + inputUsu
    inputContent = [item + textodef for item in content_list]

    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content(inputContent)

    # Imprimir la respuesta completa de la API
    print("Respuesta completa de la API:", response)

    # Obtener el texto generado
    txt = response.text
    print("Texto generado:", txt)

    # Devolver la respuesta completa en lugar del texto extraído
    return txt

