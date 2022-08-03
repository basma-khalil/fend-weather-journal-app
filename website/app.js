/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate() +'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '5f64838ca4ae21b41a15441767212c0d';

/* Function to GET Web API Data*/
const getData = async (zip) => {

  const res = await fetch(baseURL + zip + '&appid=' + apiKey + '&units=metric');

  try {
    const data = await res.json();
    return data;

  } catch(error) {
    console.log('error', error);
  }
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {

  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    });

  try {
    const newData = await res.json();
    return newData;

  } catch(error) {
    console.log('error', error);
  }
};

/* Function to GET Project Data */
const updateUI = async () => {

  const req = await fetch('/all');

  try {
    const allData = await req.json();
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('temp').innerHTML = allData.temp + ' °c'; document.getElementById('tempIcon').setAttribute('src', `http://openweathermap.org/img/wn/${allData.icon}@2x.png`);
    document.getElementById('content').innerHTML = allData.content;
    (allData.emoji !== '')
    ? document.getElementById('emoji').innerHTML = allData.emoji
    : document.getElementById('emoji').innerHTML = '<img src="images/feelings.png" alt="Feelings Icon">';

  } catch(error) {
    console.log('error', error);
  }
};

/* Function called by event listener */
const performAction = (e) => {

  const zipCode = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;

  (zipCode !== '' && !isNaN(zipCode))

  ? getData(zipCode)

  .then((data) => {
    postData('/add', {date: newDate, temp: data.main.temp, icon: data.weather[0].icon, content: content});
    updateUI();
  })

  : alert("Please enter a valid zip code");
};

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);