document.getElementById('highlightButton').addEventListener('click', () => {
    const text = document.getElementById('highlightText').value;

    // Enviar texto al servidor Flask
    fetch('http://localhost:5000/send-string', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })
    .then(response => response.json())
    .then(data => {
        const classToHighlight = data.received_text; // Clase devuelta por Flask
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            if (tab) {
                chrome.tabs.sendMessage(tab.id, { action: "highlight", text: classToHighlight }, (response) => {
                    if (chrome.runtime.lastError) {
                        console.error('Error sending message:', chrome.runtime.lastError.message);
                    }
                });
            } else {
                console.error('No active tab found.');
            }
        });
    })
    .catch(error => console.error('Error sending string:', error));
});
