const express = require('express'),
app = express();

const cors = require("cors");

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

let ageResult = {value : 0};
//let ageResult; 

app.get('/age', (request, response) => {
	console.log('Calling "/age"');

	response.type('text/plain');
	response.send(ageResult.value.toString());
})


app.post('/age', (req, res) => {
  // Assuming the client sends age as a JSON object like { "age": 25 }
  const age = req.body.age;
  
  function calculateInsuranceRisk(age) {
    if (age == 0) {
      ageResult.value = 0; 
      // return {value : 0};
    }
    else if (age == 10){
      ageResult.value = 10;
      
      // return {value : 10};
    }
    // else if (age == 20){
    //   return ageResult.value = 20; 
    // }
    // else{
    //   return ageResult.value = 30; 
    // }
  }
  //const insuranceRiskAge = calculateInsuranceRisk(age);
  // let ageResult = {value : 0}
  calculateInsuranceRisk(age);
  

  // Send the calculated result back to the client
  // res.json(ageResult);
  res.send(ageResult.value.toString());
});




app.get('/api/ping', (request, response) => {
	console.log('Calling "/api/ping"')
	response.type('text/plain')
	response.send('ping response')
})

app.get('/age', (request, response) => {
    console.log('Calling "/age" on the Node.js server.')
    var inputs = url.parse(request.url, true).query
    let age = parseInt(inputs.age)
    let agePoints = age
    response.type('text/plain')
    response.send(agePoints.toString())
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