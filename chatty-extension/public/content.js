const html = document.documentElement.outerHTML;
console.log(html);
chrome.runtime.sendMessage({ action: "captureHTML", data: html });


fetch('http://localhost:3000/data')
  .then(response => response.json())
  .then(data => {
    console.log('Received data:', data);
    chrome.runtime.sendMessage({ action: "getData", data: data });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
