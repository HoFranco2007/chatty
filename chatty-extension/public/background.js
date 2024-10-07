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
                popupButton.style.backgroundColor = '#85F900';
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
                htmlButton.style.backgroundColor = '#85F900';
              }, false);

              htmlButton.addEventListener('mouseout', () => {
                htmlButton.style.backgroundColor = '#CCCCCC';
              }, false);

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

              const sidebar = document.createElement('div');
              sidebar.id = 'custom-sidebar'; 
              sidebar.innerHTML = `
              <section>
                <div>
                  <button class="cruz"><img src="https://cdn-icons-png.flaticon.com/512/64/64498.png"/></button>
                </div>
                <div class="chatbot">
                  <h2>Hola,</h2>
                  <p>¿En qué puedo ayudarte hoy?</p>
                  <div id="chat-messages" style="height: 60vh; margin-bottom: 10px;"></div>
                    <div>
                      <input id="chat-input" type="text" placeholder="Escribe tu mensaje" />
                      <button id="send-message" >Enviar</button>
                    </div>
                  </div>
                </div>  
              </section>  
                <style>
                  #custom-sidebar {
                    position: fixed;
                    top: 0;
                    right: -300px;
                    width: 300px;
                    height: 100vh;
                    background-color: #fff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                    z-index: 9999;
                    font-family: Arial, sans-serif;
                    transition: all 0.3s ease-in-out;
                  }

                  .cruz {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: #ffffff;
                    border: none;
                    cursor: pointer;
                    padding: 15px 20px 15px 20px;
                    margin-bottom: 20px;
                    border-top-left-radius: 50vw;
                    border-bottom-left-radius: 50vw;
                    transition: all 0.3s ease-in-out;
                  }

                  .cruz:hover {
                    background-color: #85F900;
                    transition: all 0.3s ease-in-out;
                  }

                  .cruz img {
                    width: 15px;
                  }

                  #custom-sidebar h2 {
                    padding: 20px;
                    font-size: 22px;
                    margin: 0;
                  }

                  #custom-sidebar p {
                    padding: 0 20px;
                    font-size: 16px;
                  }

                  #custom-sidebar ul {
                    list-style-type: none;
                    padding: 0 20px;
                  }

                  #custom-sidebar ul li {
                    padding: 10px 0;
                    cursor: pointer;
                    font-size: 16px;
                  }

                  #custom-sidebar ul li:hover {
                    background-color: #f0f0f0;
                  }

                  #custom-sidebar-show {
                    position: fixed;
                    top: 0;
                    right: 0;
                    z-index: 9999;
                    font-family: Arial, sans-serif;
                    transition: all 0.3s ease-in-out;
                  }

                  #custom-sidebar section {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: end;
                    height: 100%;
                    transition: all 0.3s ease-in-out;
                  }

                  #custom-sidebar-show section {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: end;
                    height: 100%;
                    transition: all 0.3s ease-in-out;
                  }

                 .chatbot {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 300px;
                    height: 100vh;
                    background-color: #fff;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                    border-top-left-radius: 1.5vw;
                    border-bottom-left-radius: 1.5vw;
                  }

                  #custom-sidebar-show h2 {
                    padding: 20px;
                    font-size: 22px;
                    margin: 0;
                  }

                  #custom-sidebar-show p {
                    padding: 0 20px;
                    font-size: 16px;
                  }

                  #custom-sidebar-show ul {
                    list-style-type: none;
                    padding: 0 20px;
                  }

                  #custom-sidebar-show ul li {
                    padding: 10px 0;
                    cursor: pointer;
                    font-size: 16px;
                  }

                  #custom-sidebar-show ul li:hover {
                    background-color: #f0f0f0;
                  }

                  #chat-messages{
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    justify-content: start;
                    align-items: end;
                    transition: all 0.3s ease-in-out;
                  }

                  #chat-input{
                    flex: 1; 
                    padding: 10px; 
                    border: 1px solid #ccc; 
                    border-radius: 5px;
                  }

                  #send-message{
                    padding: 10px; 
                    background-color: #85F900; 
                    border: none;
                    border-radius: 5px;
                    margin-left: 5px; 
                    cursor: pointer;
                  }
                </style>
              `;
              document.body.appendChild(sidebar);

              const sendMessage = () => {
                const chatMessages = document.getElementById('chat-messages');
                const chatInput = document.getElementById('chat-input');
                const message = chatInput.value.trim();
            
                if (message !== '') {
                  const messageElement = document.createElement('div');
                  messageElement.textContent = message;
                  messageElement.style.cssText = 'transition: all 0.3s ease-in-out; background-color: #f0f0f0; padding: 10px; margin: 5px 0; border-radius: 5px; text-align: right; width: auto; max-width: 100%; display: flex; justify-content: right;';
                  chatMessages.appendChild(messageElement);
                  chatInput.value = ''; 
                  chatMessages.scrollTop = chatMessages.scrollHeight;
                }
              };

              document.getElementById('send-message').addEventListener('click', sendMessage);

              document.getElementById('chat-input').addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                  sendMessage();
              }
            });
              

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
              newPopupButton.addEventListener('click', () => {
                sidebar.id = 'custom-sidebar-show';
              }, `false`);
              document.querySelector('.cruz').addEventListener('click', () => {
                sidebar.id = 'custom-sidebar';
              }, `false`);

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
              newHTMLButton.addEventListener('click', () => {
                chrome.runtime.sendMessage({ action: "captureHTML", data: document.documentElement.outerHTML });
                const htmlContent = document.documentElement.outerHTML;

                fetch('http://localhost:3001/getDataIa', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ html: htmlContent }),
                })
                    .then(response => response.json())
                    .then(data => console.log('Data sent to Express:', data))
                    .catch(error => console.error('Error:', error));
              }, `false`);

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
