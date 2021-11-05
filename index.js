require('dotenv').config()
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000
const TOKEN =  process.env.TOKEN
const baseURL = process.env.APP_URL || "http://localhost:3000/"
const { auth, requiresAuth } = require('express-openid-connect');
const fs = require('fs')
const markers = [
  {"user": "Dorian", "time": "now", "lat": 45.827444, "long": 16.052198},
  {"user": "Dominik", "time": "now", "lat": 45.051836, "long": 13.926908},
  {"user": "Filip", "time": "now", "lat": 45.348563, "long": 14.558573},
  {"user": "Marin", "time": "now", "lat": 44.100418, "long": 15.328415},
  {"user": "Dorian", "time": "now", "lat": 42.699758, "long": 18.039312}
];

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
  .use(express.urlencoded({extended: false}))
  .use(express.json())
  .set("view engine", "ejs")
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
  .get('/', function(req, res){
    if(req.oidc.isAuthenticated()){
      res.render("all", {
        nickname: req.oidc.user.nickname, 
        email: req.oidc.user.email,
        auth: req.oidc.isAuthenticated(),
        linkIN: baseURL + 'login',  
        linkOUT: baseURL + 'logout',
        linkGetMarkeri: baseURL + 'markers',
        linkPostMarkeri: baseURL + 'test',
        timer: req.oidc.user.updated_at,
        markeri: markers
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
  .get('/markers', function(req, res){
    res.sendFile(path.join(__dirname, 'data/markers.json'));
  })
  .post('/test', function(req, res){
    res.send(req.body);
    const finished = (error) => {
      if(error){
        console.error(error);
        return;
      }
    }
    const data = JSON.stringify(req.body, null, 2);
    fs.writeFile(path.join(__dirname, 'data/markers.json'), data, finished);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
