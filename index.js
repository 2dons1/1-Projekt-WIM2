const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 80

express()
  .get('/', (req, res) => res.send("Ovo je naslovna stranica projekta, testiranje"))
  .get('/test', (req, res) => res.send("OVO JE TEST"))
  .get('/locationText', function(request, response){
    response.sendFile(path.join(__dirname, '/locationText.html'));
  })
  .get('/geolocation.js', function(request, response){
    response.sendFile(path.join(__dirname, '/geolocation.js'));
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
