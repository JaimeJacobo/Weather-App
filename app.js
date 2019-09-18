
const chalk = require('chalk')  //This is to color console.log messages
const request = require('request') //This is to make http requests
const fs = require('fs')

const city_int = 'Berlin'

const url_mapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + city_int + '.json?access_token=pk.eyJ1IjoiamFpbWVqYWNvYm8iLCJhIjoiY2swb2JoMmt6MDZkbzNsbjZldDNudTZicSJ9.d_UI7RuoLl4vQJao9IiEAw&limit=1'


// Requesting the "Mapbox" API
request({url: url_mapbox, json: true}, (error, response)=>{
  if(!error){
    if(response.body.features[0]){
      let longitude = response.body.features[0].center[0]
      let lattitude = response.body.features[0].center[1]
      // Requesting the "Darksky" API
      const url_darksky = 'https://api.darksky.net/forecast/de5697dbd2d6096915de5183a8374d3f/' + lattitude + ',' + longitude + '?units=si&lang=en'
  
      request({url: url_darksky, json: true }, (error, response)=>{
        
        if(!error){
          console.log(response.body.daily.data[0].summary + " Right now in " + chalk.green(response.body.timezone) + " is currently " + chalk.green(response.body.currently.temperature) + " celsius degrees out. There is a " + chalk.green(response.body.currently.precipProbability) + "% chance of rain")
        } else {
          console.log(chalk.red.inverse('There was an error calling the "Darksky" API'))
        }
      })
    } else {
      console.log(chalk.red.inverse('There is no place around the world with that name. Please try again'))
    }

    
  } else {
    console.log(chalk.red.inverse('There was an error calling the "Mapbox API'))
  }
})





