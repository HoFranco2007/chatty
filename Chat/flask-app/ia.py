import os
import google.generativeai as genai
import re

genai.configure(api_key="AIzaSyBzdj7Fi4I7mxwPCg-QvVtfdX93vRgpaFI")

def respuesta(htmlcontent: str, inputUsu: str):
    # No es necesario convertir 'htmlcontent' en una lista, ya que es una cadena
    textohtml = " usando el código html proporcionado antes "
    textopregunta = " pásame el primer paso para la siguiente consulta: "
    textodef = textohtml + textopregunta + inputUsu

    # Combina el contenido HTML con la pregunta del usuario
    inputContent = htmlcontent + textodef

    # Crea una instancia del modelo de generación
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    # Genera la respuesta
    response = model.generate_content([inputContent])

    # Devuelve el texto de la respuesta
    return response.text
