import os
import google.generativeai as genai

genai.configure(api_key="AIzaSyBzdj7Fi4I7mxwPCg-QvVtfdX93vRgpaFI")

# Crear el modelo generativo
model = genai.GenerativeModel('gemini-1.5-flash')

# Generar contenido
response = model.generate_content("")
print(response.text)
