import tensorflow as tf
from tensorflow.keras.layers import Input, LSTM, Dense, Embedding, Dropout
from tensorflow.keras.models import Model
import numpy as np
import wikipediaapi


# Especificar un user agent personalizado
user_agent = "Your-User-Agent-Name/1.0"


# Inicializar el cliente de la API de Wikipedia con el user agent especificado
wiki_wiki = wikipediaapi.Wikipedia(user_agent=user_agent)


# Función para obtener texto de Wikipedia y extraer palabras
def get_wikipedia_text(topic):
    page = wiki_wiki.page(topic)
    if page.exists():
        return page.text.split()
    else:
        print("El tema no existe en Wikipedia.")
        return []


wiki_topics = [
    "Artificial intelligence",
    "Machine learning",
    "Deep learning",
    "Natural language processing",
    "Large language model"
]


# Construir el vocabulario utilizando las palabras de los temas de Wikipedia
vocab = set()
for topic in wiki_topics:
    words = get_wikipedia_text(topic)
    vocab.update(words)


# Convertir el conjunto de palabras en una lista para poder indexarlas
vocab = list(vocab)


# Crear un diccionario para mapear palabras a índices y viceversa
word2idx = {word: idx for idx, word in enumerate(vocab)}
idx2word = {idx: word for word, idx in word2idx.items()}


# Definir el tamaño máximo de la secuencia y el tamaño del vocabulario
max_sequence_length = 750
vocab_size = len(vocab)


def generate_train_exam(num_examples):


    X = []
    y = []


    for _ in range(num_examples):
        # Generar una secuencia de palabras aleatoria de longitud máxima max_sequence_length
        sequence_length = np.random.randint(5, max_sequence_length) # Ajustar la secuencia
        sequence = [np.random.choice(vocab) for _ in range(sequence_length)] # Convertir de palabras a índices
        X.append([word2idx[word] for word in sequence]) # Agregar la siguiente palabra como etiqueta (target)
        y.append(word2idx[np.random.choice(vocab)]) # Pad sequences para que tengan la misma longitud
    

    X_padded = tf.keras.preprocessing.sequence.pad_sequences(X, maxlen=max_sequence_length)
    return np.array(X_padded), np.array(y)


# Definir el modelo de lenguaje
input_layer = Input(shape=(max_sequence_length,))
embedding_layer = Embedding(input_dim=vocab_size, output_dim=128)(input_layer)  # Mantener la dimensión del embedding
lstm_layer = LSTM(256, return_sequences=True)(embedding_layer)  # Mantener las salidas de la secuencia LSTM
lstm_layer = LSTM(256)(lstm_layer)  # Agregar otra capa LSTM
dropout_layer = Dropout(0.2)(lstm_layer)  # Agregar una capa de dropout
output_layer = Dense(vocab_size, activation='softmax')(dropout_layer)


model = Model(inputs=input_layer, outputs=output_layer)
model.compile(loss='sparse_categorical_crossentropy', optimizer='adam')


X_train, y_train = generate_train_exam(10000)  # Aumentar la cantidad de ejemplos de entrenamiento


model.fit(X_train, y_train, epochs=45, batch_size=64, verbose=1)  # Ajustar los hiperparámetros de entrenamiento


def generate_text(model, seed_text, num_words=100):
    for _ in range(num_words):
        # Convertir el texto de entrada a índices
        seed_sequence = [word2idx[word] for word in seed_text.split() if word in vocab] # Pad sequence si es necesario
        seed_sequence = tf.keras.preprocessing.sequence.pad_sequences([seed_sequence], maxlen=max_sequence_length) # Predecir la siguiente palabra
        predicted_idx = np.argmax(model.predict(seed_sequence), axis=-1) # Convertir el índice predicho a palabra y añadirlo al texto de salida
        next_word = idx2word[int(predicted_idx)]
        seed_text += " " + next_word
    return seed_text


seed_text = "Artificial intelligence"
generated_text = generate_text(model, seed_text)
print("Generated Text:", generated_text)