const chalk = require('chalk')
const request = require('request')

const url = 'https://api.darksky.net/forecast/de5697dbd2d6096915de5183a8374d3f/37.8267,-122.4233?units=si&lang=es'

request({url: url, json: true }, (error, response)=>{
  // console.log(response.body.currently)

  console.log(response.body.daily.data[0].summary + " Right now in " + chalk.green(response.body.timezone) + " is currently " + chalk.green(response.body.currently.temperature) + " celsius degrees out. There is a " + chalk.green(response.body.currently.precipProbability) + "% chance of rain")


})