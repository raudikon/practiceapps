//Express + port 
const express = require("express")
const app = express() 
app.use(express.json())
app.listen(3001)
console.log("Server running on port 3001")

//Cors
const cors = require("cors")
app.use(cors())

//Counter in memory
let count = 69420

//Get route 
app.get('/count', (request, response) => {
    response.json(count)
})

//Increment route 
app.post('/count/increment', (request, response) => {
    count += 1 
    response.json(count+1)
})

//Reset route 
app.post('/count/reset', (request, response) => {
    console.log("HIT DA RESET")
    count = 0
    response.json(count)
})