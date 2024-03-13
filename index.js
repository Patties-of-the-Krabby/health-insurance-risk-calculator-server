const express = require('express'),
app = express();

const cors = require("cors");
const { parse } = require('path');

var url = require('url');

const port = process.env.PORT || 3000
const majorVersion = 1
const minorVersion = 3

app.use(cors({ origin: '*' }))

app.get('/about', (request, response) => {
	console.log('Calling "/about" on the Node.js server.')
	response.type('text/plain')
	response.send('This is a website that utilizes server-side node.js to implement an insurance risk calculator.')
})

app.get('/api/ping', (request, response) => {
	console.log('Calling "/api/ping"')
	response.type('text/plain')
	response.send('ping response')
})

app.get('/age', (request, response) => {
    console.log('Calling "/age" on the Node.js server.')
    var inputs = url.parse(request.url, true).query
    let age = parseInt(inputs.age)

    response.type('text/plain')
    response.send(age.toString())
})

app.get('/bmi', (request, response) => {
    console.log('Calling "/bmi" on the Node.js server.')
    //grab the stuff from the url 
    var inputs = url.parse(request.url, true).query
    //specifically, the height and weight as ints
    let height = parseInt(inputs.height)
    let weight = parseInt(inputs.weight)
    //bmi = (weight in pounds / (height in inches) ^ 2) * 703
    let bmi = ((weight) / height ** 2) * 703
    const roundedBMI = bmi.toFixed(1)
    //send the stuff to the server as a string in plaintext
    response.type('text/plain')
    response.send(roundedBMI.toString())
  })

app.get('/blood', (request, response) => {
    console.log('Calling "/blood" on the Node.js server.')
    var inputs = url.parse(request.url, true).query
    let blood = parseInt(inputs.blood)

    response.type('text/plain')
    response.send(blood.toString())
})

app.get('/history', (request, response) => {
    console.log('Calling "/history" on the Node.js server.')
    var inputs = url.parse(request.url, true).query
    let history = parseInt(inputs.history)

    response.type('text/plain')
    response.send(history.toString())
})

app.get('/calculateRisk', (request, response) => {
    console.log('Calling "/calculateRisk" on the Node.js server.')
    var inputs = url.parse(request.url, true).query
    let age = parseInt(inputs.age)
    let bmi = parseInt(inputs.bmi)
    let blood =parseInt(inputs.blood)
    let history = parseInt(inputs.history)

    let sum = age + bmi + blood + history
    let risk = ''
    if(sum <= 20) {
        risk = sum + ' - Low Risk'
    }
    else if(sum <= 50) {
        risk = sum + ' - Moderate Risk'
    }
    else if(sum <= 75) {
        risk = sum + ' - High Risk'
    }
    else {
        risk = sum + ' - Uninsurable'
    }
    response.type('text/plain')
    response.send(risk.toString())
})

// Custom 404 page.
app.use((request, response) => {
    response.type('text/plain')
    response.status(404)
    response.send('404 - Not Found')
  })
  
  // Custom 500 page.
  app.use((err, request, response, next) => {
    console.error(err.message)
    response.type('text/plain')
    response.status(500)
    response.send('500 - Server Error')
  })
  
  app.listen(port, () => console.log(
    `Express started at \"http://localhost:${port}\"\n` +
    `press Ctrl-C to terminate.`)
  )