// Backend (Express)

// GET /todos → returns all todos.
// POST /todos → adds a new todo (just text).
// DELETE /todos/:id → removes a todo.

//Express
const express = require("express")
const app = express()
app.use(express.json())
app.listen(3001)
console.log("Server running on port 3001")
app.use(express.static('dist'))

//Cors
const cors = require("cors")
app.use(cors())

//Logic 
let allTodos = 
[{
      'item': "Finish my app", 
      'done': false,
      'id': 0
      },
    { 
      'item': "Eat lunch", 
      'done': false,
      'id': 1
    }
]

//Homepage: displays all todos 
app.get('/todo', (request, response) => 
    response.json(allTodos)
)
app.get('/', (request, response) => 
    response.json(allTodos)
)

//Route for deleting a todo. 
app.delete('/todo/:id', (request, response) => {

    const id = request.params.id
    allTodos = allTodos.filter(todo => todo.id.toString() !== id)
    response.json(allTodos)
}
)

//Route for adding a todo 
app.post('/todo', (request, response) => {

    const body = request.body 

    newItem = {
        "item" : body.item,
        "done" : false,
        "id" : allTodos.length 
    }

    console.log("NEW ITEM")
    console.log(newItem)

    allTodos.push(newItem)

    console.log("TODO LIST WITH NEW ITEM")
    console.log(allTodos)

    response.json(allTodos)
})
