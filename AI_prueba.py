import subprocess
from urllib3.exceptions import InsecureRequestWarning
import csv
import pandas as pd
from sklearn.model_selection import train_test_split
import requests
from urllib3.exceptions import InsecureRequestWarning

""" librerias = ['beautifulsoup4', 'torch', 'transformers', 'scikit-learn', 'lxml', 'transformers[torch] accelerate -Ufff', 'google.generativeai']
for libreria in librerias:
    try:
        subprocess.check_call(['pip', 'install', libreria])
        print(f"La librería {libreria} ha sido instalada correctamente.")
    except subprocess.CalledProcessError:
        print(f"Error al instalar la librería {libreria}.")
        
        # Deshabilitar las advertencias de solicitud HTTP insegura
requests.packages.urllib3.disable_warnings(InsecureRequestWarning) """

from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
from transformers import pipeline
from bs4 import BeautifulSoup
import torch


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
url = "https://github.com/"

# Obtener el HTML de la página web
html_content = get_html_from_url(url)

# Verificar si se obtuvo el HTML correctamente
if html_content:
    print("Contenido HTML obtenido correctamente:")
    
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

print(html_content)

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

""" # Dividir los datos en conjuntos de entrenamiento y validación
train_texts, val_texts, train_labels, val_labels = train_test_split(data['text'], data['label'], test_size=0.4, random_state=42)

# Tokenizar los textos
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
train_encodings = tokenizer(list(train_texts), truncation=True, padding=True)
val_encodings = tokenizer(list(val_texts), truncation=True, padding=True)

# Definir la clase del dataset
class WebElementsDataset(torch.utils.data.Dataset):
    def __init__(self, encodings, labels):
        self.encodings = encodings
        self.labels = labels

    def __getitem__(self, idx):
        item = {key: torch.tensor(val[idx]) for key, val in self.encodings.items()}
        item['labels'] = torch.tensor(self.labels[idx])
        return item

    def __len__(self):
        return len(self.labels)

# Crear los datasets de entrenamiento y validación
train_dataset = WebElementsDataset(train_encodings, list(train_labels))
val_dataset = WebElementsDataset(val_encodings, list(val_labels))

# Cargar el modelo BERT preentrenado
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=data['label'].nunique())

# Configurar los argumentos de entrenamiento
training_args = TrainingArguments(
    output_dir='./results',
    num_train_epochs=3,
    per_device_train_batch_size=8,  # Disminuir el tamaño del batch
    per_device_eval_batch_size=16,  # Disminuir el tamaño del batch
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir='./logs',
    logging_steps=10,
)

# Crear el entrenador
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=val_dataset,
)

# Entrenar el modelo
trainer.train()

# Guardar el modelo y el tokenizador entrenados
model.save_pretrained('./web_element_classifier')
tokenizer.save_pretrained('./web_element_classifier') """
