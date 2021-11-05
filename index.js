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
  .get('/scripts/all.js', function(req, res){
    res.sendFile(path.join(__dirname, 'scripts/all.js'));
  })
  .get('/location_text', function(req, res){
    res.render("location_text");
  })
  .get('/location_map', function(req, res){
    res.render("location_map");
  })
  .get('/user_login', function(req, res){
    
    if(req.oidc.isAuthenticated()){
      res.render("user_login", {
        nickname: req.oidc.user.nickname, 
        email: req.oidc.user.email,
        auth: req.oidc.isAuthenticated(),
        linkIN: baseURL + 'login',  
        linkOUT: baseURL + 'logout'
      })
    }
    else{
      res.render("user_login", {
        auth: req.oidc.isAuthenticated(),
        linkIN: baseURL + 'login',  
        linkOUT: baseURL + 'logout'
      })
    }
    
  })
  .get('/all', function(req, res){
    if(req.oidc.isAuthenticated()){
      res.render("all", {
        nickname: req.oidc.user.nickname, 
        email: req.oidc.user.email,
        auth: req.oidc.isAuthenticated(),
        linkIN: baseURL + 'login',  
        linkOUT: baseURL + 'logout',
        timer: req.oidc.user.updated_at
      })
    }
    else{
      res.render("all", {
        auth: req.oidc.isAuthenticated(),
        linkIN: baseURL + 'login',  
        linkOUT: baseURL + 'logout'
      })
    }
  })
  .get('/private', requiresAuth(), function(req, res){
    res.send(JSON.stringify(req.oidc.user))
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
