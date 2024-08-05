document.getElementById('highlightButton').addEventListener('click', () => {
    const text = document.getElementById('highlightText').value;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab) {
            // Enviar datos al servidor Node.js
            fetch('http://localhost:3000/highlight', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: text })
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    console.log('Data sent successfully.');
                } else {
                    console.error('Error sending data.');
                }
            })
            .catch(error => console.error('Error:', error));

            chrome.tabs.sendMessage(tab.id, { action: "highlight", text: text }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error('Error sending message:', chrome.runtime.lastError.message);
                }
            });
        } else {
            console.error('No active tab found.');
        }
    });
});
