const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const port = process.env.PORT



app.get('/', (req,res) => {
      res.json("hello")
})


app.listen(port, () => {
    console.log(`server started at ${port}`)
})
