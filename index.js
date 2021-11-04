require('dotenv').config()
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000
const TOKEN =  process.env.TOKEN
const baseURL = process.env.APP_URL || "http://localhost:3000/"
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
    res.render("location", {
        user: req.oidc.user, 
        auth: req.oidc.isAuthenticated(), 
        linkIN: baseURL + 'login', 
        linkOUT: baseURL + 'logout', 
        token: TOKEN});
  })
  .get('/scripts/location_text.js', function(req, res){
    res.sendFile(path.join(__dirname, 'scripts/location_text.js'));
  })
  .get('/scripts/location_map.js', function(req, res){
    res.sendFile(path.join(__dirname, 'scripts/location_map.js'));
  })
  .get('/location_text', function(req, res){
    res.render("location_text");
  })
  .get('/location_map', function(req, res){
    res.render("location_map");
  })
  .get('/private', requiresAuth(), function(req, res){
    res.send(JSON.stringify(req.oidc.user))
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
