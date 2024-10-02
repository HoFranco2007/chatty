const changePosition = () => {
  chrome.storage.local.get(['positionBottom', 'positionLeft'], ({ positionBottom, positionLeft }) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: (positionBottom, positionLeft) => {
            const popupButton = document.getElementById('popup-button');
            const chatty = document.getElementById('chatty-img');
            const htmlButton = document.getElementById('html-button');

            if (popupButton) {
              popupButton.addEventListener('mouseover', () => {
                popupButton.style.backgroundColor = '#FF0000';
                popupButton.style.width = '6vw';
                chatty.style.animationPlayState = 'running';
                chatty.style.animation = 'rotate 0.7s linear';
                
              },`false`);
              popupButton.addEventListener('mouseout', () => {
                popupButton.style.backgroundColor = '#CCCCCC';
                popupButton.style.width = '5vw'
                chatty.style.animation = 'none';
                chatty.style.animationPlayState = 'initial';
              },`false`);
              htmlButton.addEventListener('mouseover', () => {
                htmlButton.style.backgroundColor = '#FF0000';
              }, `false`);
              htmlButton.addEventListener('mouseout', () => {
                htmlButton.style.backgroundColor = '#CCCCCC';
              }, `false`);
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
              const newChattySection = document.createElement('section');
              const newPopupButton = document.createElement('button');
              const newHTMLButton = document.createElement('button');
              const newChatty = document.createElement('img');
              const newHTMLButtonIMG = document.createElement('img');

              newChatty.id = 'chatty-img';
              newChatty.src = chrome.runtime.getURL("/chatty.png");
              newChatty.style.position = 'fixed';
              newChatty.style.width = '3vw';
              newChatty.style.height = '3vh';
              newChatty.style.zIndex = '9999';
              newChatty.style.opacity = '1'; 
              newChatty.style.animationPlayState = 'paused';
              
              newHTMLButtonIMG.src = chrome.runtime.getURL("/htmlImg.svg");
              newHTMLButtonIMG.style.width = '2vw';
              newHTMLButtonIMG.style.height = '2vw';
              newHTMLButtonIMG.style.zIndex = '9999';
              newHTMLButtonIMG.style.opacity = '1';

              newPopupButton.appendChild(newChatty); 
              newPopupButton.id = 'popup-button';
              newPopupButton.style.width = '5.5vw';
              newPopupButton.style.height = '6vh';
              newPopupButton.style.zIndex = '9999';
              newPopupButton.style.display = 'flex';
              newPopupButton.style.justifyContent = 'center';
              newPopupButton.style.alignItems = 'center';
              newPopupButton.style.borderTopLeftRadius = '40vw';
              newPopupButton.style.borderBottomLeftRadius = '40vw';
              newPopupButton.style.backgroundColor = '#CCCCCC';
              newPopupButton.style.border = 'none';
              newPopupButton.style.cursor = 'pointer';
              newPopupButton.style.transition = 'all 0.2s ease-in-out';

              newHTMLButton.appendChild(newHTMLButtonIMG);
              newHTMLButton.id = 'html-button';
              newHTMLButton.style.width = '3.5vw';
              newHTMLButton.style.height = '3.5vw';
              newHTMLButton.style.zIndex = '9999';
              newHTMLButton.style.display = 'flex'
              newHTMLButton.style.justifyContent = 'center';
              newHTMLButton.style.alignItems = 'center';
              newHTMLButton.style.borderRadius = '100vw';
              newHTMLButton.style.backgroundColor = '#CCCCCC';
              newHTMLButton.style.border = 'none';
              newHTMLButton.style.cursor = 'pointer';
              newHTMLButton.style.marginBottom = '1vh';
              newHTMLButton.style.transition = 'all 0.2s ease-in-out';

              newChattySection.appendChild(newHTMLButton);
              newChattySection.appendChild(newPopupButton);
              newChattySection.style.position = 'fixed';
              newChattySection.style.bottom = "0";
              newChattySection.style.right = "0";
              newChattySection.style.display = 'flex';
              newChattySection.style.flexDirection = 'column';
              newChattySection.style.justifyContent = 'center';
              newChattySection.style.alignItems = 'center';
              newChattySection.style.marginBottom = '3vh';
              document.body.appendChild(newChattySection);
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
