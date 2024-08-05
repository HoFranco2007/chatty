document.getElementById('highlightButton').addEventListener('click', () => {
    const text = document.getElementById('highlightText').value;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab) {
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
