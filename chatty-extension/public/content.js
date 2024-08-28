const html = document.documentElement.outerHTML;
console.log(html);
chrome.runtime.sendMessage({ action: "captureHTML", data: html });


fetch('http://localhost:3000/getData', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ html: html })
})
.then(response => {
    if (!response.ok) {
        return response.text().then(text => {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText} - ${text}`);
        });
    }
    return response.json(); // Assuming the server returns JSON
})
.then(data => {
    console.log('Received data:', data);
    chrome.runtime.sendMessage({ action: "getData", data: data });
})
.catch(error => {
    console.error('Error fetching data:', error);
});