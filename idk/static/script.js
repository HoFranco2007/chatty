// static/script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript está cargado y listo.');

    // Captura el formulario
    const form = document.getElementById('textForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Previene que la página se recargue

        // Obtén el valor del campo de texto
        const userInput = document.getElementById('userInput').value;

        // Envía el texto al servidor
        fetch('/send-string', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: userInput })
        })
        .then(response => response.json())
        .then(data => {
            // Muestra la respuesta en la página
            var messageElement = document.getElementById('message');
            messageElement.textContent = "Texto recibido: " + data.received_text;
        })
        .catch(error => console.error('Error sending string:', error));
    });
});
