import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.API_KEY}`;


    // const url2 = `http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zip}&cnt=3&appid=${process.env.API_KEY}`;



    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();


    function getElements(response) {
      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The Temperature in Fahrenheit is ${response.main.temp} degrees.`);
      $('.showWindSpeed').text(`The wind speed is ${response.wind.speed} MPH`);
      $('.showConditions').html(`The current conditions are: ${response.weather[0].description}. <img src="http://openweathermap.org/img/wn/${response.weather[0].icon}.png" alt="weather-icon">`);
      $('.showSunrise').text(`The sun will rise at ${new Date(response.sys.sunrise * 1000).toLocaleTimeString("en-US")}`);
      $('.showSunset').text(`The sun will set at ${new Date(response.sys.sunset * 1000).toLocaleTimeString("en-US")}`);
    }
  });

  $('#zipLocation').click(function() {
    const zip = $('#zip').val();
    $('#zip').val("");
    $('.weatherDate').val("");
    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/forecast?zip=${zip}&units=imperial&appid=${process.env.API_KEY}`;


    // const url2 = `http://api.openweathermap.org/data/2.5/forecast/daily?zip=${zip}&cnt=3&appid=${process.env.API_KEY}`;


    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();


    function getElements(response) {


      for (let x = 4; x < 40; x = x + 8) {
        //console.log(`Humidity for ${response.list[x].dt_txt}: ${response.list[x].main.humidity}`);
        $('.weatherDate').append(`${response.list[x].dt_txt}:<br>`);
        $('.weatherDate').append(`Humidity: ${response.list[x].main.humidity}<br>`);
        $('.weatherDate').append(`Temperature: ${response.list[x].main.temp}<br>`);
        $('.weatherDate').append(`Conditions: ${response.list[x].weather[0].description} <img src="http://openweathermap.org/img/wn/${response.list[x].weather[0].icon}.png" alt="weather-icon"> <br> <br> <br> `);
      }


      // 
      // $('.showTemp').text(`The Temperature in Fahrenheit is ${response.main.temp} degrees.`);
      // $('.showWindSpeed').text(`The wind speed is ${response.wind.speed} MPH`);
      // $('.showConditions').html(`The current conditions are: ${response.weather[0].description}. <img src="http://openweathermap.org/img/wn/${response.weather[0].icon}.png" alt="weather-icon">`);
      // $('.showSunrise').text(`The sun will rise at ${new Date(response.sys.sunrise * 1000).toLocaleTimeString("en-US")}`);
      // $('.showSunset').text(`The sun will set at ${new Date(response.sys.sunset * 1000).toLocaleTimeString("en-US")}`);
    }
  });
});