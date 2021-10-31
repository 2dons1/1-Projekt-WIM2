const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 80

express()
  .get('/', (req, res) => res.send("Ovo je naslovna stranica projekta, testiranje"))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
