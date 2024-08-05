import subprocess

import requests

from urllib3.exceptions import InsecureRequestWarning

""" librerias = ['beautifulsoup4', 'requests', 'urllib3', 'pandas', 'lxml', 'google.generativeai']
for libreria in librerias:
    try:
        subprocess.check_call(['pip', 'install', libreria])
        print(f"La librería {libreria} ha sido instalada correctamente.")
    except subprocess.CalledProcessError:
        print(f"Error al instalar la librería {libreria}.")
        
        # Deshabilitar las advertencias de solicitud HTTP insegura
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)  """

from bs4 import BeautifulSoup
import csv
import pandas as pd




def get_html_from_url(url):
    try:
        # Realizar una solicitud GET a la URL especificada
        response = requests.get(url, verify=False)
        # Verificar si la solicitud fue exitosa (código de estado 200)
        if response.status_code == 200:
            # Devolver el contenido HTML de la página
            return response.text
        else:
            print(f"Error al obtener HTML: {response.status_code}")
    except Exception as e:
        print(f"Error al obtener HTML: {e}")
    return None

# URL de la página web a la que deseas acceder
url = "https://github.com"

# Obtener el HTML de la página web
html_content = get_html_from_url(url)

# Verificar si se obtuvo el HTML correctamente
if html_content:
    pass
    
else:
    print("No se pudo obtener el HTML de la página.")
    
    
def encontrar_subetiquetas(elemento, prefijo_padre="", contador_etiquetas=None, clas_elementos=None):
    if contador_etiquetas is None:
        contador_etiquetas = {}
    if clas_elementos is None:
        clas_elementos = {}

    etiqueta = elemento.name
    contador_etiquetas[etiqueta] = contador_etiquetas.get(etiqueta, 0) + 1
    clave = f"{prefijo_padre}{etiqueta}_{contador_etiquetas[etiqueta]}"

    if elemento.name not in ["script", "style"] and elemento.string and elemento.string.strip():
        clas_elementos[clave] = elemento.string.strip()

    for i, sub_elemento in enumerate(elemento.children, start=1):
        if sub_elemento.name:
            prefijo_actual = f"{clave}_" if prefijo_padre else f"{etiqueta}_{contador_etiquetas[etiqueta]}_"
            encontrar_subetiquetas(sub_elemento, prefijo_padre=prefijo_actual, contador_etiquetas=contador_etiquetas, clas_elementos=clas_elementos)

    return clas_elementos

soup = BeautifulSoup(html_content, 'html.parser')

clas_elementos = {}
listaSoup = soup.find("body").find_all(recursive=False)
contador_etiquetas = {}

for elemento in listaSoup:
    clas_elementos.update(encontrar_subetiquetas(elemento, contador_etiquetas=contador_etiquetas))

csv_filename = "elementos_extraccion.csv"
with open(csv_filename, mode='w', newline='', encoding='utf-8') as csv_file:
    fieldnames = ['clave', 'contenido']
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames)
    writer.writeheader()
    for clave, contenido in clas_elementos.items():
        writer.writerow({'clave': clave, 'contenido': contenido})


# Cargar el archivo CSV
csv_filename = "elementos_extraccion.csv"
data = pd.read_csv(csv_filename)

# Función para analizar el HTML y extraer el contenido
def parse_html(html_content):
    soup = BeautifulSoup(html_content, 'lxml')
    elements = soup.find_all(True)  # Encuentra todos los elementos HTML
    data = []

    for element in elements:
        selector = element.name
        if element.attrs:
            for attr, value in element.attrs.items():
                if isinstance(value, list):
                    value = ' '.join(value)
                selector += f'[{attr}="{value}"]'
        content = element.get_text(strip=True)
        if content:  # Solo agregar si hay contenido
            data.append([selector, content])

    df = pd.DataFrame(data, columns=['label', 'text'])
    return df



# Parsear el HTML y crear el DataFrame
data = parse_html(html_content)

# Convertir las etiquetas a enteros
data['label'] = data['label'].astype('category').cat.codes