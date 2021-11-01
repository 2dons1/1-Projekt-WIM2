require('dotenv').config()
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 80
const TOKEN =  process.env.TOKEN

express()
  .get('/', (req, res) => res.send("Ovo je naslovna stranica projekta, testiranje"))
  .get('/locationMap', function(req, res){
    res.sendFile(path.join(__dirname, '/locationMap.html'));
  })
  .get('/locationText', function(req, res){
    res.sendFile(path.join(__dirname, '/locationText.html'));
  })
  .get('/geolocation.js', function(req, res){
    res.sendFile(path.join(__dirname, '/geolocation.js'));
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
