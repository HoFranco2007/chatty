chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => {
        const chatty = document.createElement('img');
        chatty.src = chrome.runtime.getURL("/chatty.png");
        chatty.style.position = 'absolute';
        chatty.style.bottom = '0';
        chatty.style.right = '0';
        chatty.style.width = '300px';
        chatty.style.height = '300px';
        chatty.style.zIndex = '9999';
        document.body.appendChild(chatty);
      }
    });
  }
});