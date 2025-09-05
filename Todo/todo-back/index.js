require('dotenv').config()

//Express
const express = require('express')
const app = express()
app.use(express.json())
app.listen(3001)
console.log('Server running on port 3001')
app.use(express.static('dist'))

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
      trim: true
    }, 
    done: Boolean,
  })


const Todo = mongoose.model('Todo', todoSchema)

todoSchema.set('toJSON', {

  transform: (document, returnedObject) => {

    returnedObject.id = returnedObject._id.toString()

    delete returnedObject._id

    delete returnedObject.__v

  }

})
//Homepage: displays all todos 
app.get('/todo', (request, response) => 
  Todo.find({}).then(todos => {
    response.json(todos)
  })
)

//Route for adding a todo 
app.post('/todo', (request, response) => {

  const body = request.body 

  const newTodo = new Todo({
    content: body.content,
    done: false
  })

  console.log('NEW TODO ######')
  console.log(newTodo)

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
