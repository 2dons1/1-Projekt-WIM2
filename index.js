require('dotenv').config()
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000
const TOKEN =  process.env.TOKEN
const baseURL = process.env.APP_URL || "http://localhost:3000"
const { auth, requiresAuth } = require('express-openid-connect');

express()
  .use(
    auth({
      authRequired: false,
      auth0Logout: true,
      issuerBaseURL: process.env.ISSUER_BASE_URL,
      baseURL: baseURL,
      clientID: process.env.CLIENT_ID,
      secret: process.env.SECRET,
      idpLogout: true,
    })
  )
  .set("view engine", "ejs")
  .get('/', function(req, res){
    res.send(req.oidc.isAuthenticated() ? 'Logged In' : 'Logged Out');
  })
  .get('/locationMap', function(req, res){
    res.render("locationMap", {token: TOKEN});
  })
  .get('/locationText', function(req, res){
    res.render("locationText");
  })
  .get('/geolocation.js', function(req, res){
    res.sendFile(path.join(__dirname, 'views/geolocation.js'));
  })
  .get('/private', requiresAuth(), function(req, res){
    res.send(JSON.stringify(req.oidc.user))
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
