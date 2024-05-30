import './App.css'
import chattyLogo from './assets/chatty.png'
import ChattyCanvas from '../components/ChattyCanvas'

const aparecerChatty = async () => {
  let [tab] = await chrome.tabs.query({ active: true })
  chrome.scripting.executeScript({
    target: { tabId: tab.id! },
    func: () => {
      const chatty = document.createElement('img')
      chatty.src = chrome.runtime.getURL("/assets/chatty-BqHLDitW.png")
      chatty.style.position = 'absolute'
      chatty.style.bottom = '0'
      chatty.style.right = '0'
      chatty.style.width = '300px'
      chatty.style.height = '300px'
      chatty.style.zIndex = '9999'
      document.body.appendChild(chatty)
    }
  })
}

function App() {
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
        <button onClick={aparecerChatty}>
          Aparecer Chatty
        </button>
      </div>
    </>
  )
}

export default App
