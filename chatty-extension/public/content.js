chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        if (tab && tab.url) {
            const url = tab.url;
            console.log('Current tab URL:', url);

            fetch('http://localhost:3000/getData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url: url })
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(`Network response was not ok: ${response.status} ${response.statusText} - ${text}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                chrome.runtime.sendMessage({ action: "getData", data: data });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
    });
});
