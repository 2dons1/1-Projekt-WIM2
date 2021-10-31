const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000

express()
  .get('/', (req, res) => res.send("Naslovna stranica"))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
