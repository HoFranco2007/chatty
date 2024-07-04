import os
import google.generativeai as genai
import re
import dataColector as dt

genai.configure(api_key="AIzaSyBzdj7Fi4I7mxwPCg-QvVtfdX93vRgpaFI")


data_content = dt.data

content_list = data_content.astype(str).values.flatten().tolist()

def respuesta(inputUsu: str):

    textoref = "usando el codigo html proporcionado antes"
    textodef = "pasar solamente el paso numero 1 ya estando en la pagina para saber ESPECIFICAMENTE EL SELECTOR UNICO QUE DIFERENCIE AL OBJETO, colocar al selector entre parentesis"
    textodef = textoref + textodef + inputUsu
    inputContent = [item + textodef for item in content_list]

    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content(inputContent)
    txt = response.text
    print(txt)

    patron = r'\((.*?)\)'
    resultado = re.search(patron, txt, re.DOTALL)

    if resultado:
        texto_extraido = resultado.group(1).strip()
        return texto_extraido
    else:
        print("No se encontraron selectores para tu accion.")
