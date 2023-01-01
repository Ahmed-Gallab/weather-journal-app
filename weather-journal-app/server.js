// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
// Cors for cross origin allowance
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 5000;
const server = app.listen(port, listening);
 function listening(){
    console.log(`running on localhost: ${port}`);
  };

// GET route
  app.get('/all',getData);
// Callback function to complete GET '/all'  .. GET route that returns the projectData object in your server code 
function getData (req,res){
 //   console.log("Get Data "+projectData)
    res.send(projectData);
}

// Post Route
app.post('/addTemp',addTemp);
// Callback function to complete post '/postData'
function addTemp(req,res){
    projectData={
        temp:req.body.temp,
        city:req.body.city,
        description:req.body.description,
        date:req.body.date,
        content:req.body.content
    }
    //projectData.push(req.body);
    res.send(projectData);
}