import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const baseUrl = "http://localhost:3001/count"

  const [count, setCount] = useState(0)
  useEffect(()=>{
    axios.get(baseUrl)
    .then(response => setCount(response.data))
  }, [])

  const handleClick = () => {
    axios.post("http://localhost:3001/count/increment", count+1)
    .then(response =>{
      setCount(count+1)
      })
  }

  const handleRest = () => {
    axios.post("http://localhost:3001/count/reset", 0)
    .then(response => {
      setCount(0)
    })
  }
  
  return(
    <div>
      <h1>Scout's Hello Counter</h1>
      <h2>Current Hello count: {count}</h2>
      <button onClick={handleClick}>Hello</button>
      <button onClick={handleRest}>Reset</button>
    </div>
  )
}

export default App
