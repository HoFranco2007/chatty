import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const aparecerChatty = async () => {
  let [tab] = await chrome.tabs.query({ active: true })
  chrome.scripting.executeScript({
    target: { tabId: tab.id! },
    func: () => {
      const chatty = document.createElement('img')
      chatty.src = './public/chatty.png'
      chatty.style.position = 'fixed'
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
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={aparecerChatty}>
          Aparecer Chatty
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
