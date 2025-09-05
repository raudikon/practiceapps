import axios from 'axios'
import { useEffect, useState } from 'react'

function App() {

  const baseUrl = '/todo'
  const [allTodos, setAllTodos] = useState([])
  const [entry, setNewEntry] = useState("")
  const [errMsg, setErrMsg] = useState("")

  //get new list of todos everytime todos is updated 
  useEffect(() => {
    axios.get(baseUrl)
    .then(response => setAllTodos(response.data))
  }, [])

  //handle removing a todo after it is done 
  const handleDone = (id) => {
    axios.delete(`${baseUrl}/${id}`, id)
    .then(() => {
      let newTodoList = allTodos.filter((todo) => todo.id !== id)
      setAllTodos(newTodoList)
    })
  }

  //handle adding a new todo 
  const handleNewTodo = () => {
    let newTodo = {
      "content" : entry, 
    }
    axios.post(baseUrl, newTodo)
    .then((response) => {
      setAllTodos([...allTodos, response.data])
      setNewEntry("") //clear user entry after successful submission 
    })
    .catch((e) => {
      console.log(e)
      console.log(e.response.data)
      setErrMsg(e.response.data.error)
      setTimeout(() => {setErrMsg(null)}, 5000)
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
      <p>{errMsg}</p>
    </div>
  )
}

export default App