/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// Personal API Key for OpenWeatherMap API
const apiKey = ',&appid=6007b30cf91ad756fe9125b8cdb3f2cc&units=metric';
// Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.getDate()+'.'+ (d.getMonth()+1)+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateAction);
//callback function to execute when it is clicked.
/* Function called by event listener */

function  generateAction (){
  const zipCode=document.getElementById('zip').value;
  const feeling=document.getElementById('feelings').value;
  getInfoValue(zipCode)
  .then(function(data){
      postData('/addTemp',{temp:data.main.temp,city:data.name,description:data.weather[0].description,date:newDate,content:feeling})
      .then(updateUI())
  })
  
  }

/* Function to GET Web API Data*/
const getInfoValue = async (zipCode)=>{
    const res = await fetch(baseURL+zipCode+apiKey)
   try {
     const data = await res.json();
     console.log(data.weather[0].description);
     document.getElementById('error').innerHTML = " ";
     return data;
   }  catch(error) {
     console.log("error", error);
     document.getElementById('error').innerHTML = "Please enter a valid Zipcode";
     document.getElementById('date').innerHTML=" ";
     document.getElementById('temp').innerHTML=" ";
     document.getElementById('city').innerHTML=" ";
     document.getElementById('description').innerHTML=" ";
     document.getElementById('content').innerHTML=" ";
   }
 }
/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
    try {
      const newData = await response.json();
      document.getElementById('error').innerHTML = " ";
             return newData
    }catch(error) {
    console.log("error", error);
    document.getElementById('error').innerHTML = "Please enter a valid Zipcode";
    document.getElementById('date').innerHTML=" ";
    document.getElementById('temp').innerHTML=" ";
    document.getElementById('city').innerHTML=" ";
    document.getElementById('description').innerHTML=" ";
    document.getElementById('content').innerHTML=" ";
    }
}

/* Function to GET Project Data */
const updateUI = async ()=> {
    const request = await fetch('/all')
    try {
        const allData = await request.json();
        document.getElementById('error').innerHTML = " ";
               console.log(allData);
         document.getElementById('date').innerHTML="Date: "+allData.date;
         document.getElementById('temp').innerHTML="Temp: "+allData.temp+" ْC";
         document.getElementById('city').innerHTML="City: "+allData.city ;
         document.getElementById('description').innerHTML=allData.description ;
         document.getElementById('content').innerHTML="Your Feeling: "+allData.content ;
      }catch(error) {
      console.log("error", error);
      document.getElementById('error').innerHTML = "Please enter a valid Zipcode";
      document.getElementById('date').innerHTML=" ";
      document.getElementById('temp').innerHTML=" ";
      document.getElementById('city').innerHTML=" ";
      document.getElementById('description').innerHTML=" ";
      document.getElementById('content').innerHTML=" ";
      }
}


