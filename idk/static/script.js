// static/script.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('JavaScript está cargado y listo.');
    
    fetch('/get-string')
        .then(response => response.json())
        .then(data => {
            var messageElement = document.getElementById('message');
            messageElement.textContent = data.my_string;
        })
        .catch(error => console.error('Error fetching string:', error));
});
