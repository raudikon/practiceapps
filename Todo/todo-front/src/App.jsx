// Frontend (React)

// Input box + “Add Todo” button.
// Display list of todos.
// Each todo has a “Delete” button.

import axios, { all } from 'axios'
import { useEffect, useState } from 'react'

function App() {

  const baseUrl = 'http://localhost:3001/todo'
  const [allTodos, setAllTodos] = useState([])
  const [entry, setNewEntry] = useState("")

  useEffect(() => {
    axios.get(baseUrl)
    .then(response => setAllTodos(response.data))
  })


  const handleDone = (id) => {
    axios.delete(`${baseUrl}/${id}`, id)
    .then((response) => {
      let newTodoList = allTodos.filter((todo) => todo.id !== id)
      setAllTodos(newTodoList)
    })
  }

  const handleNewTodo = () => {
    console.log(entry, typeof entry)
    let newTodo = {
      "item" : entry, 
    }
    console.log("NEW todo is ")
    console.log(newTodo)
    axios.post(baseUrl, newTodo)
    .then((response) => {
      setAllTodos(allTodos.concat(response.data))
    })
}

  return (
    <div>
      <h2>My Todo List</h2>
      {
        allTodos.map(
          (todo) => (
            <p>{todo.item} <button onClick={() => handleDone(todo.id)}>Done</button></p>
          )
        )
      }
      <h2>Add a new item</h2>
      <input
        type="text"
        value={entry}
        onChange={(event) => {setNewEntry(event.target.value)}}
      >
      </input>
      <button
        onClick={handleNewTodo}>
          Add New Todo
      </button>
    </div>
  )
}

export default App
