//what do u tend to build first 
// what do u do for keys 
import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const baseUrl = 'http://localhost:3001'

  const [count, setCount] = useState(0)
  const [saved, setSaved] = useState([0,0,0])

  useEffect(()=>{
    axios.get(`${baseUrl}/count`)
    .then((response) => setCount(response.data))
  })

  useEffect(()=>{
    axios.get(`${baseUrl}/saved`)
    .then((response) => setSaved(response.data))
  })

  const handleIncrement = () => {
    axios.post(`${baseUrl}/count`, 1)
    .then((response) => {
      setCount(response.data)
    })
  }

  const handleReset = () => {
    console.log('reset')
    axios.post(`${baseUrl}/reset`, 0)
    .then((response) => {
      setCount(response.data)
    })
  }

  const handleSave = () => {
    axios.post(`${baseUrl}/saved`, 1)
    .then((response) => {
      setSaved(response.data)
    })
  }

  return (
    <>
      <h2>Passenger Counter</h2>
      <h2>Current Passenger Count:</h2>
      <h1>{count}</h1>
      <button
        onClick={handleIncrement}
        >+1 Passenger</button>
      <button
        onClick={handleReset}>
          Reset</button>
      <button
        onClick={handleSave}>
          Save</button>

      <p>Previous saved counts: </p>
      {saved.map((val) => <p>{val}</p>)}
    </>
  )
}

export default App
