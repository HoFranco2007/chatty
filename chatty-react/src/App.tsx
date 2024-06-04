import './App.css';
import chattyLogo from './assets/chatty.png';
import ChattyCanvas from '../components/ChattyCanvas';
import { useState, useEffect } from 'react';

function App() {
  const [positionBottom, setPositionBottom] = useState(0);
  const [positionLeft, setPositionLeft] = useState(0);

  const handleChangePosition = () => {
    if (positionBottom === 0 && positionLeft === 0) {
      setPositionBottom(320);
      setPositionLeft(420);
    } else {  
      setPositionBottom(0);
      setPositionLeft(0);
    }

    chrome.storage.local.set({ positionBottom, positionLeft});
  };

  useEffect(() => {
    chrome.storage.local.set({ positionBottom, positionLeft });
  }, []);

  return (
    <>
      <div className='flex flex-row justify-around pl-3 pr-4'>
        <a href="https://react.dev" target="_blank">
          <img src={chattyLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>CHATTY</h1>
      <div className="card">
        <ChattyCanvas />
        <button onClick={handleChangePosition}>
          Colo Gordo
        </button>
      </div>
    </>
  );
}

export default App;
