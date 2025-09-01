//Express
const express = require("express")
const app = express()
app.use(express.json())
app.listen(3001)
console.log("Sever running on port 3001...")

//Cors
const cors = require("cors")
app.use(cors())

//Passenger Count and Saved
let count = 0 
let saved = []

//get 
app.get('/count', (request, response) => 
    response.json(count)
)
app.get('/saved', (request, response) => 
    response.json(saved)
)

//increment
app.post('/count', (request, response) => {
    count += 1 
    response.json(count)
})

//reset
app.post('/reset', (request, response) => {
    count = 0
    response.json(count)
})

//save
app.post('/saved', (request, response) => {
    saved.push(count)
    response.json(saved)
})