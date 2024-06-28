import os
import google.generativeai as genai

import AI_prueba as iA

genai.configure(api_key="AIzaSyBzdj7Fi4I7mxwPCg-QvVtfdX93vRgpaFI")


data_content = iA.data
# Assuming 'data_content' is a DataFrame and you want to convert it to a list of strings
content_list = data_content.astype(str).values.flatten().tolist()

texto = "Como inicio sesion en github?"

inputContent = [item + texto for item in content_list]

# Crear el modelo generativo
model = genai.GenerativeModel('gemini-1.5-flash')

# Generar contenido
response = model.generate_content(inputContent)
print(response.text)
