require('dotenv').config()
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 80
const TOKEN =  process.env.TOKEN

express()
  .set("view engine", "ejs")
  .get('/', (req, res) => res.send("Ovo je naslovna stranica projekta, testiranje"))
  .get('/locationMap', function(req, res){
    // res.sendFile(path.join(__dirname, 'views/locationMap.ejs'));
    res.render("locationMap");
  })
  .get('/locationText', function(req, res){
    // res.sendFile(path.join(__dirname, 'views/locationText.ejs'));
    res.render("locationText");
  })
  .get('/geolocation.js', function(req, res){
    res.sendFile(path.join(__dirname, 'views/geolocation.js'));
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
