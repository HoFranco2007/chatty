const changePosition = () => {
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
                const elements = document.querySelectorAll('*');
                elements.forEach(element => {
                  if (!element.classList.contains('HeaderMenu-link--sign-up' || 'chatty-img')) {
                    element.style.backgroundColor = '';
                  } else if (element.className === 'home-campaign-hero') {
                      element.style.opacity = '0';
                  } else {
                        element.style.backgroundColor = '#85F900';
                        element.style.color = '#000000';
                    }
                  }
                )};
            } else {
              const newChatty = document.createElement('img');
              newChatty.id = 'chatty-img';
              newChatty.src = chrome.runtime.getURL("/chatty.png");
              newChatty.style.position = 'fixed';
              newChatty.style.bottom = `${positionBottom}px`;
              newChatty.style.left = `${positionLeft}px`;
              newChatty.style.width = '200px';
              newChatty.style.height = '150px';
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

setInterval(changePosition, 100);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'captureHTML') {
      console.log('Captured HTML:', request.data);
  } else if (request.action === 'getData') {
      console.log('Received data:', request.data);
  }
});
