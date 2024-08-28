const html = document.documentElement.outerHTML;
console.log(html);
chrome.runtime.sendMessage({ action: "captureHTML", data: html });


fetch('http://localhost:3000/getData',
  {mode: 'no-cors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({html: html})
  }
)
  .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    console.log('Received data:', data);
    chrome.runtime.sendMessage({ action: "getData", data: data });
})
.catch(error => {
    console.error('Error fetching data:', error);
});