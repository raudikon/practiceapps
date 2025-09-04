// Backend (Express)

// GET /todos → returns all todos.
// POST /todos → adds a new todo (just text).
// DELETE /todos/:id → removes a todo.

//Express
const express = require('express')
const app = express()
app.use(express.json())
app.listen(3001)
console.log('Server running on port 3001')
app.use(express.static('dist'))

<<<<<<< Updated upstream
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
=======
//Mongoose + DB
const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(console.log('Established MongoDB connexion~'))
  .catch(e => console.log(e, 'Error connecting to MongoDB'))

//Todo Schema 
const todoSchema = new mongoose.Schema(
  {
    content: 
    {
      type: String, 
      minLength: [3, 'Todo must have at least 3 characters'],
      required: [true, 'Please enter todo' ],
      trime: true
    }, 
    done: Boolean,
  })
>>>>>>> Stashed changes

//Homepage: displays all todos 
app.get('/todo', (request, response) => 
<<<<<<< Updated upstream
    response.json(allTodos)
)
app.get('/', (request, response) => 
    response.json(allTodos)
=======
  Todo.find({}).then(todos => {
    response.json(todos)
  })
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
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
=======
  const newTodo = new Todo({
    content: body.content,
    done: false
  })

  newTodo.save()
    .then(() => {
      response.json(newTodo)
    })
    .catch((e) => {
      console.log(e)
      response.status(400).json({error: e.message})
    })
})

//Deleting a todo 
app.delete('/todo/:id', (request, response) => {
  Todo.findByIdAndDelete(request.params.id)
    .then(response.status(204).end())
})
>>>>>>> Stashed changes
