import requests
from urllib3.exceptions import InsecureRequestWarning

# Deshabilitar las advertencias de solicitud HTTP insegura
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

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
url = "https://campus.ort.edu.ar/secundaria/belgrano/"

# Obtener el HTML de la página web
html_content = get_html_from_url(url)

# Verificar si se obtuvo el HTML correctamente
if html_content:
    print("Contenido HTML obtenido correctamente:")
    print(html_content)
else:
    print("No se pudo obtener el HTML de la página.")
