const container = document.createElement('div');
container.id = 'nextjs-sidebar-container';
document.body.appendChild(container);

const script = document.createElement('script');
script.src = chrome.runtime.getURL('extension.js');
document.head.appendChild(script);

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = chrome.runtime.getURL('styles/globals.css');
document.head.appendChild(link)