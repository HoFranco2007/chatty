const html = document.documentElement.outerHTML;
console.log(html);
chrome.runtime.sendMessage({ action: "captureHTML", data: html });