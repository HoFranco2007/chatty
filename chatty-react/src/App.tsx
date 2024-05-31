import './App.css'
import chattyLogo from './assets/chatty.png'
import ChattyCanvas from '../components/ChattyCanvas'

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
        <button>
          Colo Gordo
        </button>
      </div>
    </>
  )
}

export default App
