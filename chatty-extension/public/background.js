import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const checkPosition = () => {
  chrome.storage.local.get(['positionBottom', 'positionLeft'], ({ positionBottom, positionLeft }) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: (positionBottom, positionLeft) => {
            const chatty = document.getElementById('chatty');
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
                newChatty.id = 'chatty-img'
                newChatty.src = chrome.runtime.getURL("/chatty.png");
                newChatty.style.position = 'absolute';
                newChatty.style.bottom = `${positionBottom}px`;
                newChatty.style.left = `${positionLeft}px`;
                newChatty.style.width = '350px';
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
