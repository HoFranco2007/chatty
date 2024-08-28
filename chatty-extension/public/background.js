const changePosition = () => {
  chrome.storage.local.get(['positionBottom', 'positionLeft'], ({ positionBottom, positionLeft }) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: (positionBottom, positionLeft) => {
            var id = null;
            const chatty = document.getElementById('chatty-img');
            if (chatty) {
              // var pos = 0;
              // clearInterval(id);
              // id = setInterval(frame, 10);
              // function frame() {
              //   if (pos === positionLeft) {
              //     clearInterval(id);
              //   } else {
              //     pos++; 
              //     chatty.style.bottom = pos + 'px'; 
              //     chatty.style.left = pos + 'px'; 
              //   }
              // }
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
              newChatty.id = 'chatty-img'
              newChatty.src = chrome.runtime.getURL("/chatty.png");
              newChatty.style.position = 'fixed';
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

setInterval(changePosition, 100);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'captureHTML') {
      console.log('Captured HTML:', request.data);
  } else if (request.action === 'getData') {
      console.log('Received data:', request.data);
  }
});
