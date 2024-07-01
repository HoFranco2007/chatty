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
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

                const renderer = new THREE.WebGLRenderer();
                renderer.setSize( window.innerWidth, window.innerHeight );
                renderer.setAnimationLoop( animate );
                renderer.domElement.id = "chatty"
                document.body.appendChild( renderer.domElement );

                const geometry = new THREE.BoxGeometry( 1, 1, 1 );
                const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
                const newChatty = new THREE.Mesh( geometry, material );
                scene.add( newChatty );

                camera.position.z = 5;

                function animate() {

                  newChatty.rotation.x += 0.01;
                  newChatty.rotation.y += 0.01;

                  renderer.render( scene, camera );

                }

                render.setAnimationLoop(animate)

              // const newChatty = document.createElement('div');
              // newChatty.className = `transition-all duration-300 ease-in-out `
              // newChatty.style.position = 'absolute';
              // newChatty.style.bottom = `${positionBottom}px`;
              // newChatty.style.left = `${positionLeft}px`;
              // newChatty.style.width = '300px';
              // newChatty.style.height = '300px';
              // newChatty.style.zIndex = '9999';
              // newChatty.style.opacity = '1';
              // document.body.appendChild(newChatty);
            }
          },
          args: [positionBottom, positionLeft]
        });
      }
    });
  });
};

setInterval(checkPosition, 100);
