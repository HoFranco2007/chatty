chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['injector.js']
    })
    .then(() => {
      console.log("Injected content script into tab:", tab.url);
    })
    .catch(err => console.error(err));
  }
});