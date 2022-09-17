require('dotenv').config()
const express = require('express')
const app = express()
const port = 8080
const url = process.env.URL
const locname = process.env.LOCNAME 


app.get('/', (req, res, body) => {   
      res.send('Hello World')   
  })
  
app.listen(port, () => {
  console.log(`Rainfall Service started`)  
})