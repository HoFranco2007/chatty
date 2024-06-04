const checkPosition = () => {
  chrome.storage.local.get(['positionBottom', 'positionLeft'], ({ positionBottom, positionLeft }) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: (positionBottom, positionLeft) => {
            const chatty = document.getElementById('chatty-img');
            if (chatty) {
              chatty.style.bottom = `${positionBottom}px`;
              chatty.style.left = `${positionLeft}px`;
              if (positionLeft > 0){
                document.getElementsByTagName('div')[0].style.opacity = '1';
                document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
              }
              else {
                document.getElementsByTagName('div')[0].style.opacity = '1';
                document.body.style.backgroundColor = 'rgba(0, 0, 0, 0)';
              }
            } else {
              const newChatty = document.createElement('img');
              newChatty.className = `transition-all duration-300 ease-in-out `
              newChatty.id = 'chatty-img'
              newChatty.src = chrome.runtime.getURL("/chatty.png");
              newChatty.style.position = 'absolute';
              newChatty.style.bottom = `${positionBottom}px`;
              newChatty.style.left = `${positionLeft}px`;
              newChatty.style.width = '300px';
              newChatty.style.height = '300px';
              newChatty.style.zIndex = '9999';
              newChatty.style.opacity = '1';
              document.body.appendChild(newChatty);
            }
          },
          args: [positionBottom, positionLeft]
        });
      }
    });
  });
};

setInterval(checkPosition, 100);
