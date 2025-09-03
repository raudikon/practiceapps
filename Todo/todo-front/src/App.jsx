// Frontend (React)

// Input box + “Add Todo” button.
// Display list of todos.
// Each todo has a “Delete” button.

import axios, { all } from 'axios'
import { useEffect, useState } from 'react'

function App() {

  const baseUrl = '/todo'
  const [allTodos, setAllTodos] = useState([])
  const [entry, setNewEntry] = useState("")

  useEffect(() => {
    axios.get(baseUrl)
    .then(response => setAllTodos(response.data))
  }, [])

  const handleDone = (id) => {
    axios.delete(`${baseUrl}/${id}`, id)
    .then((response) => {
      let newTodoList = allTodos.filter((todo) => todo.id !== id)
      setAllTodos(newTodoList)
    })
  }

  const handleNewTodo = () => {
    let newTodo = {
      "content" : entry, 
    }
    axios.post(baseUrl, newTodo)
    .then((response) => {
      setAllTodos(allTodos.concat(response.data))
      setNewEntry("") //clear user entry after successful submission 
    })
}


  return (
    <div>
      <h2>My Todo List</h2>
      {
        allTodos.map(
          (todo) => (
            <p key={todo.id}>{todo.content} <button onClick={() => handleDone(todo.id)}>Done</button></p>
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