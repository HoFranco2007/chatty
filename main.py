from bs4 import BeautifulSoup
import prueba

def encontrar_subetiquetas(elemento, prefijo_padre="", contador_etiquetas=None):
    if contador_etiquetas is None:
        contador_etiquetas = {}

    etiqueta = elemento.name
    contador_etiquetas[etiqueta] = contador_etiquetas.get(etiqueta, 0) + 1
    clave = f"{prefijo_padre}{etiqueta}_{contador_etiquetas[etiqueta]}"

    # Si el elemento hijo tiene contenido, agregarlo al diccionario
    if elemento.name not in ["script", "style"] and elemento.string and elemento.string.strip():
        clas_elementos[clave] = elemento.string.strip()

    # Recorrer las subetiquetas recursivamente
    for i, sub_elemento in enumerate(elemento.children, start=1):
        if sub_elemento.name:
            prefijo_actual = f"{clave}_" if prefijo_padre else f"{etiqueta}_{contador_etiquetas[etiqueta]}_"
            encontrar_subetiquetas(sub_elemento, prefijo_padre=prefijo_actual, contador_etiquetas=contador_etiquetas)

#with open("extracciontest.html") as test:
#   prueba = test.read()

clas_elementos = {}

soup = BeautifulSoup(prueba.html_content, 'html.parser')

listaSoup = soup.find("body").find_all(recursive=False)  # Encuentra solo los elementos directos dentro del cuerpo

contador_etiquetas = {}

for elemento in listaSoup:
    encontrar_subetiquetas(elemento, contador_etiquetas=contador_etiquetas)

# Imprimir el diccionario resultante
for key, value in clas_elementos.items():
    print(f"{key}: \"{value}\"")
