import { useState } from 'react'
import reactLogo from './assets/png-clipart-cute-funny-animals-personnel-bath-dogs-dog-funny.png'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg8um8l-bQyGAH63eUsuLww9SvIYDsYUOk_A&s"></img>
      </div>
      <h1>Welcome btchss</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Benvingut al aeroport de Barcelona
        </p>
      </div>
      <p className="read-the-docs">
        Silly text to fill the page
      </p>
    </>
  )
}

export default App
